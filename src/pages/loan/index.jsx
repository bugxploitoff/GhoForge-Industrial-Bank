import React, { useState } from 'react'
import Web3 from 'web3';

// Import the ABI and contract address
import contractABI from '../../../public/abi.json';
import { ethers } from 'ethers';

const index = () => {
  const [delegatee, setDelegatee] = useState('');
  const [button, setButton] = useState('Approve and Delegate');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [delegatees, setDelegatees] = useState('');
  const [amount, setAmount] = useState('');

  // Function to handle the approval and delegation
  const handleApproveDelegation = async () => {
    try {
      // Connect to the user's Ethereum provider (MetaMask, etc.)
      const web3 = new Web3(window.ethereum);

      // Get the user's accounts
      const accounts = await web3.eth.requestAccounts();

      // Create a contract instance
      const contract = new web3.eth.Contract(contractABI, '0xb4C28fD11E7339BdF791A0F3E2e248Baee94b851');

      // Call the Solidity function (adjust the function name and parameters accordingly)
      await contract.methods.approveDelegation(delegatee, amount).send({ from: accounts[0] });
      await contract.methods.approve(delegatee, amount).send({ from: delegatees });
    } catch (error) {
      alert('Error:', error.message);
    }
  };
  const  handleBorrowDelegation = async () => {
    setButton("Processing");
    setButtonDisabled(true);
    const abiFilePath = '/abi.json';
        const response = await fetch(abiFilePath);
        const abi = await response.json();

      
        // Connect to the Polygon Mumbai testnet
        const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPCURL || "");
      
        // Replace with the address of your deployed contract on Mumbai testnet
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT || "";
      
        // Replace with your private key or use Metamask to sign transactions
        const privateKey = process.env.NEXT_PUBLIC_PRIVATEKEY || "";
      
        // Create a signer using the private key
        const signer = new ethers.Wallet(privateKey, provider);
      
        // Create a contract instance
        const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const deploymentTx = await contract.borrowFromDelegator(delegatees,delegatee,amount);
      const receipt = await deploymentTx.wait();
      if(receipt.status === 1){
        alert("success");
        setButton("Completed")
        setButtonDisabled(false)
      }else{
        alert("Unable to perform");
        setButton("error")
        setButtonDisabled(false)
      }
      
  } catch (error) {
      // Display error alert
      alert('Error: ' + error.message);
  }
  
  };

  return (
    <div class="h-screen py-16 bg-gradient-to-br from-green-50 to-cyan-100">  
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="mb-12 space-y-2 text-center">
          <span class="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600">P2P</span>
          <h2 class="text-2xl text-cyan-900 font-bold md:text-4xl">Delegtee / Borrowing</h2>
          <p class="lg:w-6/12 lg:mx-auto">Approve your delegtee and borrowing system</p>
        </div>
  

<div class="grid gap-12 lg:grid-cols-2">
<form class="bg-white p-8 shadow-md rounded-md max-w-md mx-auto">
    <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">Approve Delegate</h2>

    <div class="mb-6">
        <label for="delegatee" class="block text-sm font-medium text-gray-600">Your Address:</label>
        <input
            type="text"
            id="delegatee"
            value={delegatees}
            onChange={(e) => setDelegatees(e.target.value)}
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter delegatee address"
        />
    </div>

    <div class="mb-6">
        <label for="delegatee" class="block text-sm font-medium text-gray-600">Delegatee Address:</label>
        <input
            type="text"
            id="delegatee"
            value={delegatee}
            onChange={(e) => setDelegatee(e.target.value)}
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter delegatee address"
        />
    </div>

    <div class="mb-6">
        <label for="amount" class="block text-sm font-medium text-gray-600">Amount:</label>
        <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
        />
    </div>

    <button
        type="button"
        onClick={handleApproveDelegation}
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
    >
        Approve and Delegate
    </button>
</form>

    <form class="bg-white p-6 shadow-md rounded-md">
        <h2 class="text-2xl font-semibold mb-4">Borrow from delegtee</h2>
       
       
    <div class="mb-6">
        <label for="delegatee" class="block text-sm font-medium text-gray-600">Your Address:</label>
        <input
            type="text"
            id="delegatee"
            value={delegatees}
            onChange={(e) => setDelegatees(e.target.value)}
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter delegatee address"
        />
    </div>

    <div class="mb-6">
        <label for="delegatee" class="block text-sm font-medium text-gray-600">Delegatee Address:</label>
        <input
            type="text"
            id="delegatee"
            value={delegatee}
            onChange={(e) => setDelegatee(e.target.value)}
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter delegatee address"
        />
    </div>

    <div class="mb-6">
        <label for="amount" class="block text-sm font-medium text-gray-600">Amount:</label>
        <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
        />
    </div>

    <button
        type="button"
        disabled={isButtonDisabled}
        onClick={handleBorrowDelegation}
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
    >
        {button}
    </button>
    </form>
</div>

          </div>
         
  </div>
  )
}

export default index