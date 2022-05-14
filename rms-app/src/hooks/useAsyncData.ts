import axios from "axios";
import React from "react";
import { INITIAL_ASYNC_DATA } from "../consts";
import { IAsyncData } from "../models";

export function useAsyncData<T>(url: string, defaulParams?:any): [IAsyncData<T>, (params?:any)=> void]{
    const [data, setData] = React.useState<IAsyncData<T>>(INITIAL_ASYNC_DATA);

    const getData = React.useCallback((params?:any)=>{
        if (!!url) {
            setData(oldData => ({...oldData, loading: true}));
            axios.get<T>(url, {params}).then(({data}) => {
                setData(oldData => ({...oldData,loading: false,data,error: undefined}));
            }).catch((error)=>{
                setData({data: undefined,loading: false,error: error.toString()});
            });
        }
    },[url])

    React.useEffect(()=>{
        getData();
    },[getData]);

    return[data, getData];
}