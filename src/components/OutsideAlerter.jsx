import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
	console.log(this.props.isActive);
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (this.props.isActive && event.target.className !== this.props.parameterid && event.target.className !== this.props.parameterid2) {
        this.props.setisActive();
      }
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
