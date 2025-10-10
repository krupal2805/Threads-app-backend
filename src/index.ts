import express from 'express'
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import createAppoloGraphqlServer from './graphql/index.js'

async function init() {
    const app = express();

    const PORT = 8000;

    app.use(express.json());
    app.use(cors());

    const gqlServer =  await createAppoloGraphqlServer();

    app.get('/', (req, res) => {
        res.json({ message: "server is running" });
    })

    app.use('/graphql',expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
}

init();