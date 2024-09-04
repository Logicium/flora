import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Order {

    @PrimaryKey()
    id!: number;

    @Property()
    products!: [];

    @Property()
    userId!: number;

    @Property()
    total!: number;

    @Property({ type: 'text' })
    status!: string;



}