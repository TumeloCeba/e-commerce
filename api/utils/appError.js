class AppError extends Error {
  constructor(message, statusCode) {
 //   console.log('r');
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);

    //console.log(this.isOperational);
  }
}

module.exports = AppError;
