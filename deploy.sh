# Note that dist/ folder from github and local may differ since build is made through travis

# https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables
npm run build
# $GIT set environment virable on REPO settings
git remote add url https://${GIT}@github.com/${TRAVIS_REPO_SLUG}
git checkout $TRAVIS_BRANCH
git add .
git add --force dist/
git commit -m "$TRAVIS_COMMIT_MESSAGE"

git push url $TRAVIS_BRANCH