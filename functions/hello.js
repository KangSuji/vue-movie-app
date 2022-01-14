exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'suji',
      age: 20,
      email: 'suji@naver.com'
    })
  }
}