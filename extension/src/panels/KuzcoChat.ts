// @ts-ignore
import { Disposable, ChatRequest, ChatContext, ChatResponseStream, ChatResult, CancellationToken } from "vscode";

export const KuzcoChat = {
    _disposables: [] as Disposable[],
    async initialize (
        request: ChatRequest,
        context: ChatContext,
        stream: ChatResponseStream,
        token: CancellationToken
    ): Promise<ChatResult> {
        if(request.command === 'ingest') {
            stream.progress('Ingesting your repo')
            this.ingestCall(request.prompt);
        }
        return { metadata: { command: 'ingest'}};
    },
    async ingestCall(prompt: string) {
        return prompt;
    }
}