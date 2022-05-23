import React from "react";
import axios from "axios";
import { useSearchParams , Link, useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Header } from "../../components/header/Header";
import { Menu } from "../../components/menu/Menu";
import { useAsyncData } from "../../hooks/useAsyncData";
import { ITable,IOrder, IReceipt } from "../../models";
import { ReceiptModal} from "../../components/receiptModal/ReceiptModal";


import './Orders.scss';
import { TABLE_STATUSES } from "../../consts";


export const Order : React.FC = () =>{
    const [searchParams,setSearchParams] = useSearchParams();
    const tableId = searchParams.get("tableId");
    console.log(tableId);

    const [tableData,getTableData] = useAsyncData<ITable>(`/tables/${tableId}`);
    const [orderData,getOrderData] = useAsyncData<IOrder>(`/orders/${tableId}`);
    const [receiptData,getReceiptData] = useAsyncData<IReceipt>(`/receipts/${orderData.data?.id}`);
    const [active,setActive] = React.useState(true);
    const [serviceFee,setServiceFee] = React.useState(1.05);
    const [isReceiptModalOpen,setReceiptModalOpen] = React.useState(false);
    const [receipt,setReceipt] = React.useState<IReceipt>({id:0,
        barcode:0,
        order:orderData.data});
    let menuContent;
    React.useEffect(()=>{
        getTableData();
        getReceiptData()
        getOrderData();
    },[tableId]);
    if(!!orderData.data) {
        menuContent = <Menu orderId={orderData.data?.id} getOrderData={getOrderData}/>
    }
    
    const handleServiceFee = React.useCallback(()=>{
        setActive(!active);
        if (!active) {
            setServiceFee(1.05);
        }
        else{
            setServiceFee(1);
        }
    },[active])

    const handleCreateReceipt = React.useCallback(async()=>{
        
        if (!!receiptData.error) {
            if (!!orderData.data?.totalPrice) {
                await axios.post(`https://localhost:44355/api/receipts`, {orderId:orderData.data?.id, totalPrice: orderData.data?.totalPrice * serviceFee})
                .then(({data})=>{
                    setReceipt(data);
                    setReceiptModalOpen(true);
                })
            }
        }
        else if(!!receiptData.data){
            await setReceipt(receiptData.data);
            setReceiptModalOpen(true);
        }
    },[orderData,serviceFee,receiptData])

    const toggleModal=React.useCallback(()=>{
        setReceiptModalOpen((isModalOpen)=>!isModalOpen)
    },[])
    
    return (
        <>
            <Header/>
            <div className="order-page">
                <Row className="m-0 h-100">
                    <Col xs={5} className="p-0">
                        <div className="left-menu">
                            <div className="order-header">
                                <div className="back-to-tables">
                                    <Link to={`/halls/${tableData.data?.hallId}`}>
                                        <svg viewBox="0 0 24 24" role="presentation" style={{width: "24px", height: "24px"}}><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" style={{fill: "white"}}></path></svg>
                                    </Link>
                                </div>
                                <div className="table-number">
                                    <h5>Table-{tableData.data?.number}</h5>
                                </div>
                            </div>
                            <div className="order">
                                <div className="order-sidebar">
                                    <button className={`item ${active ? "active-item" : ""}`} onClick={()=>handleServiceFee()}>
                                        <span className="icon-box-wrapper">
                                            <svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem', height: '1.5rem'}}><path d="M12,5A2,2 0 0,1 14,7C14,7.24 13.96,7.47 13.88,7.69C17.95,8.5 21,11.91 21,16H3C3,11.91 6.05,8.5 10.12,7.69C10.04,7.47 10,7.24 10,7A2,2 0 0,1 12,5M22,19H2V17H22V19Z" style={{fill: 'currentcolor'}}></path></svg>
                                        </span>
                                    </button>
                                </div>
                                <div style={{width: 'calc(100% - 50px)'}}>
                                    <div className="order-body">
                                        <div className="order-foods-list">
                                        {orderData.data?.foods.map(({id,name,price,count})=>(
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
                                    </div>
                                    <div className="order-footer">
                                        <div className="d-flex justify-content-around align-items-center pb-3 pt-3">
                                            <div>
                                                <p className="mb-1 fs-13 fw-light">Discount</p>
                                                <h5 className="fs-17">0.00 ₼ (0 %)</h5>
                                            </div>
                                            {active && <div>
                                                <p className="mb-1 fs-13">Service Fee</p>
                                                {!!orderData.data?.totalPrice ? <h5 className="fs-17">{orderData.data?.totalPrice * 0.05} ₼ (5 %)</h5>: <h5 className="fs-17">0 ₼ (5 %)</h5>}
                                            </div>}
                                            
                                            <div>
                                                <p className="mb-1 fs-13">Total Price</p>
                                                <h5 className="fs-17">{orderData.data?.totalPrice} ₼</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center px-3 flex-row-reverse">
                                            <button className="create-receipt-btn w-50" onClick={()=>handleCreateReceipt()}>
                                            <span className="icon-check-box"><svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem' ,height: '1.5rem'}}><path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" style={{fill: 'currentcolor'}}></path></svg></span>
                                            {!!orderData.data?.totalPrice ? <span className="label">{orderData.data?.totalPrice * serviceFee} ₼</span>: <span className="label">0 ₼</span>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {menuContent}
                </Row>
                {isReceiptModalOpen && <ReceiptModal
                isOpen={isReceiptModalOpen}
                toggle={toggleModal}
                receipt={receipt}
                active={active}
                serviceFee={serviceFee}
                />}
                
            </div>
            
        </>
    )
}