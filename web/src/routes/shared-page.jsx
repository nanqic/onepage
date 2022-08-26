import {useEffect, useRef, useState} from "react";
import Prompt from "../components/prompt";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getSharedPage} from "../api"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {copyTextToClipboard, sharedPromptList} from "@/utils/index.js";
import SnackAlert from "@/components/snack-alert.jsx";
import * as React from "react";

export default function SharedPage() {
    const [searchParams] = useSearchParams();
    const textareaEl = useRef(null)
    const getContent = () => textareaEl.current.firstChild.firstChild.value
    const setContent = (value) => textareaEl.current.firstChild.firstChild.value = (value)
    const navigate = useNavigate()
    const [control, setControl] = useState({})

    useEffect(() => {
        const sharedUrl = searchParams.get('p')
        const initData = async () => {
            // console.log('get') //调用两次，以后再优化
            let resp = await getSharedPage(sharedUrl)
            if (resp.code === 200 && resp.data!==null) {
                setContent(resp.data.content)
            } else {
                navigate(`/404`)
            }
        }
        initData()
    }, [])

    const handleDbClick = () => {
        copyTextToClipboard(getContent())
        setControl({snackbar: {open: true, style: 'success', info: '页面内容已复制到剪切板'}})
    }

    return (
        <>
            <SnackAlert {...control.snackbar} />
            <Box
                sx={{
                    bgcolor: '#ebeef2',
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                    },
                    pt: 1,
                    pb: 6,
                }}
            >
                <Prompt promptList={sharedPromptList}/>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        minWidth: 300,
                        width: '98%',
                    }}
                >
                    <TextField
                        disabled
                        ref={textareaEl}
                        rows={25}
                        variant="standard"
                        multiline
                        fullWidth
                        onDoubleClick={handleDbClick}
                    />
                </Box>
            </Box>
        </>
    )
}

