import * as bcrypt from 'bcryptjs';

export async function hashedPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10)
  return hash;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<Boolean> {
  const compare = await bcrypt.compare(password, hashedPassword)
  return compare;
}