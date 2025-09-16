interface NumberInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
}


export const NumberInput = ({ label, value, onChange, onBlur }: NumberInputProps) => (
    <div className="text flex-5-r">
        {label}
        <input
            type="text"
            className="text input input-reset"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
            onBlur={onBlur}
        />
    </div>
);