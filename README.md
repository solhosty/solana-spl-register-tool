# solana-spl-register-tool
STEPS:
1. Run ```npm i @metaplex-foundation/mpl-token-metadata @solana/web3.js @project-serum/anchor``` from the solana-spl-register-tool folder.
2. Replace ```const myKeypair = loadWalletKey()``` and ```const mint = new web3.PublicKey()``` in _create.ts_ and _update.ts_.
3. Replace name, symbol, and token image URI in _create.ts_ and _update.ts_.

     const dataV2 = {
        name: "",
        symbol: "",
        uri: "",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }
   
4. Once config is set, run ```ts-node create.ts``` or ```ts-node update.ts```

TIPS: 
- Make sure to have .json wallet of Public key that has mint authority on the token account is in the root folder. 
- Make sure there is sol in the public account, as the creation of it is usually .056 SOL. 
- Make sure the token address has a created token account.
- You cannot run update.ts unless you have first registered the token using create.ts.
- You can transfer token authority to another wallet from spl cli by running spl-token authorize <token> mint <new_wallet>
- **myKeypair** is the .json wallet (in root directory) that has token authority and **mint** is the token address.
