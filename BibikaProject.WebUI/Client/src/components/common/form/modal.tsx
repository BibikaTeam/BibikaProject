import { Modal } from "antd";
import { Outlet } from "react-router-dom";
import { JsxElement } from "typescript";

export interface IFormModalProps {
  title: string;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormModal: React.FC<IFormModalProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  children,
}) => {
  return (
    <Modal title={title} visible={visible} onCancel={onCancel} onOk={onSubmit}>
      {children}
    </Modal>
  );
};

export default FormModal;
