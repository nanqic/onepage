import { useEffect, useState } from "react";
import {Typography} from "@mui/material";

export default function Prompt(props) {

    const {promptList} =  props
    const [prompt, setPrompt] = useState(promptList[0])


    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            i++
            setPrompt(promptList[i % promptList.length])
        }, 6000)
        return () => clearInterval(timer);
    }, [])

    return (
        <>
            <Typography sx={{
                fontSize: '12px',
                textAlign: 'center',
                paddingTop: '8px'
            }}>
                <strong>小提示：</strong>{prompt}
            </Typography>
        </>
    )
}