import { Between, FindOperator, FindOptionsOrderValue, Raw } from "typeorm";
import { AppDataSource } from "../../dataSource/AppDataSource";
import { Action } from "../../entity/action";

interface GetActionListCriteria {
  dateFrom?: Date,
  dateTo?: Date,
  dateOrder?: FindOptionsOrderValue,
  skip?: number,
  take?: number
}

export default function GetActionList(criteria: GetActionListCriteria): Promise<Action[]> {
  
  const whereDate = (criteria: GetActionListCriteria): FindOperator<Date> | undefined =>
  {
    if(criteria.dateFrom && criteria.dateTo) {
      return Raw((alias) => `${alias} >= :from and ${alias} <= :to`, {
        from: criteria.dateFrom,
        to: criteria.dateTo
      });
    }

    if(criteria.dateFrom) {
      return Raw((alias) => `${alias} >= :from`, {
        from: criteria.dateFrom,
      });
    }

    if(criteria.dateTo) {
      return Raw((alias) => `${alias} <= :to`, {
        to: criteria.dateTo
      });
    }

    return undefined;
  }
  
  return AppDataSource.manager.find(Action, {
    where: {
      date: whereDate(criteria),
    },
    relations: {
      tool: true, 
      toolTo: true, 
    },
    order: {
      date: criteria.dateOrder ? criteria.dateOrder : 'desc',
    },
    take: criteria.take,
    skip: criteria.skip
  });
};

