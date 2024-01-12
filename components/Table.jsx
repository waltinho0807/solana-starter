import Image from "next/image"
import palmeiras from "../public/i.png"
import botafogo from "../public/botafogo.jpeg"
import { useState } from "react"






export default function Table ({buyer,itemId, orderId}) {
  const order = {buyer: "dsihfaiofhisadfhsdf8af", orderID: "orderknkdlnvz", itemId: "1"}

  const [paid, setPaid] = useState(null)

  const processTransactionTest = async () => {
    setLoading(true);
    const txResponse = await fetch("../api/createTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buyer, orderId, itemId),
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

  const [inputDataOne, setInputDataOne] = useState(0);
  const [inputDataTwo, setInputDataTwo] = useState(0);

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

  return(
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
  {paid == true ? <button type="submit" >Submit</button> : <button type="submit" onClick={processTransactionTest}  className=" btn btn-primary">Create ticket</button>}
  </form>
</div>
  )
}