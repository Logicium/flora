import {MikroORM} from "@mikro-orm/sqlite";
export default async function connect(){
    const orm = await MikroORM.init();
    console.log(orm.em); // access EntityManager via `em` property
    console.log(orm.schema); // access SchemaGeneartor via `schema` property
    const em = orm.em.fork();
    return em;
}