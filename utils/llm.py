from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

api_gemini_key = os.getenv("Google_API_KEY")
api_groq_key = os.getenv("GROQ_API_KEY")
api_openai_key = os.getenv("OPENAI_API_KEY")

def get_gemini():
    return ChatGoogleGenerativeAI(
        model = "gemini-2.5-flash",
        temperature =0,
        api_key = api_gemini_key
    )
    
def get_groq():
    return ChatGroq(
        model = "llama-3.3-70b-versatile",
        temperature=0,
        api_key= api_groq_key,
        
    )
    
def get_openai():
    return ChatOpenAI(
        model = "gpt-4o-mini",
        temperature=0,
        api_key= api_openai_key
    )
    
    
def invoke_with_fallback(prompt):
    try:
        llm = get_gemini()
        response = llm.invoke(prompt)
        return response , "Gemini"
    
    except Exception as gemini_error:
        print(f"Gemini Error : {gemini_error}")
        
        try:
            llm = get_groq()
            response = llm.invoke(prompt)
            return response , "Groq"
        except Exception as groq_error:
            print(f"Groq Error : {groq_error}")
            
            try:
                llm = get_openai()
                response = llm.invoke(prompt)
                return response , "OpenAI"
            except Exception as openai_error:
                raise Exception (
                    f"All LLM providers failed.\n"
                    f"Gemini: {gemini_error}\n"
                    f"Groq: {groq_error}\n"
                    f"OpenAI: {openai_error}"
                )