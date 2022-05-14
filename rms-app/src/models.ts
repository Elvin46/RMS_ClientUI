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
    id: string;
    number: number;
    status: string;
}
export interface ITableList<T>{
    tables: T[];
    count: number;
    getData: void;
}