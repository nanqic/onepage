import Controls from "../components/controls";
import { useEffect, useState } from "react";
import Prompt from "../components/prompt";
import { useDebounce } from "../utils";
import { useParams } from "react-router-dom";
import { getPage, changePage, createPage } from "../api"
import InputDialog from '../components/input-dialog';
import { getCookie } from "react-use-cookie";


export default function Page() {
  const [pretext, setPretext] = useState("")
  const [needPassword, setNeedPassword] = useState(false)
  const [shouldCreate, setShouldCreate] = useState(false)
  const { seourl } = useParams()
  const secret = window.atob(getCookie(seourl))

  useEffect(() => {
    const initData = async () => {
      let data = await getPage(seourl, secret)
      if (data.code === 0) {
        setPretext(data.content)
      } else if (data.code === -5) {
        setNeedPassword(true)
      } else if (data.code === -1) {
        setShouldCreate(true)
      }
    }
    initData()
  }, [seourl])

  const handleTextChange = useDebounce(e => {
    const { value } = e.target
    // setText(value);
    if (shouldCreate) {
      createPage(seourl, value)
    } else {
      changePage(seourl, secret, value)
    }
  }, 3000)


  return (
    <>
      <InputDialog seourl={seourl} open={needPassword} />
      <div className='body'>
        <Prompt />
        <textarea autoFocus className="textarea" defaultValue={pretext} onChange={e => handleTextChange(e)}></textarea>
        <Controls hasPassword={needPassword} />
      </div>
    </>
  )
}

