import streamlit as st
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt

#st.set_page_config(layout="centered")
st.title("Slide 3")
st.caption("This is slide 3")

if st.button("Surprise"):
    st.balloons()
    c1, c2 = st.columns([1,2])
    N = 3
    df = pd.DataFrame(np.random.randn(10, N), columns=('col %d' % i for i in range(N)))
    c1.dataframe(df)
    # The plot
    fig = plt.figure()
    x = np.arange(df.shape[0])
    for col in df.columns:
        plt.plot(x, df[col], label=col)
    plt.title("A plot with random data")
    plt.xlabel("x")
    plt.ylabel("y")
    c2.pyplot(fig)

