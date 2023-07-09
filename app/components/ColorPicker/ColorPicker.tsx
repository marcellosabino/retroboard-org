import styles from "./ColorPicker.module.scss";

type Params = {
  onChange: (color: string) => void;
  selected?: string;
};

export default function ColorPicker({ selected, onChange }: Params) {
  const colors = [
    "#d2f0b9",
    "#f6daea",
    "#e5daf7",
    "#dfd6d3",
    "#deecff",
    "#f2f2d8",
    "#f2e1d8",
    "#e3e3e3",
    "#e7f0d1",
    "#d1f0da",
    "#d1f0e6",
    "#f0d1d1",
    "#d1f0ed",
    "#d1eaf0",
    "#f0e9d1",
  ];

  return (
    <div className={styles.color_picker}>
      {colors.map((color: string) => (
        <label key={color} style={{ background: color }}>
          <input
            type="radio"
            name="color"
            value={color}
            defaultChecked={selected === color}
            onChange={(e) => onChange(e.target.value)}
          />
          <span></span>
        </label>
      ))}
    </div>
  );
}
