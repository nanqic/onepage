import express from 'express'
import TempPage, { respErr, respOk } from '../model.js'
import { getPage, modifyPage } from '../PageService.js'

const router = express.Router();

router.head('/:seourl', async (req, res) => {
    const { seourl } = req.params

    const pageId = await TempPage.findOne({
        attributes: ['id'],
        where: { seourl }
    });
    if (pageId === null) {
        res.send(404);
    } else {
        res.send(200);
    }
})

router.get('/:seourl', async function (req, res) {
    getPage(req, res)
})

router.post('/:seourl', async function (req, res) {
    const { seourl } = req.params
    const { content } = req.body

    const [page, created] = await TempPage.findOrCreate({
        where: { seourl },
        defaults: {
            seourl, content
        }
    })
    if (created) {
        res.send(respOk);

    } else {
        res.send('already exist');
    }
})

router.put('/:seourl', async function (req, res) {
    modifyPage(req, res)
})

router.delete('/:seourl', async (req, res) => {
    const { seourl } = req.params
    const pageId = await TempPage.findOne({
        attributes: ['id'],
        where: { seourl }
    });
    if (pageId === null) {
        res.send('not exist');
    } else {
        await pageId.destroy()
        res.send(respOk);
    }
})
export default router