import { useState } from "react";
import Search from "./components/Search";
import ProfileCard from "./components/ProfileCard";
import { Header } from "./components/Header";
import { GitHubRepo } from "./interfaces/interfaces";
import ReposList from "./components/ReposList";
import { useTheme } from "./hooks/useTheme";
import { fetchGitHubData } from "./utils/fetchGithubData";
import "./styles/app.scss";

function App() {
  const [userData, setUserData] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [userRepos, setUserRepos] = useState<GitHubRepo[] | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [reposLoading, setReposLoading] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  const handleSearch = async (username: string) => {
    if (username.trim() === "") {
      setUserData(null);
      setUserRepos(null);
      setUserNotFound(false);
      return;
    }

    setProfileLoading(true);
    setReposLoading(true);

    try {
      const { user, repos, fromCache } = await fetchGitHubData(username);

      setUserData(user);
      setUserRepos(repos);
      setUserNotFound(false);

      if (fromCache) {
        console.log("Loaded from cache"); // logging for demonstration purposes
      } else {
        console.log("Fetched from API"); // logging for demonstration purposes
      }
    } catch (error) {
      setUserData(null);
      setUserRepos(null);
      setUserNotFound(true);
      console.error(error);
    } finally {
      setProfileLoading(false);
      setReposLoading(false);
    }
  };
  return (
    <div className="app" data-theme={isDark ? "dark" : "light"}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main className="app__wrapper">
        <Search onSearch={handleSearch} />

        {(profileLoading || reposLoading) && (
          <div className="app__loading-overlay">
            <div className="app__spinner" />
          </div>
        )}

        {!profileLoading && userNotFound && (
          <div className="app__error-message">User not found</div>
        )}

        {!profileLoading && userData && <ProfileCard user={userData} />}

        {!reposLoading && userRepos && userRepos.length > 0 ? (
          <ReposList repos={userRepos} />
        ) : (
          !reposLoading &&
          userData && (
            <div className="app__error-message">No available repos</div>
          )
        )}
      </main>
    </div>
  );
}
export default App;
