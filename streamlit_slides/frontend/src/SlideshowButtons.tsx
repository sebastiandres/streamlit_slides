import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

interface State {
  currentSlide: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class SlideshowButtons extends StreamlitComponentBase<State> {
  // Initialization
  public state = { currentSlide: 1 }

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "number_of_slides" arg.
    const number_of_slides = this.props.args["number_of_slides"]

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      style.cursor = `pointer`
      style.width = `auto`
      style.padding = `16px`
      style.fontWeight = `bold`
      style.fontSize = `18px`
      style.borderRadius= `0 3px 3px 0`
      style.userSelect = `none`
    }

    document.addEventListener("keyup", 
    (e) => {
      // Avoid default behavior - prevent from firing up the key multiple times 
      e.stopImmediatePropagation();
      // Process next slide
        if (e.key === "ArrowRight" || e.key === " " || e.key === "n" ) {
          // Use the next slide
          this.onNextCliked();
        }
        // alert(`Key "${e.key}" pressed [event: keydown]`);
        if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "p" ) {
          // Use the previous slide
          this.onPreviousCliked();
        }
    },
    true);

    // Show a button and some text.
    // When the button is clicked, we'll increment our "currentSlide" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div
          style={{
            margin: "auto",
            width: "300px",
            //color: "red",
          }}
      >
          <a 
            style={style}
            onClick={this.onPreviousCliked}
          >
            &#10094;
          </a>
          <a
            style={style}
            onClick={this.info}
         >
            &nbsp; Slide: {this.state.currentSlide}/{number_of_slides} &nbsp;
          </a>
          <a
            style={style}
            onClick={this.onNextCliked}
          >
            &#10095;
          </a>
      </div>
    )
  }

  /** Click handler for our "Click Me!" button. */
  private onPreviousCliked = (): void => {
    // Increment state.currentSlide, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ currentSlide: Math.max(1, prevState.currentSlide - 1) }),
      () => Streamlit.setComponentValue(this.state.currentSlide)
    );
    // console.log("prev slide"); // useful for debugging
  }
  
  /** Click handler for our "Click Me!" button. */
  private onNextCliked = (): void => {
    // Increment state.currentSlide, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ currentSlide: Math.min(this.props.args["number_of_slides"], prevState.currentSlide + 1) }),
      () => Streamlit.setComponentValue(this.state.currentSlide)
    );
    //console.log("next slide"); // useful for debugging
  }

  private info = (): void => {
    // Info on how to use it
    alert("Use spacebar, right key or 'n' to load the next slide.\nUse backspace, left key or 'p' to load the previous slide");
    //console.log("next slide"); // useful for debugging
  }

}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(SlideshowButtons)
