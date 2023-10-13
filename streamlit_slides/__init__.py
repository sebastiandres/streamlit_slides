import os
import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = True

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if _RELEASE:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("slideshow_buttons", path=build_dir)
else:
    # This is for local development and testing
    # We give the component name and the local URL where Streamlit can reach the frontend
    # Remember to run `npm run start` on the frontend folder to start the local server
    # This allows to have hot reloading on the frontend
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "slideshow_buttons",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",
    )


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def slideshow_buttons(number_of_slides, key=None):
    """Create a new instance of "slideshow_buttons".

    Parameters
    ----------
    number_of_slides: str
        The total number of slides on the deck.
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    int
        The value of the current slide.
    """
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.
    component_value = _component_func(
                                        number_of_slides=number_of_slides, 
                                        default=1,
                                        key=key, 
                                    )

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value



def set_slide_config(
                    page_title=None, 
                    page_icon=None, 
                    layout="centered", 
                    initial_sidebar_state="auto", 
                    menu_items=None, 
                    DEBUG=False
                ):
    """
    Wrapper that handles all the details
    """
    from . import slideshow_buttons
    import glob
    import streamlit as st

    # Set the page properties
    st.set_page_config(
        page_title=page_title,
        page_icon=page_icon,
        layout=layout,
        initial_sidebar_state=initial_sidebar_state,
        menu_items=menu_items)

    # Gets all the slides on the slides/ folder
    slides = sorted(glob.glob("slides/*.py"))

    # Creates the buttons, with strict boundaries. Cannot go beyond the first or last slide
    st.session_state["current_slide"] = slideshow_buttons(len(slides))

    # Displays the current slide number - just for debug
    if DEBUG:
        st.write(st.session_state["current_slide"])

    # Displays python file for the current slide
    slide = slides[st.session_state["current_slide"] - 1]
    with open(slide, "rb") as source_file:
        code = compile(source_file.read(), slide, "exec")
    exec(code)#, module.__dict__)
    return