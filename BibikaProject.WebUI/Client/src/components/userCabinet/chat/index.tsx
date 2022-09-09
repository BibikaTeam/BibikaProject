import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import { getAllChats, getMessages, sendMessage } from "./service";
import { UserOutlined } from "@ant-design/icons";
import ChatPreviewsBlock from "./chatPreviewBlock";
import { IRequestError } from "../../adminPanel/types";
import { toast } from "react-toastify";
import { IMessage } from "./types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ChatPage = () => {
  const [activeEmail, setActiveEmail] = useState<string>();
  const [messages, setMessages] = useState<Array<IMessage>>();
  const { user } = useTypedSelector((x) => x.login);

  useEffect(() => {
    (async () => {
      try {
        await getAllChats();
      } catch (_error) {
        const error: IRequestError = _error as IRequestError;
        error.errors.forEach((e) => {
          toast.error(e);
        });
      }
    })();
  }, []);
  const onActiveChatChange = async (email: string) => {
    setActiveEmail(email);
    await updateChats(email);
  };

  const updateChats = async (email: string) => {
    try {
      const result = await getMessages(email);
      setMessages(result);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      await sendMessage(activeEmail as string, e.target.value);
      e.target.value = "";
      await updateChats(activeEmail as string);
    }
  };

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
      <ChatPreviewsBlock onSelectedChange={onActiveChatChange} />
      <div className="col-8 chat-side ">
        <div className="messages-field">
          {messages && messages.length !== 0 ? (
            messages.map((x) => (
              <div className="message-container">
                <p className={user?.email === x.from ? `right-align` : ""}>
                  {x.text}
                </p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <input type="text" width={"100%"} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
};
export default ChatPage;
