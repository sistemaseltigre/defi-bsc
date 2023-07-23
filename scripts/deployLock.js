const { ethers } = require("hardhat");

async function main() {

    const TokenLock = await ethers.getContractFactory("TokenLock");
  
    // Only pass token address
    const tokenAddress = "0xa1Ad7132c493aa058B85D41B5791EFA6a8FdcADE";
  
    console.log("Deploying TokenLock...");
  
    const tokenLock = await TokenLock.deploy(tokenAddress);

    await tokenLock.waitForDeployment();

    console.log("TokenLock deployed to:", tokenLock.target);
  
  }

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });