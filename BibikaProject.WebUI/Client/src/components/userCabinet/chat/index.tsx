import { Avatar } from "antd";
import { useEffect } from "react";
import { getAllMessages } from "./service";
import { UserOutlined } from "@ant-design/icons";

const ChatPage = () => {
  useEffect(() => {
    (async () => {
      await getAllMessages();
    })();
  });

  return (
    <div className="row chat-container">
      <div className="row">
        <div className="col-8 offset-4 chat-header">
          <span className="chat-name">
            {" "}
            <Avatar
              size={49}
              style={{ backgroundColor: "#2D40E0", marginTop: "5px" }}
              icon={<UserOutlined />}
            />
            Maxim
          </span>
        </div>
      </div>
      <div className="col-4 all-chats">
        <div className="row chat-preview active">
          <div className="row">
            <div className="col-9">
              <span className="message-by-car">Audi Q8 S Line</span>
            </div>
            <div className="col-3">
              <span className="time-last-message">19:20</span>
            </div>
          </div>
          <span className="last-message-username">
            Maxim:
            <span className="last-message-text"> Ok, see you later</span>
          </span>
        </div>
        <div className="row chat-preview">
          <div className="row">
            <div className="col-9">
              <span className="message-by-car">Audi Q8 S Line</span>
            </div>
            <div className="col-3">
              <span className="time-last-message">19:20</span>
            </div>
          </div>
          <span className="last-message-username">
            Maxim:
            <span className="last-message-text"> Ok, see you later</span>
          </span>
        </div>
      </div>
      <div className="col-8 chat-side ">
        <div className="messages-field">
          <div className="message-container">
            <span>Hellakdkasjhdkl ashd agsd kgakhsjg dajsd </span>
          </div>
          <div className="message-container">
            <span>Hellakdkasjhdkl </span>
          </div>
          {/* <span>Hellakdkasjhdkl sadufys aaskljd fjkasd </span>
          <span>Hellakdkasjhdkl </span> */}
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
