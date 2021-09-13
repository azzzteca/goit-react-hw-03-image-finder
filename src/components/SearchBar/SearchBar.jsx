import s from "./SearchBar.module.css";

export function SearchBar({ onSearchImages }) {
  return (
    <div className={s.bar}>
      <form
        onSubmit={onSearchImages}
        className={s.formSearch}
        name="formSearch"
      >
        <button type="submit" className={s.buttonSearch} name="buttonSearch">
          {" "}
        </button>

        <input type="text" name="inputSearch" className={s.inputSearch} />
      </form>
    </div>
  );
}
