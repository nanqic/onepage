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
import Container from "@mui/material/Container";
import {useMediaQuery} from "@mui/material";

export default function Page() {
    const [isNewPage, setIsNewPage] = useState(true)
    let {seourl} = useParams()
    const password = window.atob(getCookie(seourl))
    const [hasPassword, setHasPassword] = useState(password !== "")
    const textareaEl = useRef(null);
    const [sharedUrl, setSharedUrl] = useState(generateShortLink())
    const setContent = (value) => textareaEl.current.firstChild.firstChild.value = (value)
    const [syncColor, setSyncColor] = useState("#ccc")
    const pageObj = {isNewPage, seourl, sharedUrl, password, setContent, textareaEl, hasPassword, setHasPassword,}
    const navigate = useNavigate();
    const matchMd = useMediaQuery('(min-width:600px)');
    const [textareaRow, setTextareaRow] = useState(25)
    useEffect(() => {
        if (seourl.length < 3) {
            navigate('/404')
        }
        console.log(screen.height)
        if (!matchMd) setTextareaRow(calcRow)

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
        initData()
    }, [seourl])

    function calcRow(){
        const {height} = screen
        if (height>700 && height<800){
            return 26
        } else if(height>=800){
            return 31
        }else{
            return 23
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
            result = await changePage(reqPage,password)
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
    }, 1000)


    return (
        <Container maxWidth="lg" sx={{padding:0}}>
            <Box
                sx={{
                    bgcolor: '#ebeef2',
                    display: 'flex',
                    flexWrap: 'wrap',
                    pb: matchMd?6:0.2,
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                    },
                }}
            >
                {matchMd?<Prompt promptList={editablePromptList}/>:null}
                <Box
                    sx={{
                        position: 'relative',
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        p: 2,
                        minWidth: 300,
                    }}
                >
                    <SyncIcon sx={{
                        position: 'absolute',
                        color: syncColor,
                        right: '1rem',
                        top: '1rem'
                    }}/>
                    <TextField
                        ref={textareaEl}
                        rows={textareaRow}
                        variant="standard"
                        placeholder="开始输入"
                        multiline
                        fullWidth
                        autoFocus
                        onChange={e => handleTextChange(e)}
                        onInput={() => setSyncColor("#ccc")}
                    />
                    <Controls {...pageObj} />
                </Box>
            </Box>
        </Container>
    )
}

