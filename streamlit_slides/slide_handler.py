import streamlit as st

def slide_master():
    """
    Wrapper that handles all the details
    """
    from . import slideshow_buttons

    slides = glob.glob("slides/*.py")
    slides.sort()
    st.write(slides)

    st.session_state["current_slide"] = slideshow_buttons(len(slides))

    """
    if "current_slide" not in st.session_state:
        st.session_state["current_slide"] = 1

    if num != st.session_state["current_slide"]:
        st.session_state["current_slide"] = num
        if st.session_state["current_slide"] > len(slides):
            st.session_state["current_slide"] = len(slides)
        st.rerun()

    if st.button("Next slide"):
        st.session_state["current_slide"] += 1
        if st.session_state["current_slide"] > len(slides):
            st.session_state["current_slide"] = len(slides)
        st.rerun()

    if st.button("Previous slide"):
        st.session_state["current_slide"] -= 1
        if st.session_state["current_slide"] < 1:
            st.session_state["current_slide"] = 1
        st.rerun()
    """

    slide = slides[st.session_state["current_slide"] - 1]
    exec(open(slide).read())    