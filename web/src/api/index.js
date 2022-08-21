// const apiUrl = "http://localhost:8000/"
const apiUrl = "api/"
const passwordUrl = 'page/password'

export const getPageHead = async (seourl) => {
    const resp = await fetch(apiUrl + seourl, {
        method: 'HEAD'
    })
    return resp.status === 200 ? true : false
}

export const getPage = async (seourl, secret) => {
    const resp = await fetch(apiUrl + seourl, {
        headers: {
            'x-password': secret
        }
    })
    let data
    if (resp.status === 200) {
        data = await resp.json()
    }
    return data
}

export const createPage = async (seourl, value) => {
    const url = apiUrl + seourl
    const body = {
        content: value
    }
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    return await resp.json()
}

export const changePage = async (page) => {
    const url = apiUrl + page.seourl
    const header = {
        'Content-Type': 'application/json',
        'x-password': page.secret

    }
    page.seourl = page.newSeourl
    delete page.secret
    delete page.newSeourl
    const resp = await fetch(url, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify({...page})
    })
    return await resp.json()
}


export const destroyPage = async (seourl, secret) => {
    const url = apiUrl + seourl
    const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-password': secret
        },
    })
    return await resp.json()
}

export const addPagePassword = async (seourl,secret)=>{
    const url = apiUrl + passwordUrl
    const body = {seourl,newPassword:secret}

    const resp = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return await resp.json()
}

export const removePagePassword = async (seourl,secret)=>{
    const url = apiUrl + passwordUrl
    const body = {seourl,oldPassword:secret}

    const resp = await fetch(url, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return await resp.json()
}