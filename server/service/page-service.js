import TempPage from '../model/TempPagel.js'
import {compareHash, hashDigest} from '../utils.js'
import JsonResult from "../model/JsonResult.js";
import BizResultCode from "../model/BizResultCode.js";
import logger from "../config/logger.js";


/**
 * 获取页面头部信息
 * @param {*} req
 * return 页面存在：return 200 ; 页面不存在： return 404
 */
export async function getPageHead(req) {
    const {seourl} = req.params

    const page = await TempPage.findOne({
        attributes: ['id'],
        where: {seourl}
    });
    if (page === null) {
        return 404
    } else {
        return 200
    }
}

/**
 * 获取纸张内容
 * @param {*} req 密码放在header
 * return
 */
export async function getPage(req) {
    const {seourl} = req.params

    const rawPassword = req.headers['x-password'] || ""
    const page = await TempPage.findOne({
        attributes: ['id', 'content', 'password', 'sharedUrl'],
        where: {seourl}
    });

    if (page === null) {
        return JsonResult.bizFail(BizResultCode.NOT_CREATED)
    } else {
        const isValid = passValidate(rawPassword, page.password)
        if (isValid) {
            const {content, sharedUrl} = page
            return JsonResult.success({content, sharedUrl})
        } else {
            return JsonResult.validateFailed('require a valid password')
        }
    }

}

/**
 * 获取分享的纸张内容
 * @param req
 * @returns {Promise<JsonResult>}
 */
export const getSharedPage = async (req) => {
    const {sharedUrl} = req.params

    const page = await TempPage.findOne({
        attributes: ['content'],
        where: {sharedUrl}
    });

    return JsonResult.success(page)
}

/**
 *  添加一页纸
 * @param {*} req 纸张内容
 * return 结果
 */
export async function createPage(req) {
    const {seourl} = req.params
    const {content, sharedUrl} = req.body

    if (!isValidLength(content)) {
        return JsonResult.fail("content length reached limit.")
    }
    const [page, created] = await TempPage.findOrCreate({
        where: {seourl},
        defaults: {
            seourl, content, sharedUrl
        }
    })

    return created ?
        JsonResult.success(page) :
        JsonResult.fail('already exist')
}


/**
 * 修改纸张内容
 * @param {*} req 如果有密码，放在header里
 * return
 */
export async function modifyPage(req) {
    const {seourl} = req.params
    const password = req.headers['x-password'] || ""
    const {content, newSeourl, newPassword} = req.body

    logger.error('req.body', req.body, newPassword)
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: {seourl}
    });

    if (page === null) {
        return JsonResult.bizFail(BizResultCode.NOT_CREATED)
    }

    // 密码验证
    if (passValidate(password, page.password)) {

        if (!isValidLength(content)) {
            logger.error(`Error: can't modify page ${seourl}, content length limit 5000 letter.`)
            return JsonResult.fail("content length reached limit.")
        }

        if (newPassword !== undefined) {
            if (page.password === null) {
                const passwordHash = hashDigest(newPassword)
                page.update({password: passwordHash})
                return JsonResult.success()
            }
        }

        if (await isUrlExist(newSeourl)) {
            return JsonResult.fail('url has already been used.')
        }

        await page.update({content, seourl: newSeourl, password: newPassword})
        return JsonResult.success();
    } else {
        return JsonResult.validateFailed();
    }
}

/**
 * 销毁纸张
 * @param {*} req 如果有密码，放在header里
 * return
 */
export async function desdroyPage(req) {
    const {seourl} = req.params
    const rawPassword = req.headers['x-password'] || ""

    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: {seourl}
    });
    if (page === null) {
        return JsonResult.bizFail(BizResultCode.NOT_CREATED)
    } else {
        if (passValidate(rawPassword, page.password)) {
            await page.destroy()
            return JsonResult.success();
        } else {
            return JsonResult.validateFailed();
        }
    }
}

/**
 * 校验纸张密码
 * @param rawPassword
 * @param passwordHash
 * @returns {boolean|*}
 */
function passValidate(rawPassword, passwordHash) {
    if (passwordHash === null) {
        return true
    }
    return compareHash(rawPassword, passwordHash)
}

/**
 * 校验url是否已被使用
 * @param newSeourl
 * @returns {Promise<boolean>}
 */
async function isUrlExist(newSeourl) {
    if (newSeourl !== undefined) {
        const isExist = await TempPage.findOne({
                attributes: ['id', 'password'],
                where: {seourl: newSeourl}
            }
        )
        if (isExist !== null) {
            return true
        }
    }
    return false
}

function isValidLength(content) {
    if (content === undefined || content === null) {
        return true
    }

    if (content.length > 5000) {
        return false
    }
    return true
}
