#!/bin/bash

cd backend
echo "Installing dependences..."
npm install

echo "\nRunning setup...\n"

node tools/setup.js