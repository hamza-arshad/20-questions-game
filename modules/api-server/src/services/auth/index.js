const { v4: uuid } = require('uuid');
const { getToken, getBadRequestObject } = require('../../utils/helper');
const { ROLES, HASH_ROUNDS } = require('../../constants');
const bcrypt = require('bcrypt');

/**
 * Auth Service
 *
 */
const login = async (email, password, res) => {
  const { db: {
    models: {
      User,
    }
  }} = global;
  try {
    const user = await User.getUserByEmail(email)
    if (!user) {
      throw 'Credentials Not Valid';
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw 'Credentials Not Valid';
    }
    const token = getToken(user);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      permission: user.Role.name,
      token
    };
  } catch (err){
    throw getBadRequestObject(err);
  }
};

const register = async (name, email, password, logInAfter, role, res) => {
  const { db: {
    models: {
      Role,
      User
    }
  }} = global;
  try {
    const alreadyExist = await User.checkUserAlreadyExist({email});
    if(alreadyExist) {
      throw 'User with this email already exist';
    }

    if(!role) {
      role = ROLES.PLAYER;
    }

    const id = uuid()
    const encryptedPassword = await bcrypt.hash(password, HASH_ROUNDS);
    const dbRole = await Role.getByName(role)
    const newUser =  await User.createUser({
      id,
      name,
      email,
      password: encryptedPassword,
      role_id: dbRole.id,
    });

    // generating and returning token
    const user = await User.getUser(newUser.id);
    const token = getToken(user);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      permission: user.Role.name,
      token
    };
  } catch (err){
    throw getBadRequestObject(err);
  }
};

module.exports = { login, register };