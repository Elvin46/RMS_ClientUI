import { IAsyncData } from "./models"

export const APP_ROUTES = {
    HOME: {
        PATH: "/"
    },
    HALLS: {
        PATH: "/halls",
        DETAILS: {
            PATH: '/halls/:id'
        }
    }
}

export const INITIAL_ASYNC_DATA: IAsyncData<any> = {
    data: null,
    error: undefined,
    loading: undefined
}

export const BASE_URL = 'https://localhost:44355/api';

export const TABLE_STATUSES = {
    RESERVED: "reserved",
    EMPTY: "empty",
    FULL: "full"
}