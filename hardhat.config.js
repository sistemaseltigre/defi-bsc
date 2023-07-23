require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


const QUICKNODE_RPC = process.env.QUICKNODE_RPC;
const mnemonic = process.env.MNEMONIC.trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "testnet",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    testnet: {
      url: QUICKNODE_RPC,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic:mnemonic}
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 2000000,
  },
};
