import React, { useState } from "react";
import { ethers, formatEther } from "ethers"; // FIXED: Import formatEther directly

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        accountChanged(accounts[0]);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Install MetaMask, please!!!");
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = async (accountAddress) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accountAddress, "latest"],
      });
      setUserBalance(formatEther(balance)); 
    } catch (error) {
      setErrorMessage("Failed to fetch balance");
    }
  };

  return (
    <div>
      <h1>MetaMask Wallet Connection</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <h3>Address: {defaultAccount || "Not connected"}</h3>
      <h3>Balance: {userBalance || "N/A"} ETH</h3>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
    
  );
};

export default MetaMask;
