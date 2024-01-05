class _Error extends Error{
    constructor(message, statusCode){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4)? "fail" : "Internal server error occur";
    }
}


module.exports = _Error