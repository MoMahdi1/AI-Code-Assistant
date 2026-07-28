from langchain_core.prompts import ChatPromptTemplate

generator_prompt = ChatPromptTemplate.from_template(
    """
You are an expert AI Software Engineer.

Your task is to generate high-quality, clean, and production-ready code.

Use the retrieved examples below only as reference and inspiration.
Do not copy them verbatim unless necessary.

Retrieved Examples:
-------------------
{context}

==============================

User Request:
{question}

Instructions:
- Generate clean and readable code.
- Follow best programming practices.
- Add comments only when necessary.
- Return the complete solution.
- After the code, provide a short explanation of what it does.
"""
)