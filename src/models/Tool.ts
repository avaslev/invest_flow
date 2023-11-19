import * as yup from "yup"

export enum ToolTypeEnum {
    Bound = 'bound',
    Cash = 'cash'
}

export const ToolSchema = yup
    .object({
        id: yup.string().nullable(),
        externalId: yup.string().nullable(),
        name: yup.string().required().max(15),
        fullName: yup.string(),
        isUser: yup.boolean().default(true),
        isArhive: yup.boolean().default(false),
        type: yup.string().required().oneOf([
            ToolTypeEnum.Cash,
            ToolTypeEnum.Bound,
        ]),
        currentSum: yup.number().required().min(0).default(0),
        prevSum: yup.number().required().min(0).default(0),
    })

export interface Tool extends yup.InferType<typeof ToolSchema> {}