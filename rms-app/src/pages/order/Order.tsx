import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Col, Row, Spinner } from "reactstrap";
import { Header } from "../../components/header/Header";
import { useAsyncData } from "../../hooks/useAsyncData";
import { ICategory, ICategoryList,IFood } from "../../models";
import './Orders.scss';

export const Order : React.FC = () =>{
    const [searchParams,setSearchParams] = useSearchParams();
    const tableId = searchParams.get("tableId");

    const [categoriesData,getCategoriesData] = useAsyncData<ICategoryList>("/categories");
    const [isFoodsOpen,setFoodsOpen] = React.useState(false);
    const [selectedCategory,setselectedCategory] = React.useState<string>();
    const [foodsData,setFoodsData] = React.useState<IFood[]>();
    React.useEffect(()=>{
        getCategoriesData();
    },[getCategoriesData]);

    let content;
    if(categoriesData.loading) {
        content = <Spinner/>;
    }
    else if(categoriesData.error) {
        content = <h4 className='text-danger'>Error Occured</h4>
    }
    else {
        if (isFoodsOpen) {
            console.log(foodsData);
            
            content = (
                    foodsData?.map(({id,name,price,file})=>(
                        <div style={{backgroundImage: `url(${file})`}} key={id} className="menu-item">
                            <button className="food-item">
                                {name}
                            </button>
                        </div>
                    ))
            )
        }
        else{
            content = (
                    categoriesData.data?.categories.map(({id,name,foods})=>(
                        <div  key={id} className="menu-item">
                            <button onClick={()=>handleShowFoods(foods,name)} className="category-item">{name}</button>
                        </div>
                    ))
            )
        }
        
    }
    let foodsContent;
    const handleShowFoods = React.useCallback((foods:IFood[],name:string)=>{
        setFoodsOpen(true);
        setFoodsData(foods);
        setselectedCategory(name);
    },[]);
    const toggleFoods = React.useCallback(()=>{
        setFoodsOpen(false);
    },[])

    return (
        <>
            <Header/>
            <Row className="my-4 left-menu">
                <Col xs={5}></Col>
                <Col xs={7}>
                    <div className="menu-header">
                        <ul>
                            <li>
                                <svg onClick={toggleFoods} cursor="pointer" width="58" height="43" viewBox="0 0 58 43" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><path d="M4 7C4 5.34315 5.34315 4 7 4H50.9541C52.9678 4 54.4097 5.94459 53.8247 7.87144L45.0212 36.8714C44.6374 38.1357 43.4717 39 42.1505 39H7C5.34315 39 4 37.6569 4 36V7Z" fill="white"></path></g><path d="M22 29V23H26V29H31V21H34L24 12L14 21H17V29H22Z" fill="#7670A7"></path><defs><filter id="filter0_d" x="0" y="0" width="57.9561" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                            </li>
                            {isFoodsOpen && 
                                <li>
                                    <h4 className="category-name"><span>{selectedCategory}</span></h4>
                                </li>
                            }
                            
                        </ul>
                    </div>
                    
                    <div className="menu-list">
                            {content}
                    </div>
                    
                </Col>
            </Row>
        </>
    )
}