module.exports = (fn) => (request, response, next) => {
  fn(request, response, next)
  .catch((error) => {
    console.log(error);
    response
    .status(500)
    .send(error.message);
  })
}