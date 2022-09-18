import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IRequestError } from "../../adminPanel/types";
import { getLastMessage, getUserName } from "./service";
import { IMessage } from "./types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export interface IChatPreview {
  isActive: boolean;
  emailWith: string;
  onClick: (email: string) => any;
}

const ChatPreview = ({ isActive, emailWith, onClick }: IChatPreview) => {
  const [userName, setUserName] = useState<string>();
  const [lastMessage, setLastMessage] = useState<IMessage>();

  useEffect(() => {
    (async () => {
      try {
        const userName = await getUserName(emailWith);
        const lastMessage = await getLastMessage(emailWith);
        setLastMessage(lastMessage);
        setUserName(userName);
      } catch (_error) {
        const error: IRequestError = _error as IRequestError;
        error.errors.forEach((e) => {
          setLastMessage({ date: undefined, from: "", text: "", to: "" });
          //   toast.error(e);
        });
      }
    })();
  }, []);

  const onHandleClick = () => {
    onClick(emailWith);
  };

  return (
    <div
      className={`row chat-preview ${isActive ? "active" : ""}`}
      onClick={onHandleClick}
    >
      <div className="row">
        <div className="col-9">
          <span className="message-by-car">{emailWith}</span>
        </div>
        <div className="col-3">
          <span className="time-last-message">
            {lastMessage?.date
              ? new Date(lastMessage?.date as Date).toLocaleTimeString()
              : ""}
          </span>
        </div>
      </div>
      <span className="last-message-username">
        {lastMessage?.from}:
        <span className="last-message-text"> {lastMessage?.text}</span>
      </span>
    </div>
  );
};

export default ChatPreview;
