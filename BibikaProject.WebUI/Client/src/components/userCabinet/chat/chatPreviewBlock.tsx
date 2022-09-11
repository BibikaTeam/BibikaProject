import { useEffect, useState } from "react";
import ChatPreview from "./chatPreview";
import { getAllChats } from "./service";

export interface IChatPreviewsBlockProps {
  onSelectedChange: (email: string) => any;
}

const ChatPreviewsBlock = ({ onSelectedChange }: IChatPreviewsBlockProps) => {
  const [selectedMail, setSelectedMail] = useState<string>();
  const [chats, setChats] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const result = await getAllChats();
      setChats(result);
      setSelectedMail(result[0]);
    })();
  }, []);

  const onHandleSelectedChange = (email: string) => {
    setSelectedMail(email);
    onSelectedChange(email);
  };

  return (
    <div className="col-4 all-chats">
      {chats &&
        chats.map((x) => (
          <ChatPreview
            onClick={onHandleSelectedChange}
            isActive={selectedMail == x}
            emailWith={x}
          />
        ))}
    </div>
  );
};

export default ChatPreviewsBlock;
