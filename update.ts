import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';

export function loadWalletKey(keypairFile:string): web3.Keypair {
    const fs = require("fs");
    const loaded = web3.Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
  }


async function main(){
    console.log("updating tokens");
    const myKeypair = loadWalletKey("tokenWallet.json");
    const mint = new web3.PublicKey("MECHjowzMbzBy9KkkACqMn45WX41HCvmN6sWNPPQvKn");
    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes());
    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);
    const accounts = {
        metadata: metadataPDA,
        mint,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }
    const dataV2 = {
        name: "THE MECHANICS",
        symbol: "$MECH",
        uri: "https://cdn.discordapp.com/attachments/1035037599280156733/1056078703119044740/MECH_1.png",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }
        const args =  {
            updateMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true,
                updateAuthority: myKeypair.publicKey,
                primarySaleHappened: true
                
            }
            
        };
      
    
    const ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)
    
    const tx = new web3.Transaction();
    tx.add(ix);
    const connection = new web3.Connection("https://api.mainnet-beta.solana.com");
    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);
    console.log(txid);
    console.log("token updated")

}

main();