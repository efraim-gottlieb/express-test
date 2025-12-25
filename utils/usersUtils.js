import jsonHandler from "../utils/jsonHandeling.js";
const usersFile = "data/users.json";

export async function readUsers() {
  const users = jsonHandler.read(usersFile);
  return users;
}

export async function writeUsers(users) {
  await jsonHandler.write(usersFile, users);
}

export async function validateUser(username, password) {
  const users = await readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
}
