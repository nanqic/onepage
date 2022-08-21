import express from 'express'
import { getPageHead, getPage, createPage, modifyPage, desdroyPage } from '../service/page-service.js'
import TempPage from "../model/model.js";

const router = express.Router();

// 获取头部信息
router.head('/:seourl', async (req, res) => {
    getPageHead(req, res)
})

// 获取纸张内容
router.get('/:seourl', async function (req, res) {
    getPage(req, res)
})

// 添加一页纸
router.post('/:seourl', async function (req, res) {
    const amount = await TempPage.count()
    if (amount>300){
        res.send({err:'页面数量已达上限'})
        return;
    }
    createPage(req, res)
})

// 修改一页纸内容
router.put('/:seourl', async function (req, res) {
    modifyPage(req, res)
})

// 销毁一页纸
router.delete('/:seourl', async (req, res) => {
    desdroyPage(req, res)
})
export default router
