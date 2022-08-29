import {deleteRequest, getRequest, postRequest, putRequest} from "@/api/reqest.js";

const apiUrl = import.meta.env.VITE_API_URL + '/'

export const getPageHead = async (seourl) => {
    const resp = await fetch(apiUrl + seourl, {
        method: 'HEAD',
    })
    return resp
}

export const getPage = async (seourl, password) => {
    const option = {
        url: apiUrl + seourl,
        headers: {
            'x-password': password,
        },
    }
    return await getRequest(option)
}

export const getSharedPage = async (sharedUrl) => {
    const option = {
        url: `${apiUrl}share/${sharedUrl}`,
    }
    return await getRequest(option)
}

export const createPage = async (page) => {
    const {seourl, ...body} = page
    const option = {
        url: apiUrl + page.seourl,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }
    return await postRequest(option)
}

export const changePage = async (page, password) => {
    const {seourl, ...body} = page
    const option = {
        url: apiUrl + page.seourl,
        headers: {
            'x-password': password,
            'Content-Type': 'application/json'
        },
        body
    }
    return await putRequest(option)
}

export const destroyPage = async (seourl, password) => {
    const option = {
        url: apiUrl + seourl,
        headers: {'x-password': password}
    }
    return await deleteRequest(option)
}

