import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { usersCollection, sessionsCollection } from '../database/dabaseConection.js';

export const signUp = async (req, res) => {
const newUser = res.locals.user;
const passwordHash = bcrypt.hashSync(newUser.password, 10);

try {
await usersCollection.insertOne({ ...newUser, password: passwordHash });
res.status(201).send('Usuário cadastrado com sucesso');
} catch (error) {
console.error(error);
res.status(500).send('Deu um problema no servidor!');
}
};

export const signIn = async (req, res) => {
const user = res.locals.user;
const token = uuidV4();

try {
await sessionsCollection.insertOne({ userId: user._id, token });
res.send({ token });
} catch (error) {
console.error(error);
res.status(500).send('Deu problema no servidor');
}
};