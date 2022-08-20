import Controls from "../components/controls";
import {useEffect, useRef, useState} from "react";
import Prompt from "../components/prompt";
import { useDebounce } from "../utils";
import { useParams } from "react-router-dom";
import { getPage, changePage, createPage } from "../api"
import { getCookie } from "react-use-cookie";

export default function Page() {
  const [pretext, setPretext] = useState("")
  const [shouldCreate, setShouldCreate] = useState(false)
  const { seourl } = useParams()
  const secret = window.atob(getCookie(seourl))
  const [hasPassword, setHasPassword] = useState(secret!=="")
  const textareaEl = useRef(null);
  const getPretext = () =>  textareaEl.current.value
  const pageObj = {seourl, secret, getPretext, setPretext,hasPassword,setHasPassword,}

  useEffect(() => {
    const initData = async () => {
      let data = await getPage(seourl, secret)
      if (data.code === 0) {
        setPretext(data.content)
      } else if (data.code === -5) {
          setHasPassword(true)
      } else if (data.code === -1) {
        setShouldCreate(true)
      }
    }
    initData()
  }, [seourl])


  const handleTextChange = useDebounce(e => {
    const { value } = e.target
    setPretext(value);
    if (shouldCreate) {
      createPage(seourl, value)
    } else {
      changePage(seourl, secret, value)
    }
  }, 3000)


  return (
    <>
      <div className='body'>
        <Prompt />
        <textarea ref={textareaEl} autoFocus className="textarea" defaultValue={pretext} onChange={e => handleTextChange(e)}></textarea>
        <Controls {...pageObj} />
      </div>
    </>
  )
}

