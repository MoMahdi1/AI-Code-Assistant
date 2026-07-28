from vectorstore.retriever import load_retriever
from prompts.explainer_prompt import explainer_prompt
from utils.llm import invoke_with_fallback


def retrieve_context(question: str):

    retriever = load_retriever()
    documents = retriever.invoke(question)

    return documents


def format_context(documents):

    context = ""

    for i, doc in enumerate(documents, start=1):

        context += f"""
Example {i}

{doc.page_content}

{'-'*50}

"""

    return context


def explain_code(question: str, context: str):

    prompt = explainer_prompt.invoke(
        {
            "question": question,
            "context": context
        }
    )

    response, provider = invoke_with_fallback(prompt)

    return response.content, provider


def invoke_explainer(question: str):

    documents = retrieve_context(question)

    context = format_context(documents)

    explanation, provider = explain_code(question, context)

    return explanation, provider