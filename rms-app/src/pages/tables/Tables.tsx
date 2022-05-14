import { createBrowserHistory } from "history";
import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Spinner } from "reactstrap";
import { CommonPageContainer } from "../../components/CommonPageContainer";
import { OpenTableModal } from "../../components/openTableModal/OpenTableModal";
import { useAsyncData } from "../../hooks/useAsyncData";
import { ITable, ITableList } from "../../models";
import {TABLE_STATUSES} from "../../consts"
import './Tables.scss';
import { RestrictedTableModal } from "../../components/restrictedTableModal/RestrictedTableModal";


export const Tables : React.FC = ()=>{
    const {id} = useParams<{id:string}>();
    const [dataId,setDataId] = React.useState('');
    
    const [tablesData,getTables] = useAsyncData<ITableList<ITable>>('/tables', {hallId : id});
    const [isModalOpen,setModalOpen]=React.useState(false);
    const [isRestrictedModalOpen,setRestrictedModelOpen] = React.useState(false);
    const [tableNumber,setTableNumber]=React.useState(1);
    const [tableId,setTableId]=React.useState("");
    
    React.useEffect(()=>{
        getTables({hallId : id});
    },[id,getTables]);

    const history = createBrowserHistory();

    const handleClickModal=React.useCallback((number:number,status:string,id:string)=>{
        if (status===TABLE_STATUSES.FULL) {
            setModalOpen(false);
            setTableNumber(number);
            setRestrictedModelOpen(true);
        }
        else{
            setModalOpen(true);
            setTableNumber(number);
            setTableId(id);
        }
    },[])
    const toogleModal=React.useCallback(()=>{
        setModalOpen((isModalOpen)=>!isModalOpen)
    },[])
    const toogleRestrictedModal=React.useCallback(()=>{
        setRestrictedModelOpen((isRestrictedOpen)=>!isRestrictedOpen)
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
                {tablesData.data?.tables.map(({id,number,status})=>(
                    <Col xs={3} key={id}>
                        <button onClick={()=>handleClickModal(number,status,id)} className={`table-item ${status}`}>
                            <h5>{number}</h5>
                            <h5>{status}</h5>
                        </button>
                    </Col>
                ))}   
                <OpenTableModal 
                isOpen={isModalOpen}
                toggle={toogleModal}
                tableNumber={tableNumber}
                tableId={tableId}
                />
                <RestrictedTableModal 
                isOpen={isRestrictedModalOpen}
                toggle={toogleRestrictedModal}
                tableNumber={tableNumber}
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