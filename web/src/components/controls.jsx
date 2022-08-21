import SimpleDialog from './simple-dialog.jsx';
import padlockUrl from "../assets/padlock.png"
import {useState, useEffect} from 'react';
import {addPagePassword, changePage, destroyPage, getPage, getPageHead, removePagePassword} from '../api/index'
import { useNavigate } from "react-router-dom";
import SnackAlert from './snack-alert';
import InputDialog from './input-dialog';
import { setCookie } from 'react-use-cookie';
import {copyTextToClipboard} from "../utils/index.js";

export default function Controls(props) {
  const { seourl, hasPassword,setHasPassword, secret,getPretext, setPretext } = props
  const [control, setControl] = useState({})
  const navigate = useNavigate();
  const sharedPageLink = import.meta.env.VITE_APP_URL + seourl

  useEffect(() => {
    if (hasPassword && secret === "") {
      setControl({
          inputDialog:{  inputType: 'password',
            open: true,
            title: '需要密码',
            content: '这张纸被密码保护，请输入密码',
            submit: handleInputPwSubmit
        }
      })
    }
  }, [props])

  const handlePassword = async () => {
    if (hasPassword){
      setControl({
        inputDialog:{  inputType: 'password',
          open: true,
          title: '移除密码',
          content: '请输入页面密码',
          submit: handleRemovePwSubmit
        }
      })
    }else{
      // 检测页面是否存在
      const result = await getPageHead(seourl)
      if (!result){
        setControl({snackbar:{ open: true, style: 'warning', info: '页面内容为空时，不能创建密码' }})
        return
      }
      setControl({
        inputDialog:{  inputType: 'password',
          open: true,
          title: '设置密码',
          content: '请输入页面密码',
          submit: handleAddPwSubmit
        }
      })
    }
  }

  const handleInputPwSubmit = async (value) => {
    const result = await getPage(seourl,value)
    if (result.code===0){
      setControl({snackbar:{ open: false},inputDialog:{ open: false}})
      setPretext(result.content)
      setCookie(seourl, window.btoa(value))
    } else {
      setControl({snackbar:{ open: true, style: 'error', info: '密码不正确' }})
    }
  };

  const handleAddPwSubmit = async (value) => {
    if (value.length < 4){
      setControl({snackbar: { open: true, style: 'warning', info: '密码长度需要大于3'}})
      return
    }
    const result = await addPagePassword(seourl,value)
    if (result.code === 0) {
      setControl({inputDialog:{open: false},snackbar:{ open: true, style: 'success', info: '页面密码设置成功！' }})
      setHasPassword(true)
      setCookie(seourl, window.btoa(value))
    }
  }

  const handleRemovePwSubmit = async (value) => {
    const result = await removePagePassword(seourl,value)
    if (result.code === 0) {
      setControl({ inputDialog:{open: false},snackbar:{open: true, style: 'success', info: '页面密码移除成功！'}})
      setHasPassword(false)
      setCookie(seourl, "", { days: 0 });
    }else {
      setControl({snackbar: { open: true, style: 'error', info: '页面密码不正确'}})
    }
  }
  const handleDestroy = () => {
    setControl({
      simpleDialog:{
        open: true,
        title: "确定销毁吗？",
        content: "页面一旦销毁，内容无法找回，该操作不可撤销。",
        confirm: handleDestroyConfirm
      }
    })
  }

  const handleDestroyConfirm = async () => {
    // 检测页面是否存在
    const resp= await getPageHead(seourl)
    if (!resp){
      setControl({snackbar:{ open: true, style: 'warning', info: '页面尚未创建' }})
      return
    }
    const result = await destroyPage(seourl, secret)
    if (result.code === 0) {
      setControl({simpleDialog:{ open: false }, snackbar:{open: true, style: 'success', info: '页面已成功销毁，3s后将跳转到首页'}})
      setTimeout(() => navigate(`/`, { replace: true }), 3000)
    }
  }

  const handleModifyPageUrl = () => {
    setControl({
      inputDialog:{  inputType: 'text',
        open: true,
        title: '修改网址',
        content: '请输入页面新网址',
        submit: modifyUrl
      }
    })

  }

  const modifyUrl = async (value) => {
    if (value.length < 3 || value.length > 33){
      setControl({snackbar: { open: true, style: 'warning', info: '网址长度需要大于3小于33'}})
      return
    }
    const page = {seourl,secret,newSeourl:value}
    const result = await changePage(page)
    if (result.code === 0) {
      navigate(`/${value}`)
      setControl({inputDialog:{open: false},snackbar:{ open: true, style: 'success', info: '页面网址修改成功！' }})
    }
  }

  const handleSharePage = () => {
    copyTextToClipboard(sharedPageLink)
    setControl({snackbar: { open: true, style: 'success', info: '页面网址已复制到剪切板' }})
  }

  const handleChandleCopyToClipboard = () => {
    copyTextToClipboard(getPretext())
    setControl({snackbar: { open: true, style: 'success', info: '页面内容已复制到剪切板' }})
  }
  return (
    <>
      <SimpleDialog {...control.simpleDialog} />
      <SnackAlert {...control.snackbar} />
      {control.inputDialog===undefined ? "" : <InputDialog {...control.inputDialog} />}

      <div id="controls">
        <div id="ctrl-left">
          <a onClick={handleDestroy} id="padlock" title="">
            销毁页面
          </a>
          {}
          <a onClick={handlePassword}>
            <img src={padlockUrl} alt='icon' width="8" height="13" />
            {hasPassword ? "移除" : "添加"}密码
          </a>
        </div>
        <div id="ctrl-top">
          <a onClick={handleModifyPageUrl}>修改网址</a>
        </div>
        <a onClick={handleSharePage} title={sharedPageLink}> 分享这页</a>
        <a onClick={handleChandleCopyToClipboard}> 一键复制</a>
      </div>
    </>
  )
}