import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface IOpenTableModalProps{
    isOpen:boolean,
    toggle:()=>void,
    tableNumber:number,
    tableId:string
}
export const OpenTableModal : React.FC<IOpenTableModalProps> = ({isOpen,toggle,tableNumber,tableId}) =>{

    const handleClickOrder = React.useCallback(()=>{
        
    },[])

    const handleClickReservation = React.useCallback(()=>{

     },[])
     
    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>
                Table-{tableNumber}
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center">
                <Link to={`/orders?tableId=${tableId}`}  className="mx-2 btn btn-success">Order</Link>
                <Link to={`/tables/${tableId}`} className="mx-2 btn btn-success">Reservation</Link>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}