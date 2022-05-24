import React from "react";
import { Container } from 'reactstrap';
import { IAsyncData, IStaff } from "../models";
import { INITIAL_STAFF } from "../pages/tables/Tables";
import { Header } from './header/Header';

type Props = {
    children?: React.ReactNode
}

export const CommonPageContainer: React.FC<Props> = ({children})=>{
    return (
        <>
            <Header/>
            <Container>
                {children}
            </Container>
        </>
    )
}