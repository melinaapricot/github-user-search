import React, { useEffect, useMemo, useState } from "react";
import "./Search.scss";
import deleteIcon from "../assets/deleteIcon.svg";
import debounce from "lodash.debounce";

type SearchProps = {
  onSearch: (username: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 700),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);

    if (value === "") {
      onSearch("");
      return;
    }
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onSearch(trimmedInput);
    }
  };

  const handleClear = () => {
    setInput("");
    onSearch("");
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-wrapper">
        <input
          type="text"
          placeholder="Search GitHub username..."
          className="search__input"
          value={input}
          onChange={handleChange}
        />

        <button
          type="button"
          aria-label="Clear input"
          className={`search__delete-btn ${
            input ? "search__delete-btn--visible" : ""
          }`}
          onClick={handleClear}
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
      </div>

      <button className="search__submit-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
