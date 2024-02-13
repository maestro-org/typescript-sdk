import axios, { Axios } from 'axios';
import { AccountHistoryQueryParams, Configuration, MaestroClient } from './src';

const msApiKey = 'lXgVY5sQem12hj8q9N0wPnI3icckiX1Y';
const bfApiKey = 'preprodmZyqlcWFFR7s8sxiHsG6nOGyTVWnoqUG';

// const signedTx =
//     '84a70082825820c15655bed3b03851d89c204a2ab1680504251b6ff8e5de16b45cf50472bf6b8c00825820c15655bed3b03851d89c204a2ab1680504251b6ff8e5de16b45cf50472bf6b8c030183a300581d70a8ba4d8ab8d7f1f864a27a63dab1185cc47929dc3c3a34956d94628601821a0014faaaa1581ca15cd6051ea2fc92c034b0bb1d33f2b7ba7ac92277e6ee5c30ab19a4a15074657374696e676275726e332e61646101028201d8185822d8799f581cd161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aeff82581d60e98433a163ea7d30ed8816ad6a1e2605a083959253081a801e0bc31f1a01c9c38082583900d161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aea63c153fb3ea8a4ea4f165574ea91173756de0bf30222ca0e95a649a1a593817e8021a0007656b09a2581ca15cd6051ea2fc92c034b0bb1d33f2b7ba7ac92277e6ee5c30ab19a4a15074657374696e676275726e332e61646101581cab4e38cc1e95e42c6f6e56d8d4243731c483bb57e49da5047c38e9d8a15074657374696e676275726e332e616461200b5820be11a9c3b4eaf6c3e0300d9968dc37b480e41b34f941679d96b93711833655c00d838258201869215c2d9a86f283965879d3774522a5321df41ab07c7b9f190dc930a5fa8b068258201869215c2d9a86f283965879d3774522a5321df41ab07c7b9f190dc930a5fa8b078258203d19dd19be39db0f3a47ea7ea8760744711d8936985a4f61581405e119563ce10412838258201988e3a1a7226bdde369547743fb805c16537b7c6bef333c66efe709e2edd48a008258204fbdca960f1efae406bef7689caf0ec1301b972ffd44fc6eb004b61b46415c300182582074986c0aa82de6d75d7c4e9432b60cedec23b2f5ed00b9cb6b9b6ec3fc7ec75c01a30083825820e48411563c80dc9a0a02c2e3acde053bc4cfe475355a1ff2ef5ab4a7b80d9c9e5840b1f0b4b53a1f60ced21a44b23778bcc0e4adf5479e9543e283acc473d50b93deb5c0b71a1d65c3a94889208f2f11634b07b000fd988bcf34d682f41134e33f06825820aa8ce9e908f525c3b700a65669430ec68ca19615e7309e25bb6fa883964cfa9f5840a56a47c6acd72aa50c159420c039a29b8b78eb6d7a0b3ddefe5bd616e01aa8372c820598d96765b98dcaa54de77e8530bb120f441f310b0e8520625956a80708825820df79341dc79f2d15a9da6cc93c4dc23e6437b8a7c823ad6dab418fb53431fb295840e935e1a94ab0aade3d8726c7414fa31c04a6566f27a93356ddda38c934e26b0186015aabb3939b319fbe290cc15d79c3a02859af50c72e2ce18c4798967d6f0803800582840100d8799f581cd161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aeff821a001c2b321a1d2cb058840101d87a80821a001bb1561a1e2739aaf5f6';

export class FetcherClient {
    msAxios: Axios;

    bfAxios: Axios;

    constructor(network: 'mainnet' | 'preprod') {
        this.msAxios = axios.create({
            baseURL: `https://${network}.gomaestro-api.org/v1`,
            headers: {
                'api-key': msApiKey,
                'Content-Type': 'application/cbor',
            },
        });
        this.bfAxios = axios.create({
            baseURL: `https://cardano-${network}.blockfrost.io/api/v0`,
            headers: {
                project_id: bfApiKey,
                'Content-Type': 'application/cbor',
            },
        });
    }

    submitMsTx = async (txHex: string) => {
        const tx = Buffer.from(txHex, 'hex');
        const response = await this.msAxios.post(`/txmanager`, tx);
        return response.data;
    };

    submitBfTx = async (txHex: string) => {
        const tx = Buffer.from(txHex, 'hex');
        const response = await this.bfAxios.post(`/tx/submit`, tx);
        return response.data;
    };
}

const client = new MaestroClient(
    new Configuration({
        apiKey: msApiKey,
        network: 'Preprod',
    }),
);

client.accounts
    .accountHistory('stake_test1uqpe2p4cu4lp2zakdasnfuexf4gv8dcvu3xs2t6ysh8n3rczl7us0', {})
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
