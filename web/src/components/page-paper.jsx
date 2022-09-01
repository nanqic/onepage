import Prompt from "./prompt.jsx";
import {editablePromptList, sharedPromptList} from "../utils/index.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";

export default function PagePaper(props){
    const [textareaRow, setTextareaRow] = useState(25)
    const matchMd = useMediaQuery('(min-width:600px)');

    useEffect(()=>{
        if (!matchMd) setTextareaRow(calcRow)

    },[])
    function calcRow() {
        const {height} = screen
        if (height > 700 && height < 800) {
            return 26
        } else if (height >= 800) {
            return 29
        } else {
            return 23
        }
    }

    return (
        <Box
            sx={{
                bgcolor: '#ebeef2',
                display: 'flex',
                flexWrap: 'wrap',
                pb: matchMd ? 6 : 0.2,
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                },
            }}
        >
            {matchMd ? <Prompt promptList={props.display?sharedPromptList:editablePromptList}/> : null}
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    p: 2,
                    minWidth: 300,
                }}
            >
                <TextField
                    {...props}
                    rows={textareaRow}
                    variant="standard"
                    placeholder="开始输入"
                    multiline
                    fullWidth
                    autoFocus
                />
            </Box>
        </Box>
    )
}
