import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {Inventory} from "./inventory.entity";

@Entity()
export class Product extends BaseEntity{

    @Property()
    name!: string;

    @Property()
    image!: string;

    @Property()
    price!: number;

    @Property()
    priceId!: string;

    @Property({ type: 'text' })
    description!: string;

    @Property({default:0})
    inventory!: number;

}