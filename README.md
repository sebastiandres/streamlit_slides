# README

You want to use streamlit to present slides? Search no more. Just follow these steps:

* Install: 
```bash
pip install streamlit-slides
```

* Import it on your main file
```python
import streamlit-slides as ss
ss.set_slide_config() # Same properties as st.set_page_config()
```

* Put all your streamlit files in a slides/ folder

* Run as usual
```bash
streamlit run my_slide_example.py
```

# Live example
Live demo:
https://stslides-example.streamlit.app
Example repo:
https://github.com/sebastiandres/streamlit_slides_example

* Live example on streamlit cloud

# Known bugs
- Cannot use st.echo
