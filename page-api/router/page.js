import express from 'express'
import { getPage, modifyPage } from '../service/page-service.js'

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
    createPage(req, res)
})

// 修改一页纸
router.put('/:seourl', async function (req, res) {
    modifyPage(req, res)
})

// 销毁一页纸
router.delete('/:seourl', async (req, res) => {
    desdroyPage(req, res)
})
export default router
