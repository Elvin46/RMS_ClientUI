import { createBrowserHistory } from "history";
import React, { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Col, Row, Spinner } from "reactstrap";
import { CommonPageContainer } from "../../components/CommonPageContainer";
import { OpenTableModal } from "../../components/openTableModal/OpenTableModal";
import { useAsyncData } from "../../hooks/useAsyncData";
import { IAsyncData, IStaff, ITable, ITableList } from "../../models";
import {TABLE_STATUSES} from "../../consts"
import './Tables.scss';
import 'react-toastify/dist/ReactToastify.css'
import {ReservationModal} from "../../components/reservationModal/ReservationModal"
import { ClientNameModalOpen } from "../../components/clientNameModal/ClientNameModal";

export const INITIAL_STAFF= {
    id:0,
    fullName:"",
    staffType:"",
    phoneNumber:"",
    salary:0
}
export const Tables : React.FC = ()=>{
    const {id} = useParams<{id:string}>();
    let [searchParams, setSearchParams] = useSearchParams();
    let pin = searchParams.get("pin");
    const [tablesData,getTables] = useAsyncData<ITableList<ITable>>('/tables', {hallId : id});
    const [staffData,getStaffData] = useAsyncData<IStaff>(`/staffs/${pin}`);
    const [isModalOpen,setModalOpen]=React.useState(false);
    const [table,setTable]=React.useState<ITable>({id:0,number:0,status:TABLE_STATUSES.EMPTY,hallId:"0"});
    const [isReservationModalOpen,setReservationModalOpen]=React.useState(false);
    const [isClientNameModalOpen,setClientNameModalOpen] = React.useState(false);
    React.useEffect(()=>{
        getTables({hallId : id});
        getStaffData();
    },[id,getTables,table.status]);

    const handleClickModal=React.useCallback((table:ITable)=>{
            setTable(table);
            setModalOpen(true);
    },[])
    const toogleModal=React.useCallback(()=>{
        setModalOpen((isModalOpen)=>!isModalOpen)
    },[])
    const toogleReservationModal=React.useCallback(()=>{
        setReservationModalOpen((isReservationModalOpen)=>!isReservationModalOpen)
    },[])
    const toogleClientNameModal=React.useCallback(()=>{
        setClientNameModalOpen((isClientNameModalOpen)=>!isClientNameModalOpen)
    },[])
    const ChangeTableStatusToReserved = React.useCallback((tableId:number,data:number)=>{
        setTimeout(()=>{
            axios.put(`https://localhost:44355/api/tables/${tableId}`,{tableStatus:TABLE_STATUSES.RESERVED})
            .then(()=>{
                getTables({hallId : id})
            })
        },data);
        console.log("salam");
    },[])
     
    let content;

    if(tablesData.loading) {
        content = <Spinner/>;
    }
    else if(tablesData.error) {
        content = <h4 className='text-danger'>Error Occured</h4>
    }
    else {
        content = (
            <Row className="tables">
                {tablesData.data?.tables.map((table)=>(
                    <Col xs={3} key={id}>
                        <button onClick={()=>handleClickModal(table)} className={`table-item ${table.status}`}>
                            <h5>{table.number}</h5>
                            <h5>{table.status}</h5>
                        </button>
                    </Col>
                ))}   
                <OpenTableModal 
                isOpen={isModalOpen}
                toggle={toogleModal}
                table={table}
                setReservationModalOpen={setReservationModalOpen}
                setClientNameModalOpen={setClientNameModalOpen}
                />
                <ReservationModal
                isOpen={isReservationModalOpen}
                toggle={toogleReservationModal}
                table={table}
                ChangeTableStatusToReserved={ChangeTableStatusToReserved}
                />
                <ClientNameModalOpen
                isOpen={isClientNameModalOpen}
                toggle={toogleClientNameModal}
                table={table}
                />
            </Row>
        )
    }

    return (
        <CommonPageContainer>
            {content}
        </CommonPageContainer>
    )
}