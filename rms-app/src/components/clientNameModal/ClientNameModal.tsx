import React from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,Input, InputGroup } from "reactstrap";
import { ITable } from "../../models";
import { APP_ROUTES } from "../../consts";
import { useNavigate } from "react-router-dom";

interface IClientNameModalOpenProps{
    isOpen:boolean,
    toggle:()=>void,
    table:ITable
}
export const ClientNameModalOpen : React.FC<IClientNameModalOpenProps>=({isOpen,toggle,table})=>{
    let navigate = useNavigate();
    const [clientName,setClientName]=React.useState("");
    const handleCreateOrder = React.useCallback((client:string)=>{
            axios.post("https://localhost:44355/api/orders", {tableId:table.id,staffId:2,clientName:client})
            .then(() => {
                let path = APP_ROUTES.ORDER.PATH; 
                navigate(`${path}?tableId=${table.id}`);
            })
    },[table])
    return(
        <Modal isOpen={isOpen} centered>
            <ModalHeader>
                Table-{table.number}
            </ModalHeader>
            <ModalBody>
                <InputGroup>
                    <Input onChange={(newName) => {setClientName(newName.target.value);
                        }} placeholder="Client Name"/>
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={()=>handleCreateOrder(clientName)} className="mx-2 btn btn-success">Open</Button>
                <Button onClick={toggle} className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}