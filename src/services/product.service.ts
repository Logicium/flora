import {Injectable} from "@nestjs/common";
import {Product} from "../entities/product.entity";
import {Collection, MikroORM} from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import {Order} from "../entities/order.entity";

@Injectable()
export class ProductService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async addSampleProducts(){
        const product = new Product();
        product.name = 'Lavender Sendoffs';
        product.description = 'Lavender has been used for centuries to promoted calm before a journey.';
        product.price = 4;
        product.image = './src/images/image1.jpg'
        // first mark the entity with `persist()`, then `flush()`
        await this.orm.schema.refreshDatabase();
        await this.em.persistAndFlush(product);
        // after the entity is flushed, it becomes managed, and has the PK available
        console.log('user id is:', product.id);
    }

    async getProducts(){
        const allProducts = await this.em.find(Product, {});
        await this.em.flush();
        //console.log(allProducts);
        return allProducts;
    }

    async getProduct(id:number){
        const product = await this.em.findOne(Product, {id:id});
        await this.em.flush();
        console.log(product);
        return product;
    }

    async linkProducts(order:Order,products){
        const productList= order.products;
        for (const product of products) {
            const productEntity = await this.em.findOne(Product,{priceId:product.price.id});
            productList.add(productEntity);
        }
        await this.em.flush();
        return productList;
    }
}