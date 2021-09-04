# https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables
ls -la
npm run build
# $GIT set environment virable on REPO settings
git remote add url https://${GIT}@github.com/${TRAVIS_REPO_SLUG}
git checkout $TRAVIS_BRANCH
git add .
git commit -m "$TRAVIS_COMMIT_MESSAGE"
git push url $TRAVIS_BRANCH