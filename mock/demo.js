const faker = require('faker')

const testData = () => ({
  name: faker.random.word(),
  description: faker.random.words(20),
})

const getDemo = (req, res) =>
  res.status(200).json({
    code: '200',
    msg: '成功',
    data: testData(),
  })

const getHttpError = (req, res) => res.status(500).json()

const getError = (req, res) =>
  res.status(200).json({
    code: 'error',
    message: '获取业务数据失败',
  })

module.exports = {
  'GET /demo': getDemo,
  'GET /http-error': getHttpError,
  'GET /error': getError,
}
