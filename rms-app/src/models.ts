export interface IAsyncData<T>{
    error?: string;
    data?: T;
    loading?: boolean;
}

export interface IHall{
    name: string;
}

export interface DataList<T>{
    halls: T[];
    count: number;
    getData: void;
}