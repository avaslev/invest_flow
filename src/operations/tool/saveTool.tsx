import { Tool } from "../../models";

export default function SaveTool (tool: Tool): string
{
  tool.id = tool.id ?? '1234';
  console.log('saveTool', tool);

  return tool.id;
};
