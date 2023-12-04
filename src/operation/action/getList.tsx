import { Between, Raw } from "typeorm";
import { AppDataSource } from "../../dataSource/AppDataSource";
import { Action } from "../../entity/action";

interface GetActionListCriteria {
  dateFrom: Date,
  dateTo: Date,
}

export default function GetActionList(criteria: GetActionListCriteria): Promise<Action[]> {
  return AppDataSource.manager.find(Action, {
    where: {
      date: Raw((alias) => `${alias} >= :from and ${alias} < :to`, {
        from: criteria.dateFrom,
        to: criteria.dateTo
      }),
    },
    relations: {
      tool: true, 
      toolTo: true, 
    },
    order: {
      date: 'DESC'
    },
  });
};

