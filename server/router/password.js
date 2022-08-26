import express from 'express'
import {initPassword, modifyPassword, removePassword} from '../service/password-service.js';

const router = express.Router();

// 添加密码
router.post('/password', async (req, res) => {
    res.send(await initPassword(req))
});

// 修改密码
router.put('/password', async (req, res) => {
    res.send(await modifyPassword(req))
});

// 移除密码
router.delete('/password', async (req, res) => {
    res.send(await removePassword(req))
});

export default router
