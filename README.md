# solana-spl-register-tool
STEPS:
1. Run ```npm i @metaplex-foundation/mpl-token-metadata @solana/web3.js @project-serum/anchor``` from the solana-spl-register-tool folder.
2. Replace ```const myKeypair = loadWalletKey()``` and ```const mint = new web3.PublicKey()``` in **create.ts** and **update.ts**
3. Replace name, symbol, and token image URI in **create.ts** and **update.ts**

```const dataV2 = {
        name: "",
        symbol: "",
        uri: "",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }```
