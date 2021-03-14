const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs/promises');
const crypto = require('crypto');

console.log("Ristoro Gobetti Volta - Setup");

function ask(question, defaultValue) {
  if(defaultValue)  question += `(${defaultValue}) `;
  return new Promise((resolve) => {
    readline.question(question, input => resolve(input || defaultValue));
  });
}

function generateKey(length) {
  return crypto.randomBytes(length || 4096).toString('base64');
}

async function saveConfig(conf) {
  let fileContent = '';
  for (const key in conf) {
    const elem = conf[key];
    fileContent += `${key}=${elem || ''}\n`;
  }
  await fs.writeFile('./.env', fileContent);
}

async function config() {
  let env = {
    DATABASE_HOST: "",
    DATABASE_PORT: "",
    DATABASE_USER: "",
    DATABASE_PASSWORD: "",
    DATABASE_NAME: "",
  
    JWT_KEY: "",
  }

  console.log("--Database configuration--");

  env.DATABASE_HOST = await ask('Host: ', '127.0.0.1');
  env.DATABASE_PORT = await ask('Port: ', '3306');
  env.DATABASE_NAME = await ask('Name: ', 'ristoro');
  env.DATABASE_USER = await ask('User: ', 'root');
  env.DATABASE_PASSWORD = await ask('Password: ', '');

  process.stdout.write('Generating jwt key... ');
  env.JWT_KEY = generateKey();
  process.stdout.write('Done!\n');
  
  console.log('Generated config: ');
  const output = {...env};
  output.JWT_KEY = '...';
  console.log(output);
  
  process.stdout.write('Saving to .env file... ');
  await saveConfig(env);
  process.stdout.write('Done!\n');

  console.log('🔥 Bam! You are good to go. Just run npm start and start selling your food 🔥');

  process.exit();
}

config();