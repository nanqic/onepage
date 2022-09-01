import Controls from "../components/controls";
import {useEffect, useRef, useState} from "react";
import {useDebounce} from "../utils";
import {useNavigate, useParams} from "react-router-dom";
import {getPage, changePage, createPage} from "../api"
import {getCookie} from "react-use-cookie";
import {generateShortLink} from "@/utils/shortUrl.js";
import SyncIcon from '@mui/icons-material/Sync';
import Container from "@mui/material/Container";
import {useMediaQuery} from "@mui/material";
import PagePaper from "../components/page-paper.jsx";

export default function Page() {
    let {seourl} = useParams()
    const password = window.atob(getCookie(seourl))
    const [sharedUrl, setSharedUrl] = useState(generateShortLink())
    const [isNewPage, setIsNewPage] = useState(true)
    const [hasPassword, setHasPassword] = useState(password !== "")
    const navigate = useNavigate();
    const [syncColor, setSyncColor] = useState("#ccc")
    const [content, setContent] = useState("")
    const matchMd = useMediaQuery('(min-width:600px)');


    useEffect(() => {
        if (seourl.length < 3) navigate('/404')
        initData()
    }, [seourl, content])

    const initData = async () => {
        // console.log('get',seourl) //调用两次，以后再优化
        let resp = await getPage(seourl, password)
        if (resp.code === 200) {
            setContent(resp.data.content)
            setSharedUrl(resp.data.sharedUrl)
            setIsNewPage(false)
            setSyncColor("#2e7d32")
        } else if (resp.code === 400) {
            setHasPassword(true)
        }
    }

    const handleTextChange = useDebounce(async e => {
        const {value} = e.target
        const reqPage = {
            seourl,
            content: value,
        }

        let result;
        if (isNewPage) {
            setIsNewPage(false)
            reqPage['sharedUrl'] = sharedUrl
            result = await createPage(reqPage)
        } else {
            result = await changePage(reqPage, password)
        }

        if (result.code === 200) {
            setSyncColor("#2e7d32")
        } else if (!result.ok) {
            window.addEventListener('beforeunload', (event) => {
                // Cancel the event as stated by the standard.
                event.preventDefault();
                // Chrome requires returnValue to be set.
                event.returnValue = '';
            });
        }
        setContent(value)
    }, 1000)

    const handleSyncColor =()=>{
        setSyncColor('#ccc')
    }
    const paperObj = {defaultValue: content, disabled: false, onChange: handleTextChange, onInput: handleSyncColor}

    const controlObj = {isNewPage, seourl, sharedUrl, password, content, setContent, hasPassword, setHasPassword,}

    return (
        <Container maxWidth="lg" sx={{
            padding: 0,
            position: 'relative',
        }}>
            <SyncIcon sx={{
                position: 'absolute',
                color: syncColor,
                right: matchMd ? 45 : 20,
                top: matchMd ? 65 : 20,
                zIndex: 1111
            }}/>
            <PagePaper {...paperObj} />
            <Controls {...controlObj} />
        </Container>
    )
}

