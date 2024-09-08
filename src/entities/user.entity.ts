import {Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {Order} from "./order.entity";

@Entity()
export class User extends BaseEntity{

    @Property()
    firstName!: string;

    @Property()
    lastName!: string;

    @Property()
    phone!: string;

    @Property()
    email!: string;

    @Property()
    password!: string;

    @Property()
    smsAlerts!: boolean;

    @Property()
    emailAlerts!: boolean;

    @OneToMany( 'Order','user')
    orders= new Collection<Order>(this);

    @Property()
    sAddress1!: string;

    @Property()
    sAddress2!: string;

    @Property()
    sCity!: string;

    @Property()
    sState!: string;

    @Property()
    sZip!: string;

    @Property()
    bAddress1!: string;

    @Property()
    bAddress2!: string;

    @Property()
    bCity!: string;

    @Property()
    bState!: string;

    @Property()
    bZip!: string;

}