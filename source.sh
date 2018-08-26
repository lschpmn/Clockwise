#!/usr/bin/env bash

export host=http://localhost:5000;
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )";
PATH=$DIR/node_modules/.bin/:$PATH;
alias start="electron . & webpack-serve &"