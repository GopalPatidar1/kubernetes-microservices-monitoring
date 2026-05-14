import bcrypt from "bcryptjs";

export const hashPassword = async () => {
  return bcrypt.hash("microservice-password", 10);
};
