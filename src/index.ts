export * from "./api";
export * from "./configuration";


/*
import { AddressesApi } from "./api";
import { Configuration } from "./configuration";

let addrApi = new AddressesApi(new Configuration({ apiKey: "<Your-API-Key>", network: "Preprod" }))
addrApi.utxosByAddress("aasdddr_test1qqe9k9zmswzx9h9vaaf49shun82t8nr52h0ptpgumzxjjqm6wlgjpw0gdtwuwwydhwcm6g6sfy9h69q2kg6q8p3jxdxsrrxrdm").then(x => console.log(x.data)).catch(error => {
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
    console.log('Error', error.message);
  }
});
addrApi.utxosByAddresses(["addr_test1qqe9k9zmswzx9h9vaaf49shun82t8nr52h0ptpgumzxjjqm6wlgjpw0gdtwuwwydhwcm6g6sfy9h69q2kg6q8p3jxdxsrrxrdm"]).then(x => console.log(x.data))
*/
