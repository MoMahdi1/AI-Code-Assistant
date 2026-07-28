from prompts.evaluator_prompt import evaluator_prompt
from utils.llm import invoke_with_fallback


def evaluate_code(question: str, code: str):

    prompt = evaluator_prompt.invoke(
        {
            "question": question,
            "code": code
        }
    )

    response, provider = invoke_with_fallback(prompt)

    return response.content, provider


def invoke_evaluator(question: str, code: str):

    evaluation, provider = evaluate_code(question, code)

    return evaluation, provider