#!/bin/bash -e

# assumes PWD is the repo root

function message {
    echo
    echo $'\e[1;34m'$1$'\e[0m'
    echo
}

message "running top-level npm install..."

npm install

for i in `find ./packages -mindepth 1 -maxdepth 1`; do
    message "running npm install in $i..."

    pushd $i > /dev/null
    npm install
    popd > /dev/null
done

message "bootstrapping local database..."
pushd ./tools > /dev/null
./bootstrap-localdb.sh > /dev/null
popd > /dev/null

message "configuring git hooks..."
cp tools/git-hooks/pre-commit .git/hooks

message "all done 🚀"
