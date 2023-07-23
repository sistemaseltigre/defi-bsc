const { ethers } = require("hardhat");

const tokenAddress = "0xa1Ad7132c493aa058B85D41B5791EFA6a8FdcADE"; // Dirección del token ERC20
const lockAddress = "0x0ef23D636c4fAE3102b66e2975F616b14E21Fc21"; // Dirección del contrato TokenLock

async function main() {

    const [wallet] = await ethers.getSigners(); // La wallet que despliega

    const amount = ethers.parseEther("1000"); // Cantidad a transferir

    // Obtener instancia del contrato Token
    const Token = await ethers.getContractFactory("MiToken"); 
    const token = await Token.attach(tokenAddress);

    // Transferir al contrato TokenLock
    await token.connect(wallet).transfer(lockAddress, amount);

    console.log("Tokens transferred to TokenLock contract");
  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });