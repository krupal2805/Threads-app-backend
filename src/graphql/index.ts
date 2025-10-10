import { ApolloServer } from '@apollo/server';
import {User} from './user/index.js'

async function createAppoloGraphqlServer() {
    const gqlServer = new ApolloServer({
            typeDefs: User.typeDefs,
            resolvers: {
                Query : User.queries,
                Mutation : User.mutations
            }
        })
    
        await gqlServer.start();

        return gqlServer;
}

export default createAppoloGraphqlServer;