import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../src/entities/user.entity";

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    const user = em.create(User, {
      firstName: 'Kisora Thomas',
      email: 'kisora@florashop.com'
    });

  }

}
