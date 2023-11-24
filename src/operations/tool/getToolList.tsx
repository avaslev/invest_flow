import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../service/AppDataSource";

interface GetToolListCriteria {
  isUser: boolean,
  isActive: boolean,
}

export default function GetToolList (criteria?: GetToolListCriteria): Promise<Tool[]>
{
  console.log('GetToolList', criteria);
  // AppDataSource.manager.find(Tool).then((results: Tool[])=> {
  //   return results;
  // });
  return AppDataSource.manager.find(Tool);
};

