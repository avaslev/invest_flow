// import { EntitySchema } from "typeorm"
// import * as yup from "yup"

export {}

// export enum ToolTypeEnum {
//     Bound = 'bound',
//     Cash = 'cash'
// }

// export const ToolSchema = yup
//     .object({
//         id: yup.string().nullable(),
//         externalId: yup.string().nullable(),
//         name: yup.string().required().max(15),
//         fullName: yup.string(),
//         isUser: yup.boolean().default(true),
//         isArhive: yup.boolean().default(false),
//         type: yup.string().required().oneOf([
//             ToolTypeEnum.Cash,
//             ToolTypeEnum.Bound,
//         ]),
//         currentSum: yup.number().required().min(0).default(0),
//         prevSum: yup.number().required().min(0).default(0),
//     })

// export interface Tool extends yup.InferType<typeof ToolSchema> { }

// export const ToolEntitySchema = new EntitySchema<Tool>({
//     name: 'tool',
//     columns: {
//         id: { type: 'varchar', primary: true, generated: 'uuid', },
//         externalId: { type: 'varchar', nullable: true, },
//         name: { type: 'varchar', length: 15, },
//         fullName: { type: 'varchar', nullable: true, },
//         isUser: { type: 'boolean', default: true, },
//         isArhive: { type: 'boolean', default: false, },
//         type: { type: 'varchar', },
//         currentSum: { type: 'decimal', default: 0 },
//         prevSum: { type: 'decimal', default: 0 }
//     },
// })