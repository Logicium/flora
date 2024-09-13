import {Injectable} from "@nestjs/common";
import {Product} from "../entities/product.entity";
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import {User} from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getUsers(){
        const allUsers = await this.em.find(User, {});
        await this.em.flush();
        console.log(allUsers);
        return allUsers;
    }

    async getUserById(id:number){
        const user = await this.em.findOne(User, {id:id});
        await this.em.flush();
        console.log(user);
        return user;
    }

    async getUserByEmail(email:string){
        const user = await this.em.findOne(User, {email:email});
        await this.em.flush();
        console.log(user);
        return user;
    }

}