import { List } from "grommet";
import ChatMessage from "./ChatMessage";

interface IChatMessage {
  user: string;
  text: string;
  isSentByMe: boolean;
}

const ChatConversation: React.FC<{ messages: IChatMessage[] }> = ({ messages }) => {
  return (
    <List data={messages}>{(item) => (
      <ChatMessage {...item}/>
    )}</List>
  );
}

export default ChatConversation;
