import TempPage from '../model/model.js'
import { compareHash } from '../utils.js'
import { respOk, respErr } from '../model/model.js'


/**
 * 获取页面头部信息 
 * @param {*} req 
 * @param {*} res 页面存在：return 200 ; 页面不存在： return 404
 */
export async function getPageHead(req, res) {
    const { seourl } = req.params

    const page = await TempPage.findOne({
        attributes: ['id'],
        where: { seourl }
    });
    if (page === null) {
        res.send(404);
    } else {
        res.send(200);
    }
}

/**
 * 获取纸张内容
 * @param {*} req 密码放在header
 * @param {*} res 
 */
export async function getPage(req, res) {
    const { seourl } = req.params
    const rawPassword = req.headers['x-password'] || ""
    const page = await TempPage.findOne({
        attributes: ['id', 'content', 'password'],
        where: { seourl }
    });

    if (page === null) {
        res.send(respErr);
    } else {
        const isValid = passValidate(rawPassword, page.password)
        if (isValid) {
            const { content } = page
            res.send({ content, ...respOk });
        } else {
            res.send({ code: -5, msg: 'require a valid password' });
        }
    }

}

/**
 *  添加一页纸
 * @param {*} req 纸张内容
 * @param {*} res 结果
 */
export async function createPage(req, res) {
    const { seourl } = req.params
    const { content } = req.body

    const [page, created] = await TempPage.findOrCreate({
        where: { seourl },
        defaults: {
            seourl, content
        }
    })

    if (created) {
        res.send({ respOk });
    } else {
        res.send('already exist');
    }
}

/**
 * 修改纸张内容
 * @param {*} req 如果有密码，放在header里
 * @param {*} res 
 */
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
        if (passValidate(rawPassword, page.password)) {
            const { content ,seourl:newSeourl} = req.body
            if (content.length>5000) {
                res.send(respErr)
                return;
            }
            await page.update({ content,seourl:newSeourl })
            res.send(respOk);
        } else {
            res.send({ code: -1, msg: "not allowed" });
        }
    }
}

/**
 * 销毁纸张
 * @param {*} req 如果有密码，放在header里
 * @param {*} res 
 */
export async function desdroyPage(req, res) {
    const { seourl } = req.params
    const rawPassword = req.headers['x-password'] || ""

    const page = await TempPage.findOne({
        attributes: ['id', 'password'],
        where: { seourl }
    });
    if (page === null) {
        res.send({ err: 'not exist', ...respErr });
    } else {
        if (passValidate(rawPassword, page.password)) {
            await page.destroy()
            res.send(respOk);
        } else {
            res.send(respErr);
        }
    }
}

// 验证纸张密码
function passValidate(rawPassword, passwordHash) {
    if (passwordHash === null) {
        return true
    }
    return compareHash(rawPassword, passwordHash)
}