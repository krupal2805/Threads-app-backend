import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

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
        `,
        resolvers: {
            Query : {
                hello : () => 'Hey there i am graphql server',
                say : (_,{name}:{name : String}) => `Hey ${name} how are you ?`  
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