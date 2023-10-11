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
      //style.border = `1px solid ${theme.primaryColor}`
      style.cursor = `pointer`
      //style.position = `absolute`
      //style.top = `50%`
      style.width = `auto`
      //style.margin-top = `-22px`
      style.padding = `16px`
      //style.color = `white`
      style.fontWeight = `bold`
      style.fontSize = `18px`
      //style.transition = `0.6s ease`
      style.borderRadius= `0 3px 3px 0`
      style.userSelect = `none`
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "currentSlide" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div
          style={{
            margin: "auto",
            width: "200px",
            //color: "red",
          }}
      >
          <a 
            style={style}
            onClick={this.onPreviousCliked}
          >
            &#10094;
          </a>
          &nbsp; Slide: {this.state.currentSlide}/{number_of_slides} &nbsp;
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
      )
    }
  
  /** Click handler for our "Click Me!" button. */
  private onNextCliked = (): void => {
    // Increment state.currentSlide, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ currentSlide: Math.min(this.props.args["number_of_slides"], prevState.currentSlide + 1) }),
      () => Streamlit.setComponentValue(this.state.currentSlide)
    )
  }

}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(SlideshowButtons)
