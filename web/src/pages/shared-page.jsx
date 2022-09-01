import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getSharedPage} from "../api"
import {copyTextToClipboard, sharedPromptList} from "@/utils/index.js";
import SnackAlert from "@/components/snack-alert.jsx";
import * as React from "react";
import PagePaper from "../components/page-paper";
import Container from "@mui/material/Container";

export default function SharedPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [alert, setAlert] = useState({})
    const [content, setContent] = useState("")

    useEffect(() => {
        const sharedUrl = searchParams.get('p')
        const initData = async () => {
            // console.log('get') //调用两次，以后再优化
            let resp = await getSharedPage(sharedUrl)
            if (resp.code === 200 && resp.data !== null) {
                setContent(resp.data.content)
            } else {
                navigate(`/404`)
            }
        }
        initData()
    }, [])

    const handleDbClick = () => {
        copyTextToClipboard(content)
        setAlert({open: true, style: 'success', info: '页面内容已复制到剪切板'})
    }

    const paperObj = {defaultValue: content, disabled: true, onDoubleClick: handleDbClick}


    return (
        <Container maxWidth="lg" sx={{
            padding: 0,
            position: 'relative',
        }}>
            <SnackAlert {...alert} />
            <PagePaper {...paperObj}/>
        </Container>
    )
}

