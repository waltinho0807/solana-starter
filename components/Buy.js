import React, { useState, useMemo } from "react";
import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { InfinitySpin } from "react-loader-spinner";

export default function Buy() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [buyerAddress , setBuyerAddress] = useState(null)

    const itemID = 1

    const orderID = useMemo(() => Keypair.generate().publicKey, []);
    const [paid, setPaid] = useState(null);
    const [loading, setLoading] = useState(false);

    const order = useMemo(
        () => ({
          buyer: publicKey.toString(),
          orderID: orderID.toString(),
          itemID: itemID,
        }),
        [publicKey, orderID, itemID]
      );

      const processTransaction = async () => {
        setLoading(true);
        const txResponse = await fetch("../api/createTransaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        const txData = await txResponse.json();

        const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
        console.log("Tx data is", tx);

        try {
            // Envie a transação para a rede
            const txHash = await sendTransaction(tx, connection);
            console.log(`Transação enviada: https://solscan.io/tx/${txHash}?cluster=devnet`);
            // Mesmo que isso possa falhar, por ora, vamos apenas torná-lo realidade
            setPaid(true);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };

        if (!publicKey) {
            return (
              <div>
                <p>É necessário conectar sua carteira para realizar a transação</p>
              </div>
            );
          }
        
          if (loading) {
            return <InfinitySpin color="gray" />;
          }

          return (paid?<div><h1>Item comprado</h1></div>: 
          <div><button odisabled={loading} className="btn border-t-indigo-500" onClick={processTransaction}>Item comprado</button></div>)
        
}