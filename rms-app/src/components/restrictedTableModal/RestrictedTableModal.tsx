import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface IRestrictedTableModalProps{
    isOpen:boolean,
    toggle:()=>void,
    tableNumber:number,
    tableId:string
}
export const RestrictedTableModal : React.FC<IRestrictedTableModalProps> = ({isOpen,toggle,tableNumber,tableId}) =>{

    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>
                Table-{tableNumber}
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center">
                <Link to={`/tables/${tableId}`} className="mx-2 btn btn-success">Reservation</Link>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}