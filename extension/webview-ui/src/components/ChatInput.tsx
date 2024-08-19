import React from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, value, onChange }) => {

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const message = form.elements[0] as HTMLInputElement;
        onSubmit(message.value);
      }}
    >
      <Box direction="row" gap="small">
        <FormField>
          <TextInput
            placeholder="Enter your message..."
            value={value}
            onChange={onChange}
            size="medium"
          />
        </FormField>
        <Button
          primary
          type="submit"
          label="Send"
          disabled={!value}
        />
      </Box>
    </Form>
  );
};

export default ChatInput;