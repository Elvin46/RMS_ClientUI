import React from 'react';
import { Link } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Navbar,Container,NavbarBrand,ListGroup,ListGroupItem, Spinner} from 'reactstrap';
import { useAsyncData } from '../hooks/useAsyncData';
import { DataList, IHall } from '../models';

export const Header : React.FC =()=>{
    const [hallsData, getHalls] = useAsyncData<DataList<IHall>>("https://localhost:44355/api/halls");
    console.log(hallsData.data?.halls);
    React.useEffect(()=>{
        getHalls();
    },[getHalls]);
    return (
        <nav className="navbar ">
                {hallsData.loading && (
                    <Spinner/>
                )}
                {hallsData.error && !hallsData.loading && (
                    <h4 className='text-danger'>Error Occured</h4>
                )}
                {!!hallsData.data && !hallsData.loading && (
                        <ul className='navbar-nav d-flex flex-row h-100'>
                            {hallsData.data.halls.map(({name})=>(
                                <li className='nav-item ' key={name}><Link to={name} className='p-3 text-white text-decoration-none h-100 d-flex align-items-center spilited'>{name}</Link></li>
                            ))}
                        </ul>
                )}
            <ul className='navbar-nav d-flex flex-row h-100'>
                <li className='nav-item '><a className='p-3 text-white text-decoration-none h-100 d-flex align-items-center spilited'>Receipts</a></li>
                <li className='nav-item h-100 '><a className='p-3 text-white text-decoration-none h-100 d-flex align-items-center'>Admin</a></li>
            </ul>
        </nav>
    )
}
