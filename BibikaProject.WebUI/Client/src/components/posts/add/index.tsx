import { FC, useState } from "react"
import Header from "../../containers/defaultLayout/header";
import StepsContainer from "./steps/StepsContainer";

const PostAdd: FC = () => {

    return( 
        <>
            <Header />
            <StepsContainer />     
        </>
    )
}

export default PostAdd;
