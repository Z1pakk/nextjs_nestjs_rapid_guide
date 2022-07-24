import { IOrder } from "./Order";

export interface ILink {
    id: number;
    code: string;
    orders: IOrder[];
}
