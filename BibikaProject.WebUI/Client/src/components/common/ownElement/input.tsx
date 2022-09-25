export interface IInputProps {
  className: string;
  disabled: boolean;
  onChange: (value: any) => Promise<void>;
  placeholder: string | undefined;
  loading: boolean;
  value: number | string;
  type: "number" | "text";
}

const MyInput = ({
  className,
  disabled,
  onChange,
  placeholder,
  loading,
  value,
  type,
}: IInputProps) => {
  return (
    <input
      className={`my-own-input ${className}`}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      type={type}
    />
  );
};
export default MyInput;

MyInput.defaultProps = {
  disabled: false,
  className: "",
  placeholder: "",
  loading: false,
  value: 0,
  type: "text",
};
