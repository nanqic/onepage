import TempPage from '../model/model.js'
import {compareHash} from '../utils.js'
import {hashDigest} from '../utils.js'
import JsonResult from "../model/JsonResult.js";
import BizResultCode from "../model/BizResultCode.js";

/**
 * 为纸张添加密码
 * @param {*} req
 * @param {*} res
 */
export async function initPassword(req, res) {
    const {seourl, newPassword} = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: {seourl}
    });
    if (page === null) {
        return JsonResult.bizFail(BizResultCode.NOT_CREATED)
    } else {
        if (page.password === null) {
            const passwordHash = hashDigest(newPassword)
            page.update({password: passwordHash})
            return JsonResult.success()
        } else {
            return JsonResult.bizFail(BizResultCode.PW_ALREADY_HAS)
        }
    }
}

// 修改纸张密码
export async function modifyPassword(req, res) {
    const {seourl, oldPassword, newPassword} = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: {seourl}
    });
    if (page === null) {
        return JsonResult.bizFail(BizResultCode.NOT_CREATED)
    } else {
        if (compareHash(oldPassword, page.password)) {
            const passwordHash = hashDigest(newPassword)
            page.update({password: passwordHash})
            return JsonResult.success()
        } else {
            return JsonResult.bizFail(BizResultCode.PW_NOT_VALETED)
        }
    }
}

// 移除纸张密码
export async function removePassword(req, res) {
    const {seourl, oldPassword} = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: {seourl}
    });
    if (page === null) {
        return JsonResult.bizFail(BizResultCode.NOT_CREATED)
    } else {
        if (page.password === null || compareHash(oldPassword, page.password)) {
            page.update({password: null})
            return JsonResult.success();
        } else {
            return JsonResult.bizFail(BizResultCode.PW_NOT_VALETED)
        }
    }
}