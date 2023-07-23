const { ethers } = require("hardhat");

async function main() {
    // Get deployer address
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address); 
    
    // Get deployer balance before deployment
    const balanceBigNumber = await deployer.provider.getBalance(deployer.address);
    const balance = ethers.formatEther(balanceBigNumber);
    console.log("Account deployer balance: ", balance);
    
    // Deploy contract
    const MiToken = await ethers.getContractFactory("MiToken");
    const token = await MiToken.deploy();
    
    // Wait for contract to be deployed
    await token.waitForDeployment();
    
    // Get total supply
    const totalSupply = await token.totalSupply()

    // Print contract address and total supply
    console.log(
        `MyToken deployed to ${token.target} with an initialSupply ${ethers.formatEther(totalSupply)}`
    );

    // Get deployer balance after deployment
    const balanceBigNumberAfter = await deployer.provider.getBalance(deployer.address);
    const balanceAfter = ethers.formatEther(balanceBigNumberAfter);
    console.log("Account deployer balance after deploy: ", balanceAfter);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });