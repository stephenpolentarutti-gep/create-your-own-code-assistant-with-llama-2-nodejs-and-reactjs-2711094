// @ts-nocheck
import {
  Disposable,
  ChatRequest,
  ChatContext,
  ChatResponseStream,
  ChatResult,
  CancellationToken,
} from "vscode";
import { API_URLS, ERROR_MESSAGES, HEADERS, SUCCESS_MESSAGES } from "../utilities/constants";

export const KuzcoChat = {
  _disposables: [] as Disposable[],
  async initialize(
    request: ChatRequest,
    context: ChatContext,
    stream: ChatResponseStream,
    token: CancellationToken
  ): Promise<ChatResult> {
    if (request.command === "ingest") {
      stream.progress("Ingesting your repo");
      const result = this.ingestCall(request.prompt);
      stream.progress(result);
      return { metadata: { command: "ingest" } };
    }
    else if( request.command === "chat") {
        stream.progress('Sending Message');
        const result = await this.chatCall(request.prompt)
        stream.progress(result);
      return { metadata: { command: "chat" } };
       
    }
    else if( request.command === "rename") {
        stream.progress('Renaming');
        const result = await this.renameCall(request.prompt)
        stream.markdown(result);
      return { metadata: { command: "rename" } };
       
    }
      return { metadata: { command: "" } };
    
  },
  async ingestCall(prompt: string) {
    try {
      const response = await fetch(API_URLS.INGEST);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(SUCCESS_MESSAGES.LLM_RESPONSE_RECEIVED, data);
      // Handle the response data as needed
    } catch (error) {
      console.error(ERROR_MESSAGES.LLM_CALL_FAILED, error);
      // Handle error
    }
  },
  async chatCall(prompt: string) {
    try {
      const response = await fetch(API_URLS.CHAT,
        {
           method: "Post",
           body: prompt 
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(SUCCESS_MESSAGES.LLM_RESPONSE_RECEIVED, data);
      return data;
      // Handle the response data as needed
    } catch (error) {
      console.error(ERROR_MESSAGES.LLM_CALL_FAILED, error);
      // Handle error
    }
  },
  async renameCall(oldName: string, newName: string) {
    try {
      const response = await fetch(API_URLS.RENAME,
        {
           method: "Post",
           body: { oldName, newName }
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(SUCCESS_MESSAGES.LLM_RESPONSE_RECEIVED, data);
      return data;
      // Handle the response data as needed
    } catch (error) {
      console.error(ERROR_MESSAGES.LLM_CALL_FAILED, error);
      // Handle error
    }
  },
  async codeCompletionCall(prompt: string) {
    try {
      const response = await fetch(API_URLS.CODE_COMPLETION,
        {
           method: "Post",
           body: prompt 
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(SUCCESS_MESSAGES.LLM_RESPONSE_RECEIVED, data);
      return data;
      // Handle the response data as needed
    } catch (error) {
      console.error(ERROR_MESSAGES.LLM_CALL_FAILED, error);
      // Handle error
    }
  }

};
