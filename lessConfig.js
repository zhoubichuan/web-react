<<<<<<< HEAD
const { resolve } = require('path')

/**
 * isAntPrefix: 是否使用 ant 命名空间
 */
module.exports = ({ isAntPrefix = false } = {}) => {
  return {
    javascriptEnabled: true,
    paths: [resolve(__dirname, 'node_modules')],
    modifyVars: {
      '@ant-prefix': isAntPrefix ? 'ant' : 'webreactui'
    }
  }
}
=======
const { resolve } = require('path')

/**
 * isAntPrefix: 是否使用 ant 命名空间
 */
module.exports = ({ isAntPrefix = false } = {}) => {
  return {
    javascriptEnabled: true,
    paths: [resolve(__dirname, 'node_modules')],
    modifyVars: {
      '@ant-prefix': isAntPrefix ? 'ant' : 'web-react'
    }
  }
}
>>>>>>> 18484ad57336613bd0f695500934895e2dca2d4e
