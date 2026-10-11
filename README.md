# LangChain Tools Explained: Build Custom Tools with TypeScript

Source code for the YouTube tutorial on building custom LangChain.js tools with TypeScript.

## What it covers
- Creating a custom calculator tool with `tool()` and a Zod schema
- Invoking a tool directly
- Connecting tools to an LLM with `bindTools()`
- Executing tool calls and returning results via `ToolMessage`

## Setup
```bash
npm install
cp .env.example .env   # add your OPENAI_API_KEY
npx tsx index.ts
```

## Tech
LangChain.js, TypeScript, Node.js, OpenAI API, Zod
