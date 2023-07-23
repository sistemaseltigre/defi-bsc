const hre = require("hardhat"); 



async function main() {

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  // TokenLock contract 
  const tokenLockAddress = "0x0ef23D636c4fAE3102b66e2975F616b14E21Fc21";
  const tokenLockContract = await hre.ethers.getContractAt("TokenLock", tokenLockAddress);

  // ERC20 Token
  const tokenAddress = "0xa1Ad7132c493aa058B85D41B5791EFA6a8FdcADE"; 
  const tokenContract = await hre.ethers.getContractAt("IERC20", tokenAddress);


  const [signer] = await hre.ethers.getSigners();

  // Amount and unlock time
  const amount = hre.ethers.parseEther("1000"); 

  // Approve tokens
  let tx = await tokenContract.connect(signer).approve(tokenLockAddress, amount);
  await tx.wait();

  // Lock tokens 
  tx = await tokenLockContract.connect(signer).lock(amount, unlockTime);
  await tx.wait();

  console.log("Tokens locked!");
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });