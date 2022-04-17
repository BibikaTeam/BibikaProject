import { Button } from "antd";

export interface IFormButtonProps {
  text: string;
  htmlType: "button" | "reset" | "submit";
  loading: boolean | undefined;
  buttonType:
    | "default"
    | "primary"
    | "dashed"
    | "text"
    | "link"
    | "ghost"
    | undefined;
}

const FormButton = ({
  text,
  htmlType,
  loading,
  buttonType = "default",
}: IFormButtonProps) => {
  return (
    <Button type={buttonType} htmlType={htmlType} loading={loading}>
      {text}
    </Button>
  );
};

export default FormButton;
