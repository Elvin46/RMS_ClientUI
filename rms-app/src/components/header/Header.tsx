import { createBrowserHistory } from 'history';
import {Link} from 'react-router-dom'
import React from 'react';
import {Spinner} from 'reactstrap';
import { useAsyncData } from '../../hooks/useAsyncData';
import { IHallList, IHall, IStaff, IAsyncData } from '../../models';
import "./Header.scss";
import { INITIAL_STAFF } from '../../pages/tables/Tables';

export const Header : React.FC =()=>{
    const [hallsData, getHalls] = useAsyncData<IHallList<IHall>>("/halls");
    const history = createBrowserHistory();
    const staffJsonStr = localStorage.getItem("staff");
    let staff:IStaff = INITIAL_STAFF;
    if (!!staffJsonStr) {
        staff = JSON.parse(staffJsonStr);
    }
    React.useEffect(()=>{
        console.log(staff);
        getHalls();
    },[getHalls]);

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
                    <li className='nav-item ' key={name}><Link to={`/halls/${id}`}  className='btn btn-link p-3 text-white text-decoration-none h-100 d-flex align-items-center spilited rounded-0'>{name}</Link></li>
                ))}
            </ul>
        )
    }

    return (
        <nav className="navbar ">
            {content}
            <ul className='navbar-nav d-flex flex-row h-100'>
                <li className='nav-item '><a className='p-3 text-white text-decoration-none h-100 d-flex align-items-center spilited'>Receipts</a></li>
                <li className='nav-item h-100 '><Link to="/a" className='p-3 text-white text-decoration-none h-100 d-flex align-items-center'>{staff.fullName}-{staff.staffType}</Link></li>
            </ul>
        </nav>
    )
}
