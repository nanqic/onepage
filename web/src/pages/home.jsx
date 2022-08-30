import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Link} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {generateShortLink} from "../utils/shortUrl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {getPageHead} from "@/api/index.js";
import Readme from "@/components/readme.jsx";
import GitHubIcon from "@mui/icons-material/GitHub.js";
import * as React from "react";

export default function Home() {
    const [seourl, setSeourl] = useState(generateShortLink())
    const [helperText, setHelperText] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (seourl.length > 33 || seourl.length < 3) {
            setHelperText("网址长度应为3-32位")
            return
        }
        getPageHead('')
            .then(res => {
                if (res.status === 500) {
                    navigate('/500')
                }
            })
        navigate(`${seourl}`, {replace: true});
    }

    const handleKeyUp = async (e) => {
        if (e.key !== 'Enter') return
        await handleSubmit()
    }

    return (
        <>
            <Container maxWidth="sm" sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <Box sx={{
                    flex: 2,
                }}>
                    <Typography variant="h3" textAlign={"center"} sx={{pt: 5}}>
                        <Link to="/" underline="none">One Page</Link>
                    </Typography>
                    <Typography textAlign={"center"} sx={{pt: 5}} variant="h6">
                        Get started. <code>启用云上的一页纸</code>
                    </Typography>
                </Box>
                <Box sx={{
                    flex: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: 5
                }}>
                    <TextField
                        focused
                        fullWidth
                        helperText={helperText}
                        error={helperText !== ""}
                        label="输入网址"
                        variant="filled"
                        color="success"
                        onChange={e => setSeourl(e.target.value)}
                        onKeyUp={e => handleKeyUp(e)} type="text"
                        placeholder="不填写将随机创建"/>
                    <Button variant="contained" color="success"
                            sx={{
                                height: '56px'
                            }}
                            onClick={handleSubmit}>
                        打开
                    </Button>

                </Box>
                <Box sx={{
                    flex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant="subtitle2">One Page &copy; 2022</Typography> <Readme />
                    <Link href={'https://github.com/nanqic/onepage'} color="inherit" rel ="noreferrer" target="_blank"><GitHubIcon/></Link>
                </Box>
            </Container>
        </>
    );
}


