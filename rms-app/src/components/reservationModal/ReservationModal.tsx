import React, { ChangeEvent } from "react";
import { Button, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ITable } from "../../models";
import axios from "axios";
import { TABLE_STATUSES } from "../../consts";

interface IReservationModalProps{
    isOpen:boolean,
    toggle:()=>void,
    table:ITable,
    ChangeTableStatusToReserved:(tableId:number,data:number)=>void
}
export const ReservationModal : React.FC<IReservationModalProps> = ({isOpen,toggle,table,ChangeTableStatusToReserved}) =>{
    const [clientName,setClientName]=React.useState("");
    const [value, setValue] = React.useState<Date | null>(new Date());
    
    const createReservation=React.useCallback((time:Date | null, tableId:number,client:string)=>{
        axios.post(`https://localhost:44355/api/reservations`,{tableId:tableId,time:time,clientName:client})
        .then(({data})=>{
            ChangeTableStatusToReserved(tableId,data)
            toggle();
        })
        
        console.log(client);
    },[clientName])
   
    return (
        <Modal isOpen={isOpen}  centered>
            <ModalHeader>
                Table-{table.number}
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={value}
                        onChange={(newValue) => {setValue(newValue);
                        }}
                    />
                </LocalizationProvider>
                <InputGroup>
                     <Input onChange={(newName) => {setClientName(newName.target.value);
                        }} placeholder="Client Name"/>
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={()=>createReservation(value,table.id,clientName)}  className="mx-2 btn btn-success">Reserve</Button>
                <Button onClick={toggle}  className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}