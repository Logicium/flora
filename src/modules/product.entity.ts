import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    image!: string;

    @Property()
    price!: number;

    @Property({ type: 'text' })
    desc = '';

}