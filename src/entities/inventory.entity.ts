import {Entity, OneToOne, Property} from "@mikro-orm/core";
import {Product} from "./product.entity";
import {BaseEntity} from "./base.entity";

@Entity()
export class Inventory extends BaseEntity{

    @OneToOne()
    product!: Product;

    @Property()
    units!: number;
}