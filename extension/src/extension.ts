// @ts-ignore
import { commands, ExtensionContext, chat, TextEditor, TextEditorEdit, window } from "vscode";
import { KuzcoPanel } from "./panels/KuzcoPanel";
import { KuzcoChat } from "./panels/KuzcoChat";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showChatCommand = commands.registerCommand("kuzco.showChat", () => {
    KuzcoPanel.render(context.extensionUri);
  });

  const kuzcoChatParticipant = chat.createChatParticipant('kuzco.chat', KuzcoChat.initialize);

  // Add command to the extension context
  context.subscriptions.push(kuzcoChatParticipant, showChatCommand);


  // Add code completion command
  const codeCompletionCommand = commands.registerEditorCommand('kuzco.codeCompletion', async (textEditor: TextEditor) => {
    const editor = textEditor;
    if (editor) {
      const document = editor.document;
      const selection = editor.selection;
      const selectedText = document.getText(selection);

      try {
        const completion = await KuzcoChat.codeCompletionCall(selectedText);
       
        editor.edit((editBuilder: TextEditorEdit) => {
          editBuilder.replace(selection, completion);
        });
      } catch (error) {
        window.showErrorMessage('Error fetching code completion');
      }
    }
  });

  context.subscriptions.push(codeCompletionCommand);
}
