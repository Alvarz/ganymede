/** @module services/validationService */
/**
 * validate the data.
 * @param {object} _body - the request body
 * @return {object}.
 */
module.exports.validateSearchOrder = (_body) => {
  let body = JSON.parse(_body)

  for (let el in body) {
    console.log(typeof el)
    console.log(el)
  }
}
