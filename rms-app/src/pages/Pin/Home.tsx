import axios from 'axios';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../consts';
import { useAsyncData } from '../../hooks/useAsyncData';
import { IAsyncData, IStaff } from '../../models';
import "./Pin.scss";

export const Home : React.FC =()=>{
    let navigate = useNavigate();
    const [pin,setPin]=React.useState<number>(0);
    const [content1,setContent1]=React.useState("");
    const [content2,setContent2]=React.useState("");
    const [content3,setContent3]=React.useState("");
    const [content4,setContent4]=React.useState("");
    const [len,setLen] = React.useState(0);
    const handleClickPin = React.useCallback( async (num:number)=>{
        await setLen(`${pin}`.length);
        await setPin(pin*10 + num);
        console.log(len);
        if (len ===0) {
        
            setContent1("full");
        }
        if (len ===1) {
        
            setContent2("full");
        }
        if (len ===2) {
        
            setContent3("full");
        }
        if (len ===3) {
        
            setContent4("full");
        }
        
        if(pin>=1000&&pin<=9999){
            let path = APP_ROUTES.HALLS.PATH;
            axios.get(`https://localhost:44355/api/staffs/${pin}`).then(({data})=>{
                localStorage.setItem("staff",JSON.stringify(data));
                navigate(path);
            })
            setPin(0)
        } 
    },[pin,len])
    
    
    
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <div className='pin-modal d-flex align-items-center flex-column'>
                <div id='logo'>
                    <img src="https://demo.clopos.com/pos/img/clopos-logo-pos.png" alt="" />
                </div>
                <div className='pin-view'>
                    <div id="pin-box">
                        <p className="c-657683 text-uppercase fs-13">Pin kodu daxil edin</p>
                        <span className={`circle ${content1}`}></span>
                        <span className={`circle ${content2}`}></span>
                        <span className={`circle ${content3}`}></span>
                        <span className={`circle ${content4}`}></span>
                    </div>
                    <div className='numpad'>
                        <div className="ml-numpad">
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(1)}  className="btn btn-clopos-blue btn-block numBtn ">1</button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(2)} className="btn btn-clopos-blue btn-block numBtn " value={2}>2</button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(3)} className="btn btn-clopos-blue btn-block numBtn ">3</button>
                            </div>
                        </div>
                        <div className="ml-numpad">
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(4)} className="btn btn-clopos-blue btn-block numBtn ">4</button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(5)} className="btn btn-clopos-blue btn-block numBtn ">5</button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(6)} className="btn btn-clopos-blue btn-block numBtn ">6</button>
                            </div>
                        </div>
                        <div className="ml-numpad">
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(7)} className="btn btn-clopos-blue btn-block numBtn ">7</button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(8)} className="btn btn-clopos-blue btn-block numBtn ">8</button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(9)} className="btn btn-clopos-blue btn-block numBtn ">9</button>
                            </div>
                        </div>
                        <div className="ml-numpad">
                            <div className="keypad">
                                <button className="btn btn-clopos-grey btn-block numBtn ">
                                    <svg viewBox="0 0 24 24" role="presentation" style={{width: "1.5rem", height: "1.5rem"}}>
                                        <path d="M2,21H17C17.7,21 18.2,20.6 18.6,20.1L24,12L18.6,3.9C18.2,3.4 17.7,3 17,3H2A2,2 0 0,0 0,5V19A2,2 0 0,0 2,21M5,8.4L6.4,7L10,10.6L13.6,7L15,8.4L11.4,12L15,15.6L13.6,17L10,13.4L6.4,17L5,15.6L8.6,12" style={{fill: "white"}}></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="keypad">
                                <button onClick={()=>handleClickPin(0)} className="btn btn-clopos-blue btn-block numBtn ">0</button>
                            </div>
                            <div className="keypad">
                                <button className="btn btn-clopos-grey btn-block numBtn ">
                                    <svg viewBox="0 0 24 24" role="presentation" style={{width: "1.5rem", height: "1.5rem"}}>
                                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" style={{fill: "white"}}></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}