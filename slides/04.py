import streamlit as st
import pandas as pd
import numpy as np

st.title("Slide 4")
st.caption("This is slide 4")

st.sidebar.title("Sidebar")
if st.sidebar.button("Surprise"):
    st.write("Yes, you can use the sidebar!")
    st.sidebar.snow()
    st.image("https://media.tenor.com/JmGYf7TnjS4AAAAd/emma-favorite.gif")