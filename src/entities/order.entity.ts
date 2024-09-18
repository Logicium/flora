import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, Property} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {Product} from "./product.entity";
import {User} from "./user.entity";

@Entity()
export class Order extends BaseEntity{

    @ManyToMany( () => Product )
    products = new Collection<Product>(this);

    @ManyToOne({nullable:true})
    user!: User;

    @Property()
    total!: number;

    @Property({ default: 'IN PROGRESS' })
    status!: string;

    @Property({ defaultRaw: 'now' })
    createdOn!: Date;

}