import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';


import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { InfinitySpin } from "react-loader-spinner";
import Table from '../components/Table';

import brasileiro from "../public/logobrasileiro.jpg"
import palmeiras from "../public/palmeiras.png"
import flamengo from "../public/flamengo.png"
import vasco from "../public/vasco-da-gama.png"
import bahia from "../public/bahia.png"
import internacional from "../public/internacional.png"
import corinthians from "../public/corinthians.png"
import fluminense from "../public/fluminense.png"
import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"
//import botafogo from "../public/botafogo.png"






const App = () => {
  
  const [walletAddress, setWalletAdress] = useState(null)
  const [inputDataOne, setInputDataOne] = useState(0);
  const [inputDataTwo, setInputDataTwo] = useState(0);   
  const [inputDataThree, setInputDataThree] = useState(0);
  const [inputDataFour, setInputDataFour] = useState(0);
  const [inputDataFive, setInputDataFive] = useState(0);
  const [inputDataSix, setInputDataSix] = useState(0);
  const [inputDataSeven, setInputDataSeven] = useState(0);
  const [inputDataEight, setInputDataEight] = useState(0);    
  
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
    <>
    <div>
      <div className="navbar bg-orange-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a></a></li>
              <li>
              <a></a>
              <ul className="p-2">
                <li><a>Premier League</a></li>
                <li><a>La liga</a></li>
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
              <summary>Campeonatos</summary>
              <ul className="p-2">
                <li><a>Brasileiro</a></li>
                <li><a>Premier League</a></li>
                <li><a>La liga</a></li>
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
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
          <Image
                  src={brasileiro}
                  alt="Palmeiras"
                  width={400}
                  height={800}
                  className='max-w-sm rounded-lg shadow-2xl'
                  />
            
            <div>
              <h1 className="text-5xl font-bold">Campeonato Brasileiro</h1>
              <p className='py-6 text-2xl'><span className='font-bold'>Temporada:</span> 2024</p>
              <p className='py-6 text-2xl'><span className='font-bold'>Rodada:</span> 1</p>
              <p className="py-6">Se divirta com a gente!. De seu palpite e fature o prêmio, de seu palpite no placar dos seguintes jogos acertando você ganha uma bolada em USDC</p>
      
            </div>
          </div>
        </div>
      </header>

      <main>
      
        <div className="overflow-x-auto">
      
  <table className="table">
    {/* head */}
    <thead>
      
      <tr>
        <th className='text-xl'>Casa</th>
        <th className='text-xl'>Gols casa</th>
        <th className='text-xl'>Gols fora</th>
        <th className='text-xl'> Fora</th>
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
              <div className="font-bold text-2xl">Palmeiras</div>
            </div>
          </div>
        </td>
        <th>
          <label>
          <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataOne(e.target.value)}
             name="inputDataOne"
             value={inputDataOne} placeholder={0}/>
          </label>
        </th>
        <th>
          <label>
          <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataTwo(e.target.value)}
             name="inputDataOne"
             value={inputDataTwo} placeholder={0}/>
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
              <div className="font-bold text-2xl">Botafogo - RJ</div>
              
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
                  src={flamengo}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Flamengo</div>
            </div>
          </div>
        </td>
        <th>
          <label>
            <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataThree(e.target.value)}
             name="inputDataOne"
             value={inputDataThree} placeholder={0}/>
          </label>
        </th>
        <th>
          <label>
            <input 
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded"
             value={inputDataFour} placeholder={0}
             onChange={(e) => setInputDataFour(e.target.value)}
             name="inputDataTwo"/>
             
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={vasco}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Vasco</div>
            </div>
          </div>
        </td>
      </tr>
      {/* row 3 */}
      <tr>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12 ">
                <Image
                  src={bahia}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Bahia</div>
            </div>
          </div>
        </td>
        <th>
          <label>
          <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataFive(e.target.value)}
             name="inputDataOne"
             value={inputDataFive} placeholder={0}/>
          </label>
        </th>
        <th>
          <label>
          <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataSix(e.target.value)}
             name="inputDataOne"
             value={inputDataSix} placeholder={0}/>
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={internacional}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Internacional</div>
              
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
                  src={corinthians}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Corinthians</div>
            </div>
          </div>
        </td>
        <th>
          <label>
          <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataSeven(e.target.value)}
             name="inputDataOne"
             value={inputDataSeven} placeholder={0}/>
          </label>
        </th>
        <th>
          <label>
          <input
             type="number" className="checkbox-primary text-2xl w-12 h-8 rounded" 
             onChange={(e) => setInputDataEight(e.target.value)}
             name="inputDataOne"
             value={inputDataEight} placeholder={0}/>
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3 ml-20">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image
                  src={fluminense}
                  alt="Palmeiras"
                  width={40}
                  height={40}
                  />
              </div>
            </div>
            <div>
              <div className="font-bold text-2xl">Fluminense</div>
              
            </div>
          </div>
        </td>
      </tr>

    </tbody>
  </table>
  <div className='px-4 py-5 flex flex-col items-center'>
    <button type="submit" onClick={processTransaction}  className=" btn btn-primary mb-10 mt-5 ml-5 w-80 h-15">Create ticket</button>
  </div>
   
  
</div>
      </main> 
      <div className="flex gap-5">
        <h3 className='font-bold text-2xl ml-20 mb-5'>Final da rodada em:</h3>
  <div>
    <span className="countdown font-mono text-4xl">
        <span style={{"--value":15}}></span>
    </span>
    days
  </div> 
  <div>
    <span className="countdown font-mono text-4xl">
        <span style={{"--value":10}}></span>
    </span>
    hours
  </div> 
  <div>
    <span className="countdown font-mono text-4xl">
      <span style={{"--value":24}}></span>
    </span>
    min
  </div> 
  <div>
    <span className="countdown font-mono text-4xl">
      <span style={{"--value":6}}></span>
    </span>
    sec
  </div>
  <h3 className='font-bold text-2xl ml-20 mb-5'>Prêmio acumulado em:<span> 500.00 USDC</span></h3>
</div>
      
    </div>
    
    </>
  );
};

export default App;