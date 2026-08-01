from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from chains.router import invoke_router

app = FastAPI(
    title="AI Code Assistant",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://frontend-virird-delta-22.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str
    code: str = ""


class ChatResponse(BaseModel):
    provider: str
    answer: str


@app.get("/")
def root():
    return {
        "message": "AI Code Assistant API is running 🚀"
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:

        answer, provider = invoke_router(
            question=request.question,
            code=request.code
        )

        return ChatResponse(
            provider=provider,
            answer=answer
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
