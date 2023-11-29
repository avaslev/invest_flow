import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../dataSource/AppDataSource";

export default function GetTool (toolId: string): Promise<Tool | null>
{
  return AppDataSource.manager.findOneBy(Tool, {id: toolId});
};

