import { Select } from "antd";
const Option = Select.Option;

export interface ISelectProps {
  value: number | string | undefined;
  options: Array<{ title: string; id: number }>;
  onChange: (value: any) => any;
  placeholder: string | undefined | null;
  loading: boolean;
  disabled: boolean;
  allowClear: boolean;
}

const AntdSelect = ({
  value,
  options,
  onChange,
  placeholder = "",
  loading = false,
  disabled = false,
  allowClear = false,
}: ISelectProps) => {
  return (
    <Select
      showSearch
      placeholder={placeholder}
      style={{ width: 200 }}
      value={value}
      onChange={onChange}
      loading={loading}
      disabled={disabled}
      allowClear={allowClear}
    >
      {options.map((element, id) => {
        return (
          <Option key={id} value={element.id}>
            {element.title}
          </Option>
        );
      })}
    </Select>
  );
};
AntdSelect.defaultProps = { allowClear: false };
export default AntdSelect;
