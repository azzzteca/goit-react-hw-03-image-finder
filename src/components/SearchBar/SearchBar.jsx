import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

export function SearchBar({ onSearchImages }) {
  return (
    <header className={s.bar}>
      <form
        onSubmit={onSearchImages}
        className={s.formSearch}
        name="formSearch"
      >
        <button type="submit" className={s.buttonSearch} name="buttonSearch">
          {" "}
        </button>

        <input
          type="text"
          name="inputSearch"
          className={s.inputSearch}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSearchImages: PropTypes.func,
};
