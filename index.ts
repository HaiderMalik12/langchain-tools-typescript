import { tool } from "@langchain/core/tools";
import { z } from "zod";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ToolMessage } from "@langchain/core/messages";

async function main() {
  const calculatorTool = tool(
    async ({ a, b }: { a: number; b: number }) => {
      return a + b;
    },
    {
      name: "calculator",
      description: "Add two numbers together",
      schema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
  );

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temprature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const modelWithTools = model.bindTools([calculatorTool]);
  const userMessage = "What is 10 + 10";

  const response = await modelWithTools.invoke(userMessage);
  console.log("Tool calls");
  if (response.tool_calls) {
    const toolCall = response.tool_calls[0];
    const result = await calculatorTool.invoke({
      a: toolCall.args.a,
      b: toolCall.args.b,
    });
    console.log(result);

    if (toolCall.id) {
      const toolMessage = new ToolMessage({
        content: result.toString(),
        tool_call_id: toolCall.id,
      });
      const finalResponse = await modelWithTools.invoke([
        {
          role: "human",
          content: userMessage,
        },
        response,
        toolMessage,
      ]);
      console.log('Final Asnwer');
      console.log(finalResponse.content)
    }
  }
}

main();
