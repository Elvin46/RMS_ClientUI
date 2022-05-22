import axios from "axios";
import React from "react";
import { INITIAL_ASYNC_DATA, BASE_URL } from "../consts";
import { IAsyncData } from "../models";

export function useAsyncData<T>(path: string, defaultParams?: any): [IAsyncData<T>, (params?: any) => void] {
    const [data, setData] = React.useState<IAsyncData<T>>(INITIAL_ASYNC_DATA);

    const getData = React.useCallback((params?: any) => {
        
        if (!!path) {
            setData(oldData => ({ ...oldData, loading: true }));
            axios.get<T>(`${BASE_URL}${path}`, { params: params ?? defaultParams }).then(({ data }) => {
                setData(oldData => ({ ...oldData, loading: false, data, error: undefined }));
            }).catch((error) => {
                setData({ data: undefined, loading: false, error: error.toString() });
            });
        }
    }, [path]);

    React.useEffect(() => {
        getData();
    }, [getData]);

    return [data, getData];
}
export function usePostData(path: string, object:object){

        axios.post(`${BASE_URL}${path}`, object);
}