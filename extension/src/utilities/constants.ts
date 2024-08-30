// constants.ts

// API URLs
export const API_URLS = {
  CHAT: "http://localhost:3000/chat",
  INGEST: "http://localhost:3000/ingest",
  RENAME: "http://localhost:3000/rename",
  COMPLETION: "http://localhost:3000/completion",
};

// Headers
export const HEADERS = {
  JSON_CONTENT_TYPE: {
    "Content-Type": "application/json",
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  LLM_CALL_FAILED: "Error calling LLM:",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LLM_RESPONSE_RECEIVED: "LLM Response:",
};
