# 2.打包
npm run src:build

# 3.进入打包目录
cd dist

git remote add gitee https://gitee.com/zhoubichuan/web-react.git
git init
git checkout --orphan gh-pages
git add .
git commit -m 'gh-pages'
git push -f gitee gh-pages

cd -