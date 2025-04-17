import useLocalStorage from "use-local-storage";

export const useTheme = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};
