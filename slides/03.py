import streamlit as st
import pandas as pd
import numpy as np

st.title("Slide 3")
st.caption("This is slide 3")

if st.button("Surprise"):
    st.dataframe(pd.DataFrame(np.random.randn(10, 5), columns=('col %d' % i for i in range(5))))
    st.balloons()