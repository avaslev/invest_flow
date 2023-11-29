import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../dataSource/AppDataSource";

export default function SaveTool (tool: Tool): void
{
  AppDataSource.getRepository(Tool).save(tool);
};
