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
            const hashPassword = hashDigest(newPassword)
            page.update({ password: hashPassword })
            res.send(respOk);
        } else {
            res.send('page alredy has password');
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