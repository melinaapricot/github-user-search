export const fetchGitHubData = async (username: string) => {
  const base_url = "https://api.github.com/users";

  const cachedUserData = localStorage.getItem(`user-${username}`);
  const cachedReposData = localStorage.getItem(`repos-${username}`);

  if (cachedUserData && cachedReposData) {
    return {
      user: JSON.parse(cachedUserData),
      repos: JSON.parse(cachedReposData),
      fromCache: true,
    };
  }

  try {
    const userRes = await fetch(`${base_url}/${username}`);
    if (userRes.status === 404) {
      return { user: null, repos: null, fromCache: false };
    }
    if (!userRes.ok) throw new Error("User not found");

    const userData = await userRes.json();
    localStorage.setItem(`user-${username}`, JSON.stringify(userData));

    const reposRes = await fetch(`${base_url}/${username}/repos`);
    if (!reposRes.ok) throw new Error("Repos not found");

    const reposData = await reposRes.json();
    localStorage.setItem(`repos-${username}`, JSON.stringify(reposData));

    return { user: userData, repos: reposData, fromCache: false };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
