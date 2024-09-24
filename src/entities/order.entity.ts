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

    @Property({nullable:true})
    total!: number;

    @Property({ default: 'IN PROGRESS' })
    status!: string;

    @Property({ defaultRaw: 'now' })
    createdOn!: Date;

    @Property({nullable:true})
    paymentMethod!: {};

    @Property({nullable:true})
    lineItems!: [];

    @Property({nullable:true})
    sessionId!: string;

    @Property({nullable:true})
    paymentId!: string;

    @Property({nullable:true})
    shippingCost!: number;

    @Property({nullable:true})
    shippingMethod!: {};

    @Property({nullable:true})
    receiptUrl!: string;

    @Property({nullable:true})
    shippingInfo!: {};

    @Property({nullable:true})
    billingInfo!: {};

}