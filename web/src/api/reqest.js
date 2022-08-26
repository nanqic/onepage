
export async function getRequest(option){
    const resp = await fetch(option.url, {
        method: 'GET',
        headers: genHeader(option),
    })
    if (!resp.ok) return resp

    return await resp.json()
}

export async function postRequest(option){
    const resp = await fetch(option.url, {
        method: 'POST',
        headers: genHeader(option),
        body: JSON.stringify(option.data)
    })
    if (!resp.ok) return resp

    return await resp.json()
}

export async function putRequest(option){
    const resp = await fetch(option.url, {
        method: 'PUT',
        headers: genHeader(option),
        body: JSON.stringify(option.data)
    })
    if (!resp.ok) return resp

    return await resp.json()
}

export async function deleteRequest(option){
    const resp = await fetch(option.url, {
        method: 'DELETE',
        headers: genHeader(option),
        body: JSON.stringify(option.data)
    })
    if (!resp.ok) return resp

    return await resp.json()
}

function genHeader(option){
    const header = {}
    if (option.secret !== undefined){
        header['x-password'] = option.secret
    }
    header['Content-Type'] = 'application/json'

    return header
}