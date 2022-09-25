import * as React from "react";
import { useState } from "react";
import { Modal } from "antd";
import MyInput from "../../common/ownElement/input";
import { addMoneyToPost } from "./service";

export interface IModalAdvUpProps {
  postId: number;
  isOpen: boolean;
  handleModalOpen: () => any;
  handleModalClose: () => any;
}

const ModalAdvUp = ({
  postId,
  isOpen,
  handleModalClose,
  handleModalOpen,
}: IModalAdvUpProps) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(200);

  const handleOk = async () => {
    await addMoneyToPost({ postId, views: selectedPrice });
    handleModalClose();
  };
  const handleCancel = () => {
    handleModalClose();
  };
  const handlePriceChange = async (value: any) => {
    setSelectedPrice(value.target.value);
  };

  return (
    <Modal
      title="Up your post"
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-adv-up"
      width={1000}
      footer={[
        <div className="my-modal-footer">
          <span className="selected-price">{selectedPrice}uah</span>
          <button onClick={handleOk}>Pay</button>
        </div>,
      ]}
    >
      <>
        <div>
          <p>
            Pay more - be{" "}
            <span style={{ color: "#E06738", fontSize: "34px" }}>higher</span>
          </p>
          <span className="helper-span">For</span>
          <MyInput
            onChange={(value) => handlePriceChange(value)}
            value={selectedPrice}
            type="number"
          />
          <span className="currency">uah</span>
        </div>
      </>
    </Modal>
  );
};

export default ModalAdvUp;
