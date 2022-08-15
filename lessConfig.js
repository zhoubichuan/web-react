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