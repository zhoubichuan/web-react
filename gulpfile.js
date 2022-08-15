const gulp = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const fs = require('fs-extra')
const path = require('path')
const getLessConfig = require('./lessConfig')
const lessConfig = getLessConfig()
const antPrefixLessConfig = getLessConfig({ isAntPrefix: true })

// 是否编译 commonjs
const isCommonJS = process.argv[3] === '--cjs'
const folderName = isCommonJS ? 'lib' : 'esm'

const paths = {
  buildStyles: `${folderName}/styles`,
  js: 'src/**/!(*.test).+(tsx|js|ts)',
  less: 'src/**/!(*.module).less',
  fullLess: `${folderName}/styles/index.less`,
  types: 'types/**/!(*.test).+(tsx|js|ts)',
  changelog: 'CHANGELOG.md',
  changelogDest: 'docs/'
}

/**
 * 创建待编译的 less 文件
 * 1. 包含 core + 所有组件样式的完整 less
 * 2. 只包含所有组件样式的 less
 * 3. 只包含自己编写的组件 less
 */
const createLessFile = cb => {
  const cwd = process.cwd()
  const componentsPath = path.resolve(cwd, 'src')
  let fullLess = '@import "antd/lib/style/core/index.less";\n'
  let compatComponentLess = ''

  fs.ensureDirSync(paths.buildStyles)

  fs.readdir(componentsPath, (err, files) => {
    files.forEach(file => {
      if (fs.existsSync(path.resolve(folderName, file, 'style.less'))) {
        fullLess += `@import "../${file}/style.less";\n`
      }

      if (fs.existsSync(path.resolve(folderName, file, 'override.less'))) {
        compatComponentLess += `@import "../${file}/override.less";\n`
      }
    })
    // 不用modifyVars的方式，直接引入样式变量文件覆盖主题，这样可以给外面用，外面可以再覆盖一层
    fullLess += `@import "../styles/theme.less";\n`
    compatComponentLess += `@import "../styles/theme.less";\n`
    fs.writeFileSync(path.resolve(cwd, paths.fullLess), fullLess)

    cb()
  })
}

const pipeToDest = instance => instance.pipe(gulp.dest(folderName))

gulp.task('js', () => {
  const params = isCommonJS
    ? {
        overrides: [
          {
            plugins: ['@babel/plugin-transform-modules-commonjs']
          }
        ]
      }
    : {}

  return pipeToDest(
    gulp.src(paths.js).pipe(babel({ envName: 'production', ...params }))
  )
})

gulp.task('fullLess', () => {
  return gulp
    .src(paths.fullLess, { allowEmpty: true })
    .pipe(less(lessConfig))
    .pipe(gulp.dest(paths.buildStyles))
})

gulp.task('handleTs', () => {
  return pipeToDest(gulp.src(paths.types))
})

gulp.task('copyChangelog', () => {
  return gulp.src(paths.changelog).pipe(gulp.dest(paths.changelogDest))
})

gulp.task('copyLess', () => {
  return pipeToDest(gulp.src(paths.less))
})

module.exports = {
  build: gulp.series(
    'copyLess',
    createLessFile,
    gulp.parallel('js', 'handleTs', 'fullLess', 'copyChangelog')
  )
}
