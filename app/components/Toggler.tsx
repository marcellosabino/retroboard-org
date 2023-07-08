import { useState } from "react";
import styles from "./Toggler.module.scss";

type Params = {
  isChecked?: boolean;
  onToggle: (toggleState: boolean) => void;
};

export default function Toggler({ isChecked, onToggle }: Params) {
  const [checked, setChecked] = useState(!!isChecked);

  function toggle() {
    setChecked((previous) => {
      onToggle(!previous);
      return !previous;
    });
  }

  return (
    <label className={styles.toggler}>
      <input type="checkbox" onChange={toggle} checked={checked} />
      <span>
        <i className="bi bi-check" aria-hidden></i>
      </span>
    </label>
  );
}
