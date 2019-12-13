#!/usr/bin/env bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "installing proper node.js version"
NODE_VERSION=8.12.0
npm config delete prefix
. ~/.bashrc
nvm install "$NODE_VERSION"
nvm alias node8 "$NODE_VERSION"


echo "upgrading cocoapods"
sudo gem uninstall cocoapods -ax
sudo gem install cocoapods -v 1.8.3

BRANCH="$APPCENTER_BRANCH"

echo "post-clone script done"
