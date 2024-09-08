import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, Property} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {Product} from "./product.entity";
import {User} from "./user.entity";

@Entity()
export class Order extends BaseEntity{

    @ManyToMany( () => Product )
    products = new Collection<Product>(this);

    @ManyToOne()
    user!: User;

    @Property()
    total!: number;

    @Property({ type: 'text' })
    status!: string;

    @Property()
    createdOn = new Date();

}