import BaseResultCode from './BaseResultCode.js'

class JsonResult {
    code;
    msg;
    data;
    time;

    /**
     *
     * @param code {number} 返回code
     * @param msg {string} 返回消息
     * @param data {any} 返回具体对象
     */
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.time = Date.now();
    }

    /**
     * 成功
     * @param data {any} 返回对象
     * @return {JsonResult}
     */
    static success(data) {
        return new JsonResult(BaseResultCode.SUCCESS.code, BaseResultCode.SUCCESS.desc, data);
    }

    /**
     * 失败
     */
    static fail(errData) {
        return new JsonResult(BaseResultCode.FAILED.code, BaseResultCode.FAILED.desc, errData);
    }

    /**
     * 参数校验失败
     */
    static validateFailed(param) {
        return new JsonResult(BaseResultCode.VALIDATE_FAILED.code, BaseResultCode.VALIDATE_FAILED.desc, param);
    }

    /**
     * 参数校验失败
     */
    static notExist(param) {
        return new JsonResult(BaseResultCode.API_NOT_FOUNT.code, BaseResultCode.API_NOT_FOUNT.desc, param);
    }

    /**
     * 拦截到的业务异常
     * @param  {BizResultCode} 业务异常
     */
    static bizFail(bizException) {
        return new JsonResult(bizException.code, bizException.msg, null);
    }
}

export default JsonResult