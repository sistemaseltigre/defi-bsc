const hre = require("hardhat"); 

async function main() {

    const tokenLockAddress = "0x0ef23D636c4fAE3102b66e2975F616b14E21Fc21";
    const tokenLock = await hre.ethers.getContractAt("TokenLock", tokenLockAddress);

    const [signer] = await hre.ethers.getSigners();

  console.log("Withdrawing funds...");

  const tx = await tokenLock.connect(signer).withdraw();
  await tx.wait();

  console.log("Funds withdrawn!");
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });