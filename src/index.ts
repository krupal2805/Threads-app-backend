import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import {prismaClient} from './lib/db.js'

async function init() {
    const app = express()

    const PORT = 8000

    app.use(express.json());
    app.use(cors());

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello : String
                say(name : String) : String
            }
            
            type Mutation {
                createUser(firstName: String!,lastName: String!,email: String!,password: String!) : Boolean
            }
        `,
        resolvers: {
            Query : {
                hello : () => 'Hey there i am graphql server',
                say : (_,{name}:{name : String}) => `Hey ${name} how are you ?`  
            },
            Mutation : {
                createUser : async (_,{firstName,lastName,email,password}:{firstName:string;lastName:string;email:string;password:string}) => {
                    await prismaClient.user.create({
                        data : {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt : 'random_salt'
                        }
                    })
                    return true;
                }

            }
        }
    })

    await gqlServer.start();

    app.get('/', (req, res) => {
        res.json({ message: "server is running" });
    }) 

    app.use('/graphql',expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
}

init();