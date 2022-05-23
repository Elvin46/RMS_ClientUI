import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
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
    table:ITable
}
export const ReservationModal : React.FC<IReservationModalProps> = ({isOpen,toggle,table}) =>{
    const [value, setValue] = React.useState<Date | null>(new Date());
    const ChangeTableStatusToReserved = React.useCallback((tableId:number)=>{
        axios.put(`https://localhost:44355/api/tables/${tableId}`,{tableStatus:TABLE_STATUSES.RESERVED})
        console.log("salam");
        
    },[])
    const createReservation=React.useCallback((time:Date | null, tableId:number)=>{
        axios.post(`https://localhost:44355/api/reservations`,{tableId:tableId,time:time})
        .then(({data})=>{
            setTimeout(()=>ChangeTableStatusToReserved(tableId),data)
        })
    },[])
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
            </ModalBody>
            <ModalFooter>
                <Button onClick={()=>createReservation(value,table.id)}  className="mx-2 btn btn-success">Reserve</Button>
                <Button onClick={toggle}  className="mx-2 btn btn-danger">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}