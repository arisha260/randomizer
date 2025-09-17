interface CheckboxInputProps {
  value: boolean;
  onChange: (val: boolean) => void;
}


export const CheckboxInput = ({ value, onChange}: CheckboxInputProps) => (
    <div className="text flex-5-r">
        Только уникальные
        <input
            type="checkbox"
            name="unique"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="input-reset input-checkbox"
        />
    </div>
);