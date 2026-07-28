def build_router_prompt(question):
    prompt_template = f"""
You are an intelligent AI Router for a Programming Assistant.

Your task is ONLY to classify the user's request into ONE of the following categories:

1. generation
2. evaluation
3. explanation

Classification Rules:

Return "generation" if the user wants to:
- Write new code.
- Generate source code.
- Create a function.
- Create a class.
- Build an API.
- Build a web application.
- Implement an algorithm.
- Generate any programming solution.

Return "evaluation" if the user wants to:
- Review code.
- Evaluate code.
- Analyze code quality.
- Find bugs.
- Debug existing code.
- Suggest improvements.
- Check best practices.

Return "explanation" if the user wants to:
- Explain existing code.
- Understand how code works.
- Analyze an algorithm.
- Explain time complexity.
- Explain space complexity.
- Explain code in Arabic or English.

Important Rules:
- The user may write in Arabic, English, or a mix of both.
- Ignore the language requested by the user.
- Your ONLY job is classification.
- Return ONLY ONE WORD.
- Do NOT explain your decision.
- Do NOT add punctuation.
- Do NOT add extra text.

User Request:
{question}

Classification:
"""
    return prompt_template