import React, { useCallback, useRef, useState } from "react";
// @ts-ignore
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import styles from "./Search.module.scss";
import close from "../../assets/img/close.svg";
import search from "../../assets/img/search.svg";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  // const { searchValue, setSearchValue } = useContext(SearchContext);// пример контекст
  const inputEl = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputEl.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((s: string) => {
      dispatch(setSearchValue(s));
    }, 350),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="0" />
      <input
        value={value}
        ref={inputEl}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder=""
      />
      {value && (
        <img
          onClick={() => onClickClear()}
          className={styles.close}
          src={close}
          alt="x"
        />
      )}
    </div>
  );
};

export default Search;
