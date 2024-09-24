import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, Property} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {Product} from "./product.entity";
import {User} from "./user.entity";
import Stripe from "stripe";

@Entity()
export class Order extends BaseEntity{

    @ManyToMany( () => Product )
    products = new Collection<Product>(this);

    @ManyToOne({nullable:true})
    user!: User;

    @Property({nullable:true})
    total!: number;

    @Property({nullable:true})
    subtotal!: number;

    @Property({ default: 'IN PROGRESS' })
    status!: string;

    @Property({ defaultRaw: 'now' })
    createdOn!: Date;

    @Property({type: 'json', nullable:true})
    paymentMethod!: {};

    @Property({nullable:true})
    tax!: number;

    @Property({type: 'json', nullable:true})
    lineItems!: Array<Stripe.LineItem>;

    @Property({nullable:true})
    sessionId!: string;

    @Property({nullable:true})
    paymentId!: string;

    @Property({nullable:true})
    shippingCost!: number;

    @Property({type: 'json',nullable:true})
    shippingMethod!: {};

    @Property({type: 'json',nullable:true})
    shippingInfo!: {};

    @Property({type: 'json',nullable:true})
    billingInfo!: {};

    @Property({nullable:true})
    receiptUrl!: string;
}