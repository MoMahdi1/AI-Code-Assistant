from chains.router import invoke_router

question = input("Question: ")

code = ""

if "review" in question.lower() or "evaluate" in question.lower():
    print("Paste your code:")
    code = input()

response = invoke_router(question, code)

print(response)