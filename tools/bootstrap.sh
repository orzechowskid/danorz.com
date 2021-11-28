#!/bin/bash -e

# assumes PWD is the repo root

function message {
    echo
    echo $'\e[1;34m'$1$'\e[0m'
    echo
}

message "running top-level npm install..."

npm install

message "bootstrapping local database..."
pushd ./tools > /dev/null
./bootstrap-localdb.sh > /dev/null
popd > /dev/null

message "configuring git hooks..."
cp tools/git-hooks/pre-commit .git/hooks

message "all done 🚀"
