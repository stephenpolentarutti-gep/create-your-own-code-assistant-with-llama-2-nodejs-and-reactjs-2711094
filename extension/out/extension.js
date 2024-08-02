"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// @ts-ignore
const vscode_1 = require("vscode");
const KuzcoPanel_1 = require("./panels/KuzcoPanel");
const KuzcoChat_1 = require("./panels/KuzcoChat");
function activate(context) {
    // Create the show hello world command
    const showChatCommand = vscode_1.commands.registerCommand("kuzco.showChat", () => {
        KuzcoPanel_1.KuzcoPanel.render(context.extensionUri);
    });
    const kuzcoChatParticipant = vscode_1.chat.createChatParticipant('kuzco.chat', KuzcoChat_1.KuzcoChat.initialize);
    // Add command to the extension context
    context.subscriptions.push(kuzcoChatParticipant, showChatCommand);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map