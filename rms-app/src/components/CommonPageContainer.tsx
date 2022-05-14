import React from "react";
import { Container } from 'reactstrap';
import { Header } from './Header';

type Props = {
    children?: React.ReactNode,
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