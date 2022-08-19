import { compareHash, hashDigest } from "../utils.js";
import assert from 'assert'

// 密码校验工具测试
describe('hashDigest', () => {
    it('should return true', () => {
        const result = compareHash("123", hashDigest("123"))
        assert.equal(result, true)
    })
})
