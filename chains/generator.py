from vectorstore.retriever import load_retriever
from utils.llm import invoke_with_fallback
from prompts.generator_prompt import generator_prompt


def retrieve_context(question: str):
    """
    Retrieve the most relevant documents from the vector database.
    """
    retriever = load_retriever()
    documents = retriever.invoke(question)

    return documents


def format_context(documents):
    """
    Convert retrieved documents into a single context string.
    """
    context = ""

    for i, doc in enumerate(documents, start=1):
        context += f"""
Example {i}

{doc.page_content}

{'-' * 60}

"""

    return context


def generate_code(question: str, context: str):
    """
    Generate code using the retrieved context.
    """

    prompt = generator_prompt.invoke(
        {
            "question": question,
            "context": context
        }
    )

    response, provider = invoke_with_fallback(prompt)

    return response.content, provider


def invoke_generator(question: str):
    
    documents = retrieve_context(question)

    context = format_context(documents)

    answer, provider = generate_code(question, context)

    return answer, provider