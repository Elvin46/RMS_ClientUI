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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export const Tables : React.FC = ()=>{
    const {id} = useParams<{id:string}>();
    
    const [tablesData,getTables] = useAsyncData<ITableList<ITable>>('/tables', {hallId : id});
    const [isModalOpen,setModalOpen]=React.useState(false);
    const [table,setTable]=React.useState<ITable>({id:0,number:0,status:TABLE_STATUSES.EMPTY,hallId:"0"});
    
    React.useEffect(()=>{
        getTables({hallId : id});
    },[id,getTables]);

    const handleClickModal=React.useCallback((table:ITable)=>{
        
            setModalOpen(true);
            setTable(table);
        
    },[])
    const toogleModal=React.useCallback(()=>{
        setModalOpen((isModalOpen)=>!isModalOpen)
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
                {tablesData.data?.tables.map((table)=>(
                    <Col xs={3} key={id}>
                        <button onClick={()=>handleClickModal(table)} className={`table-item ${table.status}`}>
                            <h5>{table.number}</h5>
                            <h5>{table.status}</h5>
                        </button>
                    </Col>
                ))}   
                <OpenTableModal 
                isOpen={isModalOpen}
                toggle={toogleModal}
                table={table}
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