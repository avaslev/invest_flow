import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../dataSource/AppDataSource";

interface GetToolListCriteria {
  isUser: boolean,
  isArhive: boolean,
}

export default function GetToolList (criteria?: GetToolListCriteria): Promise<Tool[]>
{
  return AppDataSource.manager.findBy(Tool, criteria ?? []);
};
