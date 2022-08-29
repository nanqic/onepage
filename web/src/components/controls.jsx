import SimpleDialog from './simple-dialog.jsx';
import {useState, useEffect} from 'react';
import {changePage, destroyPage, getPage, getPageHead} from '../api/index'
import {useNavigate} from "react-router-dom";
import SnackAlert from './snack-alert';
import InputDialog from './input-dialog';
import {setCookie} from 'react-use-cookie';
import {copyTextToClipboard} from "../utils/index.js";
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import {Delete, Edit, EnhancedEncryption, LockOpen} from "@mui/icons-material";


export default function Controls(props) {
    const {isNewPage, seourl, sharedUrl, hasPassword, setHasPassword, password, textareaEl, setContent} = props
    const [control, setControl] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (hasPassword && password === "") {
            setControl({inputDialog: needPwDialog})
        }
    }, [props])

    const needPwDialog = {
        inputType: 'password',
        open: true,
        title: '需要密码',
        content: '这张纸被密码保护，请输入密码',
        submit: handleNeedPwSubmit
    }

    const getContent = () => textareaEl.current.firstChild.firstChild.value

    const removePwDialog = {
        inputType: 'password',
        open: true,
        title: '移除密码',
        content: '请输入页面密码',
        submit: handleRemovePwSubmit
    }

    const addPwDialog = {
        inputType: 'password',
        open: true,
        title: '设置密码',
        content: '请输入页面密码',
        submit: handleAddPwSubmit
    }

    async function handleNeedPwSubmit(value) {
        if (value.length < 4) {
            setControl({inputDialog: {...needPwDialog, helperText: '密码长度需要大于3'}})
            return
        }
        // 验证输入的密码是否正确
        const result = await getPage(seourl, value)
        if (result.code === 200) {
            setControl({inputDialog: {open: false}})
            setContent(result.data.content)
            setCookie(seourl, window.btoa(value))
        } else {
            setControl({inputDialog: {...needPwDialog, helperText: '密码不不正确'}})
        }
    }

    async function handleAddPwSubmit(value) {
        if (value.length < 3) {
            setControl({inputDialog: {...addPwDialog, helperText: '页面密码长度需要大于3'}})
            return
        }

        const page = {seourl, newPassword: value}
        const result = await changePage(page, value)
        if (result.code === 200) {
            setControl({
                inputDialog: {open: false},
                snackbar: {open: true, style: 'success', info: '页面密码设置成功！'}
            })
            setHasPassword(true)
            setCookie(seourl, window.btoa(value))
        }
    }

    async function handleRemovePwSubmit(value) {
        if (value.length < 3) {
            setControl({inputDialog: {...removePwDialog, helperText: '密码长度需要大于3'}})
            return
        }

        const page = {seourl, newPassword: null}
        const result = await changePage(page, value)
        if (result.code === 200) {
            setControl({
                inputDialog: {open: false},
                snackbar: {open: true, style: 'success', info: '页面密码移除成功！'}
            })
            setHasPassword(false)
            setCookie(seourl, "", {days: 0});
        } else {
            setControl({inputDialog: {...removePwDialog, helperText: '密码不正确'}})
        }
    }

    const destroyPwDialog = {
        open: true,
        inputType: 'password',
        title: "验证密码",
        content: "页面一旦销毁，内容无法找回，该操作不可撤销。",
        submit: handleDestroySubmit
    }

    const destroyDialog = {
        open: true,
        title: "销毁确认",
        content: "页面一旦销毁，内容无法找回，确定销毁吗？",
        confirm: handleDestroySubmit
    }

    async function handleDestroySubmit(value) {
        const doDestroy = async ()=>{
            const destroyResult = await destroyPage(seourl, password)
            if (destroyResult.code === 200) {
                setControl({
                    simpleDialog: {open: false},
                    snackbar: {open: true, style: 'success', info: '页面已成功销毁，3s后将跳转到首页'}
                })
                setTimeout(() => navigate(`/`, {replace: true}), 3000)
            }
        }

        // 如果没有密码，直接销毁
        if (value===undefined){
            await doDestroy()
            return;
        }

        // 输入密码后销毁
        const result = await changePage({seourl}, value)
        if (result.code === 200) {
            await doDestroy()
        } else {
            setControl({
                simpleDialog: {open: false},
                snackbar: {open: true, style: 'error', info: result.msg}
            })
        }
    }

    const handleModifyPageUrlConfirm = async (value) => {
        if (value.length < 3 || value.length > 33) {
            setControl({inputDialog: {...ModifyPageUrlDialog, helperText: '网址长度需要大于3小于33'}})
            return
        }

        const response = await getPageHead(value)
        if (response.ok) {
            setControl({inputDialog: {...ModifyPageUrlDialog, helperText: '该网址已有人使用，换个别的吧'}})
            return
        }

        const page = {seourl, newSeourl: value}
        const result = await changePage(page, password)
        if (result.code === 200) {
            navigate(`/${value}`)
            setControl({
                inputDialog: {open: false},
                snackbar: {open: true, style: 'success', info: '页面网址修改成功！'}
            })
            setCookie(seourl, "", {days: 0});
            setCookie(value, window.btoa(value))
        }
    }

    const ModifyPageUrlDialog = {
        inputType: 'text',
        open: true,
        title: '修改网址',
        content: '请输入页面新网址',
        submit: handleModifyPageUrlConfirm
    }

    const handleSharePage = () => {
        const sharedPageLink = import.meta.env.VITE_APP_URL + '/share?p=' + sharedUrl
        copyTextToClipboard(sharedPageLink)
        setControl({snackbar: {open: true, style: 'success', info: '页面网址已复制到剪切板'}})
    }

    const handleCopyToClipboard = () => {
        copyTextToClipboard(getContent())
        setControl({snackbar: {open: true, style: 'success', info: '页面内容已复制到剪切板'}})
    }

    // 定义图标
    const actions = [
        {icon: <ShareIcon/>, name: '分享这页', handler: handleSharePage},
        {icon: <FileCopyIcon/>, name: '复制内容', handler: handleCopyToClipboard},
        {icon: <Edit/>, name: '修改网址', handler: () => setControl({inputDialog: ModifyPageUrlDialog})},
        {
            icon: hasPassword ? <LockOpen/> : <EnhancedEncryption/>,
            name: hasPassword ? "移除密码" : "添加密码",
            handler: () => setControl({inputDialog: hasPassword ? removePwDialog : addPwDialog})
        },
        {icon: <Delete/>, name: '销毁页面', handler: () => setControl( hasPassword ?{inputDialog:destroyPwDialog}: {simpleDialog:destroyDialog})}
    ];
    return (
        <>
            <SimpleDialog {...control.simpleDialog} />
            <SnackAlert {...control.snackbar} />
            {control.inputDialog === undefined ? "" : <InputDialog {...control.inputDialog} />}
            <Box sx={{height: 66, transform: 'translateZ(0px)', flexGrow: 1}}>
                {isNewPage ? "" :
                    <SpeedDial
                        ariaLabel="SpeedDial basic"
                        sx={{position: 'absolute', bottom: -6, right: 16}}
                        icon={<SpeedDialIcon/>}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.handler}
                            />
                        ))}
                    </SpeedDial>}
            </Box>
        </>
    )
}
