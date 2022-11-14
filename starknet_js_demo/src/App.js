import './App.css';
import { useState, useEffect } from "react"
import { connect } from "get-starknet"
import { Contract } from "starknet"
import { toBN } from "starknet/dist/utils/number"

import contractAbi from "./contract_abi.json"
import storageContractAbi from "./storage_abi.json"
import erc721ContractAbi from "./MahERC721_abi.json"

const abi = {};
abi.old = contractAbi;
abi.storage = storageContractAbi;
abi.erc721 = erc721ContractAbi;

const contractAddress = {};
contractAddress.old = "0x0704ed6b41f5d9dfdc5037c627d53ee52aef0675ed47ba59b57b8152c0144a9e";
contractAddress.storage = "0x016b9096eb5a4c9bf94463db3796163b7d081db55ea635cc061ef331e5bfded6";


function App() {
  const [provider, setProvider] = useState('')
  const [address, setAddress] = useState('')
  const [retrievedBalance, setRetrievedBalance] = useState('')
  const [retrievedStorageBalance, setRetrievedStorageBalance] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [input, setInput] = useState(0)


  const connectWallet = async() => {
    try{
      // connect the wallet
      const starknet = await connect()
      await starknet?.enable({ starknetVersion: "v4" })
      // set up the provider
      setProvider(starknet.account)
      // set wallet address
     setAddress(starknet.selectedAddress)
      // set connection flag
      setIsConnected(true)
      
    }
    catch(error){
      alert(error.message)
    }
  }

  const increaseBalanceFunction = async(which='old') => {
    try{
      // create a contract object based on the provider, address and abi
      const contract = new Contract(abi[which], contractAddress[which], provider)
      
      // call the increase_balance function
      await contract.increase_balance(13)
      
    }
    catch(error){
      alert(error.message)
    }
  }


  const setBalanceFunction = async(newBalance=1337, which='storage') => {
    try{
      // create a contract object based on the provider, address and abi
      const contract = new Contract(abi[which], contractAddress[which], provider)
      
      // call the set_balance function
      await contract.set_balance(newBalance)
      
    }
    catch(error){
      alert(error.message)
    }
  }

  const getBalanceFunction = async(which='old') => {
    try{
      // create a contract object based on the provider, address and abi
      const contract = new Contract(abi[which], contractAddress[which], provider)
      // call the function
      const _bal = await contract.get_balance()
      // decode the result
      const _decodedBalance = toBN(_bal.res, 16).toString()
      // display the result
      switch (which) {
        case 'storage' : { setRetrievedStorageBalance(_decodedBalance) }
        case 'old' : { setRetrievedBalance(_decodedBalance) }
      }
      
    }
    catch(error){
      alert(error.message)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
          <h1 className="title">
            Minimal Starknet JS DEMO
          </h1>
          {
            isConnected ?
            <button className="connect">{address.slice(0, 5)}...{address.slice(60)}</button> :
            <button className="connect" onClick={() => connectWallet()}>Connect wallet</button>
          }

          <p className="description">
            Using Starknet JS with a simple contract
          </p>

          <div className="grid">
            <div href="#" className="card">
              <h2>Use Alpha-goerli test net! &rarr;</h2>


              <div className="cardForm">
                {/* <input type="text" className="input" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /> */}

                <input type="submit" className="button" value="Add ETH  " onClick={() => increaseBalanceFunction()} />
              </div>

              <hr />

              {/* <p>Insert a wallet address, to retrieve its name.</p> */}
              <div className="cardForm">
               
                <input type="submit" className="button" value="Get Balance " onClick={() => getBalanceFunction()} />
              </div>
              <p>Balance: {retrievedBalance} ETH</p>
              <hr />

              <div className="cardForm">
               
                <input type="submit" className="button" value="Get Balance (Storage Contract) " onClick={() => getBalanceFunction('storage')} />
              </div>
              <p>Balance: {retrievedStorageBalance} ETH</p>
              <hr />

              <div>
                {/* <input type="textbox"  defaultValue="1337" onClick={(e) => setInput(e.value)} /> */}
                <input type="submit" className="button" value="Make It Rain " onClick={() => setBalanceFunction()} />
              </div>
              
            </div>
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
