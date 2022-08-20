import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { generateShortLink } from "../utils/shortUrl";

export default function Home() {
  const [seourl, setSeourl] = useState(generateShortLink())
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`${seourl}`, { replace: true });
  }

    const handleKeyUp = (e) => {
        if (e.key !== 'Enter') return
        handleSubmit()
    }
  return (
    <div className="container">
      <h1><Link to="/">One Page</Link></h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
      </nav>
      <main>
        <p className="description">
          Get started. <code>启用云上的一页纸</code>
        </p>
        <div className="form-wrapper">
          <input onChange={e => setSeourl(e.target.value)} onKeyUp={(e) => handleKeyUp(e)} type="text" placeholder="不填写将随机创建" />
          <button type="button" onClick={handleSubmit} >打开</button>
        </div>
      </main>
    </div>
  )
}

