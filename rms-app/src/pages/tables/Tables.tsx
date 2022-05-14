import { createBrowserHistory } from "history";
import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Spinner } from "reactstrap";
import { CommonPageContainer } from "../../components/CommonPageContainer";
import { useAsyncData } from "../../hooks/useAsyncData";
import { ITable, ITableList } from "../../models";
import './Tables.scss';


export const Tables : React.FC = ()=>{
    const {id} = useParams<{id:string}>();
    const [tablesData] = useAsyncData<ITableList<ITable>>('/tables', {hallId : id});

    const history = createBrowserHistory();
    const handleCreateOrder = React.useCallback((id:string)=>{
        history.push(`/tables/${id}`);
    },[history]);
     
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
                        <button onClick={()=>handleCreateOrder(id)} className={`table-item ${status}`}>
                            <h5>{number}</h5>
                            <h5>{status}</h5>
                        </button>
                    </Col>
                ))}   
            </Row>
        )
    }

    return (
        <CommonPageContainer>
            {content}
        </CommonPageContainer>
    )
}