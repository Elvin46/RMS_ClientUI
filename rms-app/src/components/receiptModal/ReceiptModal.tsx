import axios from "axios";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IReceipt } from "../../models";
import './ReceiptModal.scss';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../consts";



interface IOpenTableModalProps{
    isOpen:boolean,
    toggle:()=>void,
    receipt:IReceipt,
    active:boolean,
    serviceFee:number
}
interface IPostOrderData{
    tableId:number,
    staffId:number
}
export const INITIAL_FORM_DATA:IPostOrderData = {
    tableId:0,
    staffId:0
}
export const ReceiptModal : React.FC<IOpenTableModalProps> = ({isOpen,toggle,receipt,active,serviceFee}) =>{    
    let navigate = useNavigate(); 
    const handleDeleteClick=React.useCallback(()=>{

        axios.delete(`https://localhost:44355/api/orders/${receipt.order?.id}`).then(()=>{
                let path = APP_ROUTES.HALLS.PATH; 
                navigate(path);
            })
            
    },[])
    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>
                #{receipt.barcode}
            </ModalHeader>
            <ModalBody className="receipt-body">
                <div className="order-foods-list">
                {receipt.order?.foods.map(({id,name,count,price})=>(
                    <div className="order-food-item" key={id}>
                        <span className="food-name">{name}</span>
                        <div>
                            <span className="food-amount text-left">{count}<span style={{color: "rgb(120, 137, 148)", padding: "3px"}}>×</span></span>
                            <span className="food-price text-right">{price}</span>
                            <span className="food-total-price">{count*price}</span>
                        </div>
                    </div>
                ))}
                </div>
            </ModalBody>
            <ModalFooter className="flex-column align-items-end">
                <div className="d-flex justify-content-between w-100">
                    <p>Staff: {receipt.order?.staffName}</p>
                    <div className="d-flex flex-column">
                        {active && <div className="d-flex justify-content-center">
                            <p className="mb-1 fs-13">Service Fee:</p>
                            {!!receipt.order?.totalPrice ? <p className="fs-17">{receipt.order?.totalPrice * 0.05} ₼ (5 %)</p>: <p className="fs-17">0 ₼ (5 %)</p>}
                        </div>}
                        
                        <div className="d-flex justify-content-center">
                            <p className="mb-1 fs-13">Total Price:</p>
                            {!!receipt.order?.totalPrice ? <p className="fs-17">{receipt.order?.totalPrice * serviceFee} ₼</p>: <p className="fs-17">0 ₼</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <Button onClick={()=>handleDeleteClick()} className="mx-2 btn btn-success">Close Table</Button>
                    <Button onClick={toggle} className="mx-2 btn btn-danger">Cancel</Button>
                </div>
                
            </ModalFooter>
        </Modal>
    )
}