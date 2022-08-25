class BizResultCode {
    code;
    msg;
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
    static LIMIT_REACHED= new BizResultCode(601, 'page amount is reached limit');
    static NOT_CREATED= new BizResultCode(602, 'page not exist, you should create first.');
    static PW_ALREADY_HAS= new BizResultCode(603, 'page already has password.');
    static PW_NOT_VALETED= new BizResultCode(603, 'primary password not valid.');
}

export default BizResultCode