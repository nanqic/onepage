import TempPage from './model.js'
import { compareHash, hashDigest } from './utils.js'
import { respOk, respErr } from './model.js'


export async function getPage(req, res) {
    const { seourl } = req.params

    const rawPassword = req.headers['x-password'] || ""
    const page = await TempPage.findOne({
        attributes: ['content', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send(respErr);
    } else {
        if (page.password === null || compareHash(rawPassword, page.password)) {
            const { content } = page
            res.send({ ...respOk, content });
        } else {
            res.send({ code: -5, msg: 'require a valid password' });
        }
    }
}

export async function modifyPage(req, res) {
    const { seourl } = req.params
    const rawPassword = req.headers['x-password'] || ""

    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send({ code: -1, msg: "not exist" });
    } else {
        if (page.password === null || compareHash(rawPassword, page.password)) {
            const { content } = req.body
            await page.update({ content })
            res.send(respOk);
        } else {
            res.send({ code: -1, msg: "not allowed" });
        }
    }
}

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
            const hashPassword = hashDigest(newPassword)
            page.update({ password: hashPassword })
            res.send(respOk);
        } else {
            res.send('page alredy has password');
        }
    }
}

export async function modifyPassword(req, res) {
    const { seourl, oldPassword, newPassword } = req.body
    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send('not exist, edit befere created');
    } else {
        if (compareHash(oldPassword, page.password)) {
            const hashPassword = hashDigest(newPassword)
            page.update({ password: hashPassword })
            res.send(respOk);
        } else {
            res.send('primay password not valid');
        }
    }
}
