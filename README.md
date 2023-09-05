<p align="center">
  <a href="https://www.gomaestro.org/">
    <img src="https://www.gomaestro.org/logos/LandingLogos/DarkLogo.svg" alt="Maestro Logo" width="425" />
  </a>
  <h2 align="center">TypeScript SDK for the <a href="https://www.gomaestro.org/">Maestro</a> Dapp Platform</h2>
  <p align="center">
    <a href="https://docs.gomaestro.org/docs/intro">
      <img src="https://img.shields.io/badge/-Docs-blue?style=flat-square&logo=semantic-scholar&logoColor=white" />
    </a>
    <a href="https://github.com/maestro-org/typescript-sdk/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/maestro-org/typescript-sdk?style=flat-square&label=License" />
    </a>
    <a href="./CONTRIBUTING.md">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
    </a>
    <a href="https://twitter.com/GoMaestroOrg">
      <img src="https://img.shields.io/badge/-%40GoMaestroOrg-F3F1EF?style=flat-square&logo=twitter&logoColor=1D9BF0" />
    </a>
    <a href="https://discord.gg/ES2rDhBJt3">
      <img src="https://img.shields.io/badge/-Discord-414EEC?style=flat-square&logo=discord&logoColor=white" />
    </a>
    <a href="https://www.npmjs.com/package/@maestro-org/typescript-sdk">
      <img src="https://img.shields.io/npm/dm/typescript-sdk?style=flat-square&logo=npm&labelColor=black&color=pink&link=https%3A%2F%2F" />
    </a>
  </p>
</p>

# Getting Started

## Installation

### [NPM](https://www.npmjs.com/package/@maestro-org/typescript-sdk)
```bash
npm i @maestro-org/typescript-sdk
```

## Usage

```ts
import { MaestroClient, Configuration } from "@maestro-org/typescript-sdk";

let maestroClient = new MaestroClient(
  new Configuration({
    apiKey: "<PROJECT_API_KEY>",
    network: "Preprod",
  })
);
```
* To generate an API key, create a free account [here](https://dashboard.gomaestro.org/)!
* Network options: `Preview`, `Preprod`, `Mainnet`, `Sanchonet`

## Example

```ts
import { MaestroClient, Configuration } from "@maestro-org/typescript-sdk";

let maestroClient = new MaestroClient(
  new Configuration({
    apiKey: "<PROJECT_API_KEY>",
    network: "Preprod",
  })
);

maestroClient.addresses
  .utxosByAddress(
    "aasdddr_test1qqe9k9zmswzx9h9vaaf49shun82t8nr52h0ptpgumzxjjqm6wlgjpw0gdtwuwwydhwcm6g6sfy9h69q2kg6q8p3jxdxsrrxrdm"
  )
  .then((x) => console.log(x.data))
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  });
maestroClient.addresses
  .utxosByAddresses([
    "addr_test1qqe9k9zmswzx9h9vaaf49shun82t8nr52h0ptpgumzxjjqm6wlgjpw0gdtwuwwydhwcm6g6sfy9h69q2kg6q8p3jxdxsrrxrdm",
  ])
  .then((x) => console.log(x.data));

```

# Documentation

* [Maestro public docs](https://docs.gomaestro.org/)

# Contributing

Meastro welcomes all contributors! Please see our [contributing guidelines](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md).
