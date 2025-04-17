import React, { useEffect, useMemo, useState } from "react";
import "./Search.scss";
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
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      onSearch("");
      return;
    }
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="search__input"
        value={input}
        onChange={handleChange}
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
