import { ThemeToggle } from "./ThemeToggle";
import "./Header.scss";

type HeaderProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const Header = ({ isDark, toggleTheme }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="header__title">
        <a href="/" className="header__link">
          GitHub User Search
        </a>
      </h1>
      <ThemeToggle isChecked={isDark} toggleTheme={toggleTheme} />
    </header>
  );
};
