import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../service/AppDataSource";

export default function SaveTool (tool: Tool): string
{
  AppDataSource.manager.save(tool);

  return tool.id;
};
