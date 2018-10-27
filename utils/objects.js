
/**
 * clean the object to be updated due model
 * @param {object} data .
 * @param {array} updateables .
 * @return {object} .
 */
const cleanObject = (data, updateable) => {
  let newObject = {}
  Object.keys(data).forEach((key) => {
    if (updateable.includes(key)) { newObject = Object.assign(newObject, { [key]: data[key] }) }
  })
  return newObject
}

module.exports.cleanObject = cleanObject
