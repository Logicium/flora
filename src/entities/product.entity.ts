import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";

@Entity()
export class Product extends BaseEntity{

    @Property()
    name!: string;

    @Property()
    image!: string;

    @Property()
    price!: number;

    @Property({ type: 'text' })
    desc1!: string;

    @Property({ type: 'text' })
    desc2!: string;


}