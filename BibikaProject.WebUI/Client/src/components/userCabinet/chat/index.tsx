import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import {
  createChat,
  getAllChats,
  getMessages,
  getUserName,
  sendMessage,
} from "./service";
import { UserOutlined } from "@ant-design/icons";
import ChatPreviewsBlock from "./chatPreviewBlock";
import { IRequestError } from "../../adminPanel/types";
import { toast } from "react-toastify";
import { IMessage } from "./types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useSearchParams } from "react-router-dom";
import LoadingPage from "../../containers/defaultLayout/loading";

const ChatPage = () => {
  const [activeEmail, setActiveEmail] = useState<string>();
  const [messages, setMessages] = useState<Array<IMessage>>();
  const { user } = useTypedSelector((x) => x.login);
  const [userName, setUserName] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const email = searchParams.get("email") as string;
        const chats = await getAllChats();

        if (email && email != null && email.includes("@")) {
          await createChat(email);
          await onActiveChatChange(email);
        } else {
          await onActiveChatChange(chats[0]);
        }

        setLoading(false);
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
    await updateUserName(email);
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

  const updateUserName = async (emailWith: string) => {
    try {
      const _userName = await getUserName(emailWith);
      setUserName(_userName as string);
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

  if (loading) return <LoadingPage></LoadingPage>;

  return (
    <div className="chat-container">
      <span className="message-text">Your messages</span>
      <div className="row">
        <div className="col-8 offset-4 chat-header">
          <span className="chat-name">
            {" "}
            <Avatar
              className="user-icon"
              size={50}
              style={{ margin: "5px" }}
              icon={<UserOutlined />}
            />
            <span className="username-header">{userName}</span>
          </span>
        </div>
      </div>
      <div className="row">
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
    </div>
  );
};
export default ChatPage;
