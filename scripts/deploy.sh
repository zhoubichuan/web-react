# 1.发布到master分支
git add -A
git commit -m 'master'
git pull gitee master
git push gitee master
# 2.打包
npm run src:build

# 3.进入打包目录
cd dist

# 4.发布到gh-pages分支
git init
git checkout --orphan gh-pages
git add .
git commit -m 'gh-pages'
git remote add gitee https://gitee.com/zhoubichuan/web-react.git
git push -f gitee gh-pages

cd -

set -e
shopt -s extglob

TEMP_PATH="docs/.temp"

# build docs
npm run build

# prepare deploy
rm -rf $TEMP_PATH
mkdir $TEMP_PATH
cd $TEMP_PATH
git init
git pull https://github.com/zhoubichuan/web-react.git gh-pages
cp -r ../../dist/* .

# commit and push changes
git add -A
git commit --am -m "build: deploy documentation"
git push -f https://github.com/zhoubichuan/web-react.git master:gh-pages

## clean
cd
rm -rf $TEMP_PATH