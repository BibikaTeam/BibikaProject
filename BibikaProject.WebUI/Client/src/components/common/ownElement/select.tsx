export interface ISelectOption {
  key: string | number;
  title: string | number;
}

export interface ISelectProps {
  className: string;
  values: Array<ISelectOption>;
  disabled: boolean;
}

const MySelect = ({ className, values, disabled }: ISelectProps) => {
  console.log("values", values);
  return (
    <select className={`my-own-select ${className}`} disabled={disabled}>
      {values.map((x) => (
        <option value={x.key}>{x.title}</option>
      ))}
    </select>
  );
};
export default MySelect;

MySelect.defaultProps = {
  disabled: false,
  className: "",
};
