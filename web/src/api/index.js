import {deleteRequest, getRequest, postRequest, putRequest} from "@/api/reqest.js";

const apiUrl = '/api/'
const passwordUrl = 'page/password'

export const getPageHead = async (seourl) => {
    const resp = await fetch(apiUrl + seourl, {
        method: 'HEAD'
    })
    return resp.status === 200
}

export const getPage = async (seourl, secret) => {
    const option = {
        url: apiUrl + seourl,
        secret
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
    const option = {
        url: apiUrl + page.seourl,
        data: {content: page.content,sharedUrl: page.sharedUrl}
    }
    return await postRequest(option)
}

export const changePage = async (page) => {
    const option = {
        url: apiUrl + page.seourl,
        secret: page.secret,
        data: {...page}
    }
    return await putRequest(option)
}

export const destroyPage = async (seourl, secret) => {
    const option = {
        url: apiUrl + seourl,
        secret,
    }
    return await deleteRequest(option)
}

export const addPagePassword = async (seourl, secret) => {
    const option = {
        url: apiUrl + passwordUrl,
        data: {seourl, newPassword: secret}
    }

    return await postRequest(option)
}

export const removePagePassword = async (seourl, secret) => {
    const option = {
        url: apiUrl + passwordUrl,
        data: {seourl, oldPassword: secret}
    }
    return await deleteRequest(option)
}