import {Entity, OneToOne, Property} from "@mikro-orm/core";
import {BaseEntity} from "./base.entity";
import {Product} from "./product.entity";
import {User} from "./user.entity";

@Entity()
export class Post extends BaseEntity{

    @Property()
    title!: string;

    @OneToOne()
    author!: User;

    @Property({ type: 'text' })
    desc1!: string;

    @Property({ type: 'text' })
    desc2!: string;

    @Property({ type: 'text' })
    body!: string;

    @Property()
    tags!: string;

    @Property()
    createdOn = new Date();

}

