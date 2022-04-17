import * as React from "react";
import { Input, Form } from "antd";
const FormItem = Form.Item;

// import classNames from "classnames";
var classNames = require("classnames");

export interface IBulmaInputProps {
  value: string | number | string[] | undefined | null;
  field: string;
  type?: "text" | "number" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
  loading: boolean | undefined;
}

const FormInput = ({
  value,
  field,
  onChange,
  label,
  error,
  touched,
  type = "text",
  loading,
}: IBulmaInputProps) => {
  return (
    <FormItem
      validateStatus={classNames(
        { validate: loading },
        { error: error && touched }
      )}
    >
      <label className="label">{label}</label>
      <div className="control">
        <Input
          type={type}
          name={field}
          placeholder={`Input ${label}`}
          value={value ? value : ""}
          onChange={onChange}
        />
      </div>
      {error && touched && <p className="help is-danger">{error}</p>}
    </FormItem>
  );
};

export default FormInput;
