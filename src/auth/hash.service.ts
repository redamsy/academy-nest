import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async generateHash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async compareHash(tobeHashed: string, storedHash: string): Promise<boolean> {
    return compare(tobeHashed, storedHash);
  }
}
