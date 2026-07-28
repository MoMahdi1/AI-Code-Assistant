from vectorstore.retriever import load_retriever

retriever = load_retriever()

question = input("Question: ")

docs = retriever.invoke(question)

print(f"Found {len(docs)} documents\n")

for i, doc in enumerate(docs, 1):
    print("=" * 60)
    print(f"Document {i}")
    print(doc.page_content[:500])