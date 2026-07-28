from prompts.router_prompt import build_router_prompt
from utils.llm import invoke_with_fallback

from chains.generator import invoke_generator
from chains.evaluator import invoke_evaluator
from chains.explanation import invoke_explainer


def invoke_router(question: str, code: str = ""):

    prompt = build_router_prompt(question)

    response, provider = invoke_with_fallback(prompt)

    task = response.content.strip().lower()

    print(f"\nTask     : {task}")
    print(f"Provider : {provider}")

    if task == "generation":

        answer = invoke_generator(question)
        return answer

    elif task == "evaluation":

        answer, _ = invoke_evaluator(question, code)
        return answer

    elif task == "explanation":

        answer, _ = invoke_explainer(question)
        return answer

    else:

        return "Unknown task."