import { Avatar, Box, Text } from "grommet";

export interface ChatMessageProps {
  user: string;
  text: string;
  isSentByMe: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ user, text, isSentByMe }) => {
  const alignSelf = isSentByMe ? 'end' : 'start';
  const background = isSentByMe ? 'light-3' : 'light-1';
  return (
    <Box direction="row" alignSelf={alignSelf} gap="small" background={background} pad="small" round="small">
      {!isSentByMe && <Avatar size="small" src="https://placeimg.com/32/32/people" />}
      <Box>
        <Text weight="bold">{user}:</Text>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};

export default ChatMessage;