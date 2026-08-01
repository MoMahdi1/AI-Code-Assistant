import streamlit as st
from chains.router import invoke_router

st.set_page_config(
    page_title="AI Code Assistant",
    page_icon="🤖",
    layout="wide"
)

st.title("🤖 AI Code Assistant")

question = st.text_area(
    "Ask your programming question"
)

code = st.text_area(
    "Code (Optional)",
    height=250
)

if st.button("Generate Response"):

    if question.strip():

        with st.spinner("Thinking..."):

            answer, provider = invoke_router(
                question=question,
                code=code
            )

        st.success(f"Provider: {provider}")

        st.markdown(answer)

    else:
        st.warning("Please enter a question.")
