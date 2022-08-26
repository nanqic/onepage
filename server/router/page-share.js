import express from 'express'
import {getSharedPage} from "../service/page-share-service.js";

const router = express.Router();

// 获取分享链接的文本
router.get('/share/:url', async (req, res) => {
    res.send(await getSharedPage(req))
})

export default router