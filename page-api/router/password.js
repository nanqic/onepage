import express from 'express'
import { initPassword, modifyPassword } from '../PageService.js';

const router = express.Router();

// 添加密码
router.post('/', (req, res) => {
    initPassword(req, res)
});

// 修改密码
router.put('/', (req, res) => {
    modifyPassword(req, res)
});

export default router
