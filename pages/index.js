import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';


import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { InfinitySpin } from "react-loader-spinner";
import Table from '../components/Table';

import palmeiras from "../public/i.png"
import botafogo from "../public/botafogo.jpeg"

const App = () => {
  
  const [walletAddress, setWalletAdress] = useState(null)
  const [inputDataOne, setInputDataOne] = useState(0);
  const [inputDataTwo, setInputDataTwo] = useState(0);       
  

  const checkIfWalletIsConnected = async () => {
    try {
      const {solana} = window;
      const response = await solana.connect({onlyIfTrusted: true})
      console.log(response.publicKey.toString())
      
      if(solana) {
        if(solana.isPhanton){
          console.log("encontrada carteira")
          const response = await solana.connect({onlyIfTrusted: true})
          console.log("conectado com" + response.publicKey.toString() )
          setWalletAdress(response.publicKey.toString())
        }
      }else {
        console.log('Objeto não encontrado')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    const { solana } = window;
    if(solana) {
      const response = await solana.connect()
      console.log("conectado com" + response.publicKey.toString() )
      setWalletAdress(response.publicKey.toString())
    }
  }

  const desconnectWallet = async () => {
    const { solana } = window;
    if(solana) {
      const response = await solana.disconnect()
      setWalletAdress(null)
      console.log("desconectar")
    }
  }

  const renderConnectionContainer = () => (
    <div className="navbar-end">
      <button onClick={desconnectWallet} className="btn btn-primary">Desconectar</button>
    </div>
  )

  const renderNotConnectionContainer = () => (
    <div className="navbar-end">
      <button onClick={connectWallet} className="btn btn-success">Conectar</button>
    </div>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener("load", onLoad)
    return () => window.removeEventListener("load", onload)
  }, [])

  //transação start
    
    const [paid, setPaid] = useState(null);
    const [loading, setLoading] = useState(false);
      
      const { connection } = useConnection();
      const { publicKey, sendTransaction } = useWallet();
      const orderID = useMemo(() => Keypair.generate().publicKey, []);

      const itemID = "1"
      
        const order = useMemo(
          () => ({
            buyer: walletAddress,
            orderID: orderID.toString(),
            itemID: itemID,
          }),
          [ walletAddress, orderID, itemID]
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
          createTicket()
        } catch (error) {
          console.error(error);
          console.log(order)
        } finally {
          setLoading(false);
        }
      };

      async function createTicket () {
    
        const response = await fetch("../api/data", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({inputDataOne, inputDataTwo}),
        })
    
        console.log(response.ok)
       }
    

      

      if (loading) {
        return <InfinitySpin color="gray" />;
      }

      

  return (
    
    <div>
      <div className="navbar bg-orange-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
         <a className="btn btn-ghost text-xl">SolanaBall</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        {!walletAddress && renderNotConnectionContainer()}
        {walletAddress && renderConnectionContainer()}
      </div> 

      <header>
        
      </header>

      <main>
      
        
        <div className='mt-10'>
          {paid ? (
            <h1>Item comprado</h1>
          ) : (
            <button disabled={loading} className="btn btn-primary" onClick={processTransaction}>
              Compre agora 
            </button>
          )}

          
        </div>
        <div className="overflow-x-auto">
      <form action="" method="post">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Casa</th>
        <th>Gols casa</th>
        <th>Gols fora</th>
        <th>Fora</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image
                  src={palmeiras}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Palmeiras</div>
            </div>
          </div>
        </td>
        <th>
          <label>
            <input type="number" className="checkbox-primary w-10" placeholder={0}/>
          </label>
        </th>
        <th>
          <label>
            <input type="number" className="checkbox-primary w-10" placeholder={0} />
          </label>
        </th>
        
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={botafogo}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Botafogo - RJ</div>
              
            </div>
          </div>
        </td>
      </tr>
      {/* row 2 */}
      <tr>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image
                  src={palmeiras}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Palmeiras</div>
            </div>
          </div>
        </td>
        <th>
          <label>
            <input
             type="number" className="checkbox-primary w-10" 
             onChange={(e) => setInputDataOne(e.target.value)}
             name="inputDataOne"
             value={inputDataOne} placeholder={0}/>
          </label>
        </th>
        <th>
          <label>
            <input 
             type="number" className="checkbox-primary w-10"
             value={inputDataTwo} placeholder={0}
             onChange={(e) => setInputDataTwo(e.target.value)}
             name="inputDataTwo"/>
             
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={botafogo}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Botafogo - RJ</div>
            </div>
          </div>
        </td>
      </tr>
      {/* row 3 */}
      <tr>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image
                  src={palmeiras}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Palmeiras</div>
            </div>
          </div>
        </td>
        <th>
          <label>
            <input type="number" className="checkbox-primary w-10" placeholder={0} />
          </label>
        </th>
        <th>
          <label>
            <input type="number" className="checkbox-primary w-10" placeholder={0} />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={botafogo}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Botafogo - RJ</div>
              
            </div>
          </div>
        </td>
      </tr>
      {/*line 4*/}
      <tr>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <Image
                  src={palmeiras}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Palmeiras</div>
            </div>
          </div>
        </td>
        <th>
          <label>
            <input type="number" className="checkbox-primary w-10" placeholder={0} />
          </label>
        </th>
        <th>
          <label>
            <input type="number" className="checkbox-primary w-10" placeholder={0} />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={botafogo}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold">Botafogo - RJ</div>
              
            </div>
          </div>
        </td>
      </tr>

    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
  {paid == true ? <button type="submit" >Submit</button> : <button type="submit" onClick={processTransaction}  className=" btn btn-primary">Create ticket</button>}
  </form>
</div>
      </main>    
    </div>
  );
};

export default App;