import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../service/AppDataSource";

export default function SaveTool (tool: Tool): void
{
  AppDataSource.getRepository(Tool).save(tool);
};
