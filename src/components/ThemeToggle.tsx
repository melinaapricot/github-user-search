import "./ThemeToggle.scss";

interface ToggleProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

export const ThemeToggle = ({ handleChange, isChecked }: ToggleProps) => {
  return (
    <div className="toggle__container">
      <input
        type="checkbox"
        id="theme-toggle"
        className="toggle__input"
        onChange={handleChange}
        checked={isChecked}
        aria-checked={isChecked}
        role="switch"
        aria-label="Toggle between light and dark mode"
      />
      <label htmlFor="theme-toggle" className="toggle__button">
        {isChecked ? "☀️" : "🌙"}
      </label>
    </div>
  );
};
