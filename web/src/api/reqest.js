
export async function getRequest(option){
    const resp = await fetch(option.url, {
        method: 'GET',
        headers: option.headers,
    })
    if (!resp.ok) return resp

    return await resp.json()
}

export async function postRequest(option){
    const resp = await fetch(option.url, {
        method: 'POST',
        headers: option.headers,
        body: JSON.stringify(option.body)
    })
    if (!resp.ok) return resp

    return await resp.json()
}

export async function putRequest(option){
    const resp = await fetch(option.url, {
        method: 'PUT',
        headers: option.headers,
        body: JSON.stringify(option.body)
    })
    if (!resp.ok) return resp

    return await resp.json()
}

export async function deleteRequest(option){
    const resp = await fetch(option.url, {
        method: 'DELETE',
        headers: option.headers,
        body: JSON.stringify(option.body)
    })
    if (!resp.ok) return resp

    return await resp.json()
}


