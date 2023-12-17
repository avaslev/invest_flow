import { AppDataSource } from "../../dataSource/AppDataSource";
import { Action } from "../../entity/action";

export interface ActionCategory {
  name: string;
  num: number;
}

export default function GetActionCategoryList(): Promise<ActionCategory[]> {
  return AppDataSource.manager.getRepository(Action)
    .createQueryBuilder('action')
    .select('action.category', 'name')
    .addSelect('count(action.category)', 'num')
    .groupBy('action.category')
    .orderBy('num', 'DESC')
    .getRawMany();
};

