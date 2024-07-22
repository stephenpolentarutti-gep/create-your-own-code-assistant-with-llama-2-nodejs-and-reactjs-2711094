FROM ollama/ollama:latest

EXPOSE 11434

CMD ["ollama", "-m", "cpu"]