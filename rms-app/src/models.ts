export interface IAsyncData<T>{
    error?: string;
    data?: T;
    loading?: boolean;
}

export interface IHall{
    id: string;
    name: string;
}

export interface IHallList<T>{
    halls: T[];
    count: number;
    getData: void;
}

export interface ITable{
    id: number;
    number: number;
    status: string;
    hallId:string;
}
export interface ITableList<T>{
    tables: T[];
    count: number;
    getData: void;
}
export interface IFood{
    id:number,
    name:string,
    price:number,
    file:string,
    count:number,
    amount:number
}
export interface ICategory{
    id:number
    name:string
    foods:IFood[]
}
export interface ICategoryList{
    categories: ICategory[];
    count: number;
    getData: void;
}
export interface IFoodList{
    foods: IFood[];
    count: number;
    getData: void;
}
export interface IOrder{
    id:number | undefined,
    foods:IFood[],
    totalPrice:number | undefined,
    staffName:string
}
export interface IReceipt{
    id:number | undefined,
    barcode:number | undefined
    order:IOrder | undefined
}

export interface IStaff{
    id: number | undefined,
    fullName:string,
    staffType:string,
    phoneNumber:string,
    salary:number
}