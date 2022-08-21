import express from 'express'
import { initPassword, modifyPassword, removePassword } from '../service/password-service.js';

const router = express.Router();

// 添加密码
router.post('/', (req, res) => {
    initPassword(req, res)
});

// 修改密码
router.put('/', (req, res) => {
    modifyPassword(req, res)
});

// 移除密码
router.delete('/', (req, res) => {
    removePassword(req, res)
});

export default router
