import { useState } from "react";
import Search from "./components/Search";
import ProfileCard from "./components/ProfileCard";
import { Header } from "./components/Header";
import { GitHubRepo } from "./types/types";
import ReposList from "./components/ReposList";
import useLocalStorage from "use-local-storage";
import "./styles/app.scss";

function App() {
  const [userData, setUserData] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [userRepos, setUserRepos] = useState<GitHubRepo[] | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [reposLoading, setReposLoading] = useState(false);

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const handleSearch = async (username: string) => {
    const base_url = "https://api.github.com";

    setProfileLoading(true);
    setReposLoading(true);

    const cachedUserData = localStorage.getItem(`user-${username}`);
    const cachedReposData = localStorage.getItem(`repos-${username}`);

    if (cachedUserData && cachedReposData) {
      setUserData(JSON.parse(cachedUserData));
      setUserRepos(JSON.parse(cachedReposData));
      setUserNotFound(false);
      setProfileLoading(false);
      setReposLoading(false);
      return;
    }
    try {
      const userRes = await fetch(`${base_url}/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");

      const userData = await userRes.json();
      setUserData(userData);
      setUserNotFound(false);

      localStorage.setItem(`user-${username}`, JSON.stringify(userData));
    } catch (err) {
      console.error("Error fetching user:", err);
      setUserData(null);
      setUserRepos(null);
      setUserNotFound(true);
    } finally {
      setProfileLoading(false);
    }

    try {
      const reposRes = await fetch(`${base_url}/users/${username}/repos`);
      if (!reposRes.ok) throw new Error("Repos not found");

      const reposData = await reposRes.json();
      setUserRepos(reposData);

      localStorage.setItem(`repos-${username}`, JSON.stringify(reposData));
    } catch (err) {
      console.error("Error fetching repos:", err);
      setUserRepos(null);
    } finally {
      setReposLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="app" data-theme={isDark ? "dark" : "light"}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main className="app__container">
        <Search onSearch={handleSearch} />

        {(profileLoading || reposLoading) && (
          <div className="app__loading-overlay">
            <div className="app__spinner"></div>
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
