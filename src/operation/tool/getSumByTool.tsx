import { Tool } from "../../entity/tool";
import { AppDataSource } from "../../dataSource/AppDataSource";
import { Action, ActionOperationEnum } from "../../entity/action";

interface GetSumByToolCriteria {
  tool: Tool,
  from?: Date
}

export interface SumTool {
  toolId: string,
  in: number,
  out: number,
  transmitIn: number,
  transmitOut: number,
}

export default function GetSumByTool (criteria: GetSumByToolCriteria): Promise<SumTool | undefined>
{
  criteria.from = criteria.from ?? new Date(0);

  return AppDataSource.manager
    .createQueryBuilder(Tool, 'tool')
    .select('tool.id', 'toolId')
    .addSelect((subQuery) => {
      return subQuery.select("SUM(a1.sum)", "in").from(Action, "a1")
        .where(
          'a1.tool = :toolId and a1.date > :from and a1.operation = :in', 
          {toolId: criteria.tool.id, from: criteria.from, in: ActionOperationEnum.Income},
        )
        .andWhere('a1.date <= :to', {to: new Date()})
        .groupBy('a1.tool')
    }, "in")
    .addSelect((subQuery) => {
      return subQuery.select("SUM(a2.sum)", "out").from(Action, "a2")
        .where(
          'a2.tool = :toolId and a2.date > :from and a2.operation = :out', 
          {toolId: criteria.tool.id, from: criteria.from, out: ActionOperationEnum.Outlay},
        )
        .andWhere('a2.date <= :to', {to: new Date()})
        .groupBy('a2.tool')
    }, "out")
    .addSelect((subQuery) => {
      return subQuery.select("SUM(a3.sum)", "transmitIn").from(Action, "a3")
        .where(
          'a3.toolTo = :toolId and a3.date > :from and a3.operation = :transmitIn', 
          {toolId: criteria.tool.id, from: criteria.from, transmitIn: ActionOperationEnum.Transmit},
        )
        .andWhere('a3.date <= :to', {to: new Date()})
        .groupBy('a3.tool')
    }, "transmitIn")
    .addSelect((subQuery) => {
      return subQuery.select("SUM(a4.sum)", "transmitOut").from(Action, "a4")
        .where(
          'a4.tool = :toolId and a4.date > :from and a4.operation = :transmitOut', 
          {toolId: criteria.tool.id, from: criteria.from, transmitOut: ActionOperationEnum.Transmit},
        )
        .andWhere('a4.date <= :to', {to: new Date()})
        .groupBy('a4.toolTo')
    }, "transmitOut")
    .where('tool.id = :toolId', {toolId: criteria.tool.id,})
    .getRawOne();
};
