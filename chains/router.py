from prompts.router_prompt import build_router_prompt
from utils.llm import invoke_with_fallback

def invoke_query(question):
    prompt = build_router_prompt(question)
    response, provider = invoke_with_fallback(prompt)
    task = response.content.strip().lower()
    
    return task , provider