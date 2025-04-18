import "./ThemeToggle.scss";

interface ToggleProps {
  toggleTheme: () => void;
  isChecked: boolean;
}

export const ThemeToggle = ({ toggleTheme, isChecked }: ToggleProps) => {
  return (
    <div className="toggle__container">
      <button
        type="button"
        className="toggle__button"
        onClick={toggleTheme}
        aria-checked={isChecked}
        role="switch"
        aria-label="Toggle between light and dark mode"
      >
        {isChecked ? "☀️" : "🌙"}
      </button>
    </div>
  );
};
