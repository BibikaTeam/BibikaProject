import { FC, useState } from "react"
import StepsContainer from "./steps/StepsContainer";

const PostAdd: FC = () => {

    return( 
        <>
            {/* Header */}
            <div style={{height: "12%", background: "white"}}>
            </div>

            <StepsContainer />     
        </>
    )
}

export default PostAdd;
