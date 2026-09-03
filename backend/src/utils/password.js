import bcrypt from "bcrypt";

export const hashed_Password = (password) => {
  return bcrypt.hash(password, 10);
};

export const compare_Password = (password, hashed_Password) => {
  return bcrypt.compare(password, hashed_Password);
};
