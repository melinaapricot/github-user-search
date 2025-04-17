import React, { useState } from "react";
import "./Search.scss";

type SearchProps = {
  onSearch: (username: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

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
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
