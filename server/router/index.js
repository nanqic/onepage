import express from 'express'
import {getPageHead, getPage, getSharedPage, createPage, modifyPage, desdroyPage} from '../service/page-service.js'
import TempPage from "../model/TempPagel.js";
import JsonResult from "../model/JsonResult.js";
import BizResultCode from "../model/BizResultCode.js";
import logger from "../config/logger.js";

const router = express.Router();
// 获取头部信息
router.head('/:seourl', async (req, res) => {
    res.send(await getPageHead(req))
})

// 获取纸张内容
router.get('/:seourl', async function (req, res) {
    res.send(await getPage(req))
})

// 添加一页纸
router.post('/:seourl', async function (req, res) {
    const amount = await TempPage.count()
    if (amount > 300) {
        logger.error('Error: page amount is reached limit.')
        res.send(JsonResult.bizFail(BizResultCode.LIMIT_REACHED))
        return;
    }
    res.send(await createPage(req))
})

// 修改一页纸内容
router.put('/:seourl', async function (req, res) {
    res.send(await modifyPage(req))
})

// 销毁一页纸
router.delete('/:seourl', async (req, res) => {
    res.send(await desdroyPage(req))
})

// 获取分享链接的文本
router.get('/share/:sharedUrl', async (req, res) => {
    res.send(await getSharedPage(req))
})
export default router
