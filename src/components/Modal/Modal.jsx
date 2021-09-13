import React from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", (evt) => {
      if (evt.code === "Escape") {
        this.props.closeModal();
      }
    });
  }

  render() {
    return (
      <div
        onClick={(evt) => {
          if (evt.target.nodeName === "IMG") {
            return;
          }

          this.props.closeModal();
        }}
        className={s.overlay}
      >
        <div className={s.modal}>
          <img src={this.props.url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  url: PropTypes.string,
};
