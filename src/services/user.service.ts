import {Injectable} from "@nestjs/common";
import {Product} from "../entities/product.entity";
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import {User} from "../entities/user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    async getUsers(){
        const allUsers = await this.em.find(User, {},{populate:['orders','orders.products']});
        await this.em.flush();
        console.log(allUsers);
        return allUsers;
    }

    async getUserById(id:number){
        const user = await this.em.findOne(User, {id:id},{populate:['orders','orders.products']});
        await this.em.flush();
        console.log(user);
        return user;
    }

    async getUserByEmail(email:string){
        const user = await this.em.findOne(User, {email:email},{populate:['orders','orders.products']});
        await this.em.flush();
        console.log(user);
        return user;
    }

    async newUser(signupInfo:any){
        const saltOrRounds = 10;
        const password = signupInfo.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const user = this.em.create(User,{
            email: signupInfo.email,
            password:hash
        });
        return user;
    }

}