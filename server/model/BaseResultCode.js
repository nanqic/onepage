class BaseResultCode {
    code;
    desc;
    constructor(code, desc) {
        this.code = code;
        this.desc = desc;
    }

    /************************************/

    static SUCCESS = new BaseResultCode(200, 'success');
    static FAILED = new BaseResultCode(500, 'fail');
    static VALIDATE_FAILED = new BaseResultCode(400, 'validate failed');
    static API_NOT_FOUNT = new BaseResultCode(404, 'api not exist');
    static API_BUSY = new BaseResultCode(700, 'api busy')

}

 export default BaseResultCode