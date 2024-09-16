import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../src/entities/user.entity";
import * as bcrypt from "bcrypt";

export class UserSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        const saltOrRounds = 10;
        const password = 'admin'
        const hash = await bcrypt.hash(password, saltOrRounds)
        const user = em.create(User,{
            email: 'kisora@florashop.com',
            password:hash
        });
    }

}