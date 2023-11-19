
import type {
    Tool,
} from './';


export interface Action {
    id?: string;
    date: string;
    from?: Tool;
    to?: Tool;
    count: number;
    sum: number;
    operation: ActionOperationEnum;
    note?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum ActionOperationEnum {
    Income = 'income',
    Outlay = 'outlay',
    Transfer = 'transfer',
    Buy = 'buy',
    Sell = 'seld'
}

