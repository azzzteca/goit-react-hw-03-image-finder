import PropTypes from "prop-types";
import s from "./Button.module.css";

export function Button({ onLoadMore }) {
  return (
    <button onClick={onLoadMore} type="button" className={s.buttonMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
