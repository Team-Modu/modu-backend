import { hash } from 'argon2';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { defaultValue } from './default';

export class CreateInitialUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('account')
      .values([
        {
          id: uuidv4(),
          userId: defaultValue.userId,
          hashedPassword: await hash(defaultValue.password),
          username: defaultValue.username,
          role: defaultValue.role,
        },
      ])
      .execute();
  }
}
