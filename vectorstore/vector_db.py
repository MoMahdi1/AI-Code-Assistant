from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from vectorstore.ingest import ingest

CHROMA_PATH = "db/chroma_db"


def create_embeddings():
    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5"
    )

    return embeddings


def create_vector_db(documents, embeddings):

    vector_db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )

    batch_size = 1000

    for i in range(0, len(documents), batch_size):
        batch = documents[i:i + batch_size]

        vector_db.add_documents(batch)

        print(f"Added {min(i + batch_size, len(documents))}/{len(documents)} documents")

    return vector_db


def build_vector_db():

    print("Loading documents...")
    documents = ingest()

    print("Loading embedding model...")
    embeddings = create_embeddings()

    print("Building Vector Database...")
    vector_db = create_vector_db(documents, embeddings)

    print(f"\nDocuments : {len(documents)}")
    print("Vector Database Created Successfully ✅")

    return vector_db


if __name__ == "__main__":
    build_vector_db()