import {Seeder} from "@mikro-orm/seeder";
import type {Dictionary, EntityManager} from "@mikro-orm/core";
import {User} from "../src/entities/user.entity";
import data from "../data/data";
import {Product} from "../src/entities/product.entity";
import {Inventory} from "../src/entities/inventory.entity";
export class ProductSeeder extends Seeder {

    async run(em: EntityManager, context:Dictionary): Promise<void> {

        for (const product in data.products){
            em.create(Product, data.products[product] as Product);
        }

        await em.flush();

    }

}