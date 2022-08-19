import AlertDialog from './alert-dialog';
import padlockUrl from "../assets/padlock.png"

export default function Controls(props) {
  const logoutUrl = ""
  return (
    <>
      <div id="controls">

        <div id="ctrl-left">
          <a href={logoutUrl} id="padlock" title="退出登录">
            <img src={padlockUrl} alt='icon' width="8" height="13" />
          </a>
          <a href={logoutUrl}>{props.hasPassword ? "移除" : "添加"}密码</a>
          <AlertDialog />
        </div>

        <div id="ctrl-top">
          <a href={logoutUrl}>https://onepage.com/nhj</a>
          <a href={logoutUrl}>修改网址</a>
        </div>
        <a href={logoutUrl}>分享这页</a>

      </div>
    </>
  )
}