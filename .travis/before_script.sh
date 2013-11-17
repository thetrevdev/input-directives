
[  "$TRAVIS_PULL_REQUEST" != "false" ] || [  "$TRAVIS_BRANCH" != "develop" ] && echo -e "\n" && exit 0

#
# Authentication
#
echo -e ">>> (thetrevdev@gmail.com) authentication!\n"

git remote set-url origin $REPO.git
git config --global user.email "thetrevdev@gmail.com"
git config --global user.name "TheTrevDev (via TravisCI)"

if [ -z "$id_rsa_{1..6}" ]; then echo 'No $id_rsa_{1..6} found !' ; exit 1; fi

echo -n $id_rsa_{1..6} >> ~/.ssh/travis_rsa_64
base64 --decode --ignore-garbage ~/.ssh/travis_rsa_64 > ~/.ssh/id_rsa

chmod 600 ~/.ssh/id_rsa

echo -e ">>> Copy config"
mv -fv bower_components/angular-ui-docs/.travis/ssh-config ~/.ssh/config

echo -e ">>> Hi github.com !"
ssh -T git@github.com

if [ $? -eq 255 ]; then echo '>>> Authentication Fail ! $?'; exit 3; fi

echo -e "\n"