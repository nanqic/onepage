import TempPage from '../model/model.js'
import { compareHash } from '../utils.js'
import { respOk, respErr } from '../model/model.js'
import { hashDigest } from '../utils.js'

/**
 * 为纸张添加密码
 * @param {*} req 
 * @param {*} res 
 */
export async function initPassword(req, res) {
    const { seourl, newPassword } = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send('not exist, edit befere created');
    } else {
        if (page.password === null) {
            const passwordHash = hashDigest(newPassword)
            page.update({ password: passwordHash })
            res.send(respOk);
        } else {
            res.send({ err: 'page alredy has password', ...respErr });
        }
    }
}

// 修改纸张密码
export async function modifyPassword(req, res) {
    const { seourl, oldPassword, newPassword } = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send({ err: 'not exist, edit befere created', ...respErr });
    } else {
        if (compareHash(oldPassword, page.password)) {
            const passwordHash = hashDigest(newPassword)
            page.update({ password: passwordHash })
            res.send(respOk);
        } else {
            res.send({ err: 'primay password not valid', ...respErr });
        }
    }
}

// 移除纸张密码
export async function removePassword(req, res) {
    const { seourl, oldPassword } = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send({ err: 'not exist, edit befere created', ...respErr });
    } else {
        if (page.password === null || compareHash(oldPassword, page.password)) {
            page.update({ password: null })
            res.send(respOk);
        } else {
            res.send({ err: 'primay password not valid', ...respErr });
        }
    }
}