import Select from "react-select";

export interface ISelectOption {
  value: number | string;
  label: string | number;
}

export interface ISelectProps {
  className: string;
  values: Array<ISelectOption>;
  disabled: boolean;
  onChange: (value: any) => Promise<void>;
  placeholder: string | undefined;
  loading: boolean;
  value: number | undefined;
}

const MySelect = ({
  className,
  values,
  disabled,
  onChange,
  placeholder,
  loading,
  value,
}: ISelectProps) => {
  const onInsideChange = (select: any) => {
    onChange(select.target.value);
  };

  return (
    <select
      className={`my-own-select ${className}`}
      disabled={disabled}
      onChange={onInsideChange}
      placeholder={placeholder}
      value={value ? value : undefined}
    >
      <option value="default" hidden>{`${placeholder}...`}</option>
      {values.map((x) => (
        <option
          value={x.value && x.value !== null ? x.value : ""}
          key={x.value}
        >
          {x.label}
        </option>
      ))}
    </select>
  );
  // return <Select options={values} className="my-own-select" />;
};
export default MySelect;

MySelect.defaultProps = {
  disabled: false,
  className: "",
  placeholder: "",
  loading: false,
  value: undefined,
};
