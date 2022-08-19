import { useEffect, useState } from "react";

export default function Prompt() {

    const [prompt, setPrompt] = useState('访问one page官网：https://www.onepage.com')
    const promptList = [
        '这页纸在你输入文字时会自动保存哦，右上角有保存进度小图标。',
        '纸张如果自动保存失败，当你关闭网页时会提示你还未保存完成。',
        '在这页纸的下方有功能操作，您可以修改网址、添加密码或共享这页纸。',
        '为了不让别人通过这域名编辑这页纸，你要为这页纸添加一个密码。',
        '在纸张的底部操作[添加密码]让这页纸只属于你吧！',
        '复制浏览器地址栏里的网址，您可以在任何地方打开当前这页纸。',
        '别忘记你为这页纸设置的密码，您可以在任何设备上访问当前这页纸。'
    ]

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            i++
            setPrompt(promptList[i % 7])
        }, 6000)
        return () => clearInterval(timer);
    }, [])

    return (
        <>
            <div id="promo">
                <strong>小提示：</strong>{prompt}
            </div>
        </>
    )
}