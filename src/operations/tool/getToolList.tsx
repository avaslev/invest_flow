import { Tool, ToolTypeEnum } from "../../models";

interface GetToolListCriteria {
  isUser: boolean,
  isActive: boolean,
}

export default function GetToolList (criteria?: GetToolListCriteria): Tool[]
{
  console.log('GetToolList', criteria);
  return []
};

