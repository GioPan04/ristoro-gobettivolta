#!/bin/bash

cd backend
echo "Installing dependences..."
npm install

printf "\nRunning setup...\n"

node tools/setup.js