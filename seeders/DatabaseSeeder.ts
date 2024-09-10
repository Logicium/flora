import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../src/entities/user.entity";
import {ProductSeeder} from "./ProductSeeder";
import {UserSeeder} from "./UserSeeder";

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    return this.call(em, [
      ProductSeeder,
        UserSeeder
    ]);

  }

}
