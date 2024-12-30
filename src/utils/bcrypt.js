import bcrypt from "bcrypt";

export const hashValue = async (val, saltRounds = 10) =>
  bcrypt.hash(val, saltRounds);

export const compareValue = async (val, hashedValue) =>
  bcrypt.compare(val, hashedValue).catch(() => false);
