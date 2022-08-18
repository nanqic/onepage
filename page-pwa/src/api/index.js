// const apiUrl = "http://localhost:8000/"
const apiUrl = "api/"

export const getPageHead = async (seourl) => {
    const resp = await fetch(apiUrl + seourl, {
        method: 'HEAD'
    })
    if (resp.status === 200) {
        return true
    }
    return false
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
    const data = {
        content: value
    }
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const respJson = await resp.json()
    return respJson
}

export const changePage = async (seourl, secret, value) => {
    const url = apiUrl + seourl
    const data = {
        content: value
    }
    const resp = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-password': secret

        },
        body: JSON.stringify(data)
    })
    const respJson = await resp.json()
    return respJson
}