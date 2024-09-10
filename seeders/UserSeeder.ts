import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../src/entities/user.entity";
import {ProductSeeder} from "./ProductSeeder";

export class UserSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        const user = em.create(User,{
            firstName: 'Kisora',
            lastName: 'Thomas',
            email: 'kisora@florashop.com',
            password:'admin'
        });
    }

}