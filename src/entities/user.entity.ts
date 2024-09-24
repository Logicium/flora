import {Collection, Entity, Hidden, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {Order} from "./order.entity";

@Entity()
export class User extends BaseEntity{

    @Property()
    email!: string;

    @Property({ hidden: true })
    password!: string & Hidden;

    @Property({nullable:true})
    phone!: string;

    @Property({default:false})
    smsAlerts!: boolean;

    @Property({default:false})
    emailAlerts!: boolean;

    @OneToMany( 'Order','user')
    orders= new Collection<Order>(this);

    @Property({default: '' })
    sFirstName!: string;

    @Property({default: '' })
    sLastName!: string;

    @Property({ default: '' })
    sAddress1!: string;

    @Property({ default: '' })
    sAddress2!: string;

    @Property({ default: '' })
    sCity!: string;

    @Property({ default: '' })
    sState!: string;

    @Property({ default: '' })
    sZip!: string;

    @Property({default: '' })
    bFirstName!: string;

    @Property({default: '' })
    bLastName!: string;

    @Property({ default: '' })
    bAddress1!: string;

    @Property({ default: '' })
    bAddress2!: string;

    @Property({ default: '' })
    bCity!: string;

    @Property({ default: '' })
    bState!: string;

    @Property({ default: '' })
    bZip!: string;

}