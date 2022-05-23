import React, { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITable,IOrder } from "../../models";
import { APP_ROUTES, TABLE_STATUSES } from "../../consts";
import { createBrowserHistory } from "history";

interface IOpenTableModalProps{
    isOpen:boolean,
    toggle:()=>void,
    table:ITable,
    setReservationModalOpen:Dispatch<SetStateAction<boolean>>
    setClientNameModalOpen:Dispatch<SetStateAction<boolean>>
}
interface IPostOrderData{
    tableId:number,
    staffId:number
}
export const INITIAL_FORM_DATA:IPostOrderData = {
    tableId:0,
    staffId:0
}
export const OpenTableModal : React.FC<IOpenTableModalProps> = ({isOpen,toggle,table,setReservationModalOpen,setClientNameModalOpen}) =>{
    let navigate = useNavigate();
    const history = createBrowserHistory();
    const handleCreateOrder=React.useCallback(()=>{
        console.log(table);
        
        if (table.status !== TABLE_STATUSES.FULL) {
            if (table.status === TABLE_STATUSES.RESERVED) {
                toggle();
                setClientNameModalOpen(true);
            }
            else{
                axios.post("https://localhost:44355/api/orders", {tableId:table.id,staffId:2})
                .then(() => {
                    let path = APP_ROUTES.ORDER.PATH; 
                    navigate(`${path}?tableId=${table.id}`);
                })
            }
        }
        else{
            let path = APP_ROUTES.ORDER.PATH; 
            navigate(`${path}?tableId=${table.id}`);
        }
        
    },[table])
    const handleCreateReservation=React.useCallback(()=>{
        toggle();
        setReservationModalOpen(true);
    },[])
    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>
                Table-{table.number}
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center">
                <button  onClick={()=>handleCreateOrder()} className="mx-2 btn btn-success">Order</button>
                <button onClick={()=>handleCreateReservation()} className="mx-2 btn btn-success">Reservation</button>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}