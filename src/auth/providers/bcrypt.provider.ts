import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(password: string): Promise<string> {
    const SALT_OR_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_OR_ROUNDS);
    return bcrypt.hash(password, salt);
  }
  async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
