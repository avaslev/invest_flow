import { AppDataSource } from "../../dataSource/AppDataSource";
import { Action } from "../../entity/action";

export default function SaveAction (action: Action): void
{
  AppDataSource.getRepository(Action).save(action);
};
