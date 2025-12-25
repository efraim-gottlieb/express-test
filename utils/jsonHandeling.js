import fs from 'fs/promises'

async function read(path) {
  const data = await fs.readFile(path, 'utf-8')
  return JSON.parse(data);
}

async function write(path, data) {
  await fs.writeFile(path, JSON.stringify(data), null, 2);
  return true;
}

export default { read, write };
