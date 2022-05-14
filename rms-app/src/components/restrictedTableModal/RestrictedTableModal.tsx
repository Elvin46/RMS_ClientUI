import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface IRestrictedTableModalProps{
    isOpen:boolean,
    toggle:()=>void,
    tableNumber:number
}
export const RestrictedTableModal : React.FC<IRestrictedTableModalProps> = ({isOpen,toggle,tableNumber}) =>{

    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>
                Table-{tableNumber}
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center">
                <h4 className="text-danger">Table is busy.Please Choose Another Table!</h4>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}