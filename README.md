```
AI-Code-Assistant/
│
├── app.py
├── .env
├── .gitignore
├── README.md
├── requirements.txt
│
├── chains/
│   ├── __init__.py
│   ├── router.py
│   ├── explanation.py
│   ├── evaluator.py
│   └── generator.py
│
├── prompts/
│   ├── __init__.py
│   ├── router_prompt.py
│   ├── evaluator_prompt.py
│   └── generator_prompt.py
│
├── vectorstore/
│   ├── __init__.py
│   ├── ingest.py
│   └── retriever.py
│
├── utils/
│   ├── __init__.py
│   └── helper.py
│
├── data/
│   └── programming_docs/
│
├── db/
│   └── chroma_db/
│
└── research/
    └── trials.ipynb
