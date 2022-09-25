import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IRequestError } from "../../adminPanel/types";
import { getLastMessage, getUserName } from "./service";
import { IMessage } from "./types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Link } from "react-router-dom";

export interface IChatPreview {
  isActive: boolean;
  emailWith: string;
  onClick: (email: string) => any;
}

const ChatPreview = ({ isActive, emailWith, onClick }: IChatPreview) => {
  const [userName, setUserName] = useState<string>();
  const [lastMessage, setLastMessage] = useState<IMessage>();
  const { user } = useTypedSelector((x) => x.login);

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
    <Link to={`/user-profile/chat?email=${emailWith}`}>
      <div
        className={`row chat-preview ${isActive ? "active" : ""}`}
        onClick={onHandleClick}
      >
        <div className="row">
          <div className="col-9">
            <span className="message-by-car">{userName}</span>
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
          {lastMessage && (
            <>
              {user?.email == lastMessage?.from ? user?.name : userName}:
              <span className="last-message-text"> {lastMessage?.text}</span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
};

export default ChatPreview;
