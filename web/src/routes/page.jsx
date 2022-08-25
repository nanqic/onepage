import Controls from "../components/controls";
import {useEffect, useRef, useState} from "react";
import Prompt from "../components/prompt";
import {editablePromptList, useDebounce} from "../utils";
import {useNavigate, useParams} from "react-router-dom";
import {getPage, changePage, createPage} from "../api"
import {getCookie} from "react-use-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {generateShortLink} from "@/utils/shortUrl.js";
import SyncIcon from '@mui/icons-material/Sync';

export default function Page() {
    const [isNewPage, setIsNewPage] = useState(true)
    const {seourl} = useParams()
    const secret = window.atob(getCookie(seourl))
    const [hasPassword, setHasPassword] = useState(secret !== "")
    const textareaEl = useRef(null);
    const [sharedUrl, setSharedUrl] = useState()
    const setContent = (value) => textareaEl.current.firstChild.firstChild.value = (value)
    const [syncColor, setSyncColor]= useState("#ccc")
    const pageObj = {isNewPage, seourl, sharedUrl, secret, setContent, textareaEl, hasPassword, setHasPassword,}
    const navigate = useNavigate();

    useEffect(() => {
        if (seourl.length < 3) {
            navigate('/404')
        }
        const initData = async () => {
            // console.log('get',seourl) //调用两次，以后再优化
            let resp = await getPage(seourl, secret)
            if (resp.code === 200) {
                setContent(resp.data.content)
                setSharedUrl(resp.data.shared_url)
                setIsNewPage(false)
                setSyncColor("#2e7d32")
            } else if (resp.code === 400) {
                setHasPassword(true)
            }
        }
        initData()
    }, [seourl])


    const handleTextChange = useDebounce(async e => {
        const {value} = e.target
        const reqPage = {
            content: value,
            secret,
            seourl
        }

        let result ;
        if (isNewPage) {
            const url = generateShortLink()
            setSharedUrl(url)
            setIsNewPage(false)
            result = await createPage({sharedUrl: url, ...reqPage})
        } else {
            result = await changePage(reqPage)
        }
        if (result.code ===200){
            setSyncColor("#2e7d32")
        }
    }, 3000)


    return (
        <>
            <Box
                sx={{
                    bgcolor: '#ebeef2',
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                    },
                }}
            >
                <Prompt promptList={editablePromptList}/>
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
                    <SyncIcon sx={{
                        position: 'absolute',
                        color: syncColor,
                        right: '2rem',
                        top: '5rem'
                    }}/>
                    <TextField
                        ref={textareaEl}
                        rows={25}
                        variant="standard"
                        placeholder="开始输入"
                        multiline
                        fullWidth
                        autoFocus
                        onChange={e =>  handleTextChange(e)}
                        onInput={()=>setSyncColor("#ccc")}
                    />
                    <Controls {...pageObj} />
                </Box>
            </Box>
        </>
    )
}

