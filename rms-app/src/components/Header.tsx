import { createBrowserHistory } from 'history';
import React from 'react';
import {Spinner} from 'reactstrap';
import { useAsyncData } from '../hooks/useAsyncData';
import { IHallList, IHall } from '../models';

export const Header : React.FC =()=>{
    const [hallsData, getHalls] = useAsyncData<IHallList<IHall>>("/halls");
    const history = createBrowserHistory();

    const handleViewTables = React.useCallback((id:string)=>{
        history.push(`/halls/${id}`);
    },[history]);
    let content;
    if(hallsData.loading) {
        content = <Spinner/>;
    }
    else if(hallsData.error) {
        content = <h4 className='text-danger'>Error Occured</h4>
    }
    else {
        content = (
            <ul className='navbar-nav d-flex flex-row h-100'>
                {hallsData.data?.halls.map(({id,name})=>(
                    <li className='nav-item ' key={name}><button onClick={()=> handleViewTables(id)} className='btn btn-link p-3 text-white text-decoration-none h-100 d-flex align-items-center spilited rounded-0'>{name}</button></li>
                ))}
            </ul>
        )
    }

    return (
        <nav className="navbar ">
            {content}
            <ul className='navbar-nav d-flex flex-row h-100'>
                <li className='nav-item '><a className='p-3 text-white text-decoration-none h-100 d-flex align-items-center spilited'>Receipts</a></li>
                <li className='nav-item h-100 '><a className='p-3 text-white text-decoration-none h-100 d-flex align-items-center'>Admin</a></li>
            </ul>
        </nav>
    )
}
