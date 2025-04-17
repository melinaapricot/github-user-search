import React from "react";
import "./ReposList.scss";
import { GitHubRepo } from "../types/types";
import Pagination from "./Pagination";

type Props = {
  repos: GitHubRepo[];
};

const ReposList: React.FC<Props> = ({ repos }) => {
  const [sortOption, setSortOption] = React.useState<"stars" | "updated">(
    "updated"
  );

  const sortedRepos = React.useMemo(() => {
    return [...repos].sort((a, b) => {
      if (sortOption === "stars") {
        return b.stargazers_count - a.stargazers_count;
      } else if (sortOption === "updated") {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }
      return 0;
    });
  }, [repos, sortOption]);

  // Pagination logic
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const endIndex = currentPage * itemsPerPage;
  const firstIndex = endIndex - itemsPerPage;
  const currentRepos = sortedRepos.slice(firstIndex, endIndex);
  const totalPages = Math.ceil(repos.length / itemsPerPage);

  return (
    <>
      <section className="repos">
        <div className="repos__header">
          <h2>Repositories</h2>{" "}
          <div className="repos__sort">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as "stars" | "updated")
              }
              className="repos__sort-dropdown"
            >
              <option value="stars">Stars</option>
              <option value="updated">Last Updated</option>
            </select>
          </div>
        </div>

        <div className="">
          {currentRepos.map((repo) => (
            <div key={repo.id} className="user__repo">
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description available"}</p>
              <p>⭐ {repo.stargazers_count}</p>
              <p>Language: {repo.language || "Unknown"}</p>
            </div>
          ))}
        </div>
      </section>
      {totalPages > 1 && (
        <Pagination
          totalItems={repos.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ReposList;
