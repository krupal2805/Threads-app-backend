export const typeDefs = `#graphql
    type Query {
        hello : String
        say(name : String) : String
    }
                
    type Mutation {
        createUser(firstName: String!,lastName: String!,email: String!,password: String!) : Boolean
    }
`