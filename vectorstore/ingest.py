from datasets import load_dataset
from langchain_core.documents import Document

def load_dataset_data():
    dataset = load_dataset("sentence-transformers/codesearchnet")

    return dataset["train"]

def shuffle_dataset(dataset):
    dataset = dataset.shuffle(seed=42)
    dataset = dataset.select(range(10000))
    
    return dataset

def convert_to_documents(dataset):

    documents = []

    for row in dataset:

        doc = Document(
           page_content=f"""
            Documentation:
            {row.get("comment", "")}

               Code:
               {row["code"]}
       """,
            metadata={
                "dataset": "CodeSearchNet"
            }
        )

        documents.append(doc)

    return documents


def ingest():

    dataset = load_dataset_data()

    dataset = shuffle_dataset(dataset)

    documents = convert_to_documents(dataset)
    
    return documents

def main():

    documents = ingest()

    print(f"Number of documents: {len(documents)}")
    print(documents[0].page_content[:500])
    
    
if __name__ == "__main__":
    main()