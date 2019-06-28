
exports.titleIsArray = (payload) => {
  if (Array.isArray(payload)) {
    const title = payload.map(value => value)
    return {$in: title}
  } else return { $regex: payload, $options: 'i' }
}

exports.careerIsArray = (payload) => {
  if (Array.isArray(payload)) {
    const career = payload.map(value => value)
    return {$in: career}
  } else return {$in: payload}
}
