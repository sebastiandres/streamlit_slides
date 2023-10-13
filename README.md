# README

You want to use streamlit to present slides? Search no more. 

![Animated gif of the demo](/images/example.gif "Animated gif of the demo")

# Using it

Just follow these steps:
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

# The code
Interested on how it works? Want to contribute? Go to https://github.com/sebastiandres/streamlit_slides/issues


# Examples
- Live streamlit demo:https://stslides-example.streamlit.app
- Example repo: https://github.com/sebastiandres/streamlit_slides_example

# Bugs?

## Known bugs
- Cannot use st.echo

## Unknown bugs
File an issue at the repo: https://github.com/sebastiandres/streamlit_slides/issues