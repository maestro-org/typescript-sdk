import { MaestroClient, Configuration } from '../dist';

let maestroClient = new MaestroClient(
    new Configuration({
        apiKey: '<PROJECT_API_KEY>',
        network: 'Preprod',
    }),
);

maestroClient.blocks.blockLatest().then((x) => console.log(x.data));
