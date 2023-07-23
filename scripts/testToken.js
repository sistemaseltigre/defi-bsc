// 0xa1Ad7132c493aa058B85D41B5791EFA6a8FdcADE
const { ethers } = require("hardhat");

async function main() {
    // Replace with your contract address
    const CONTRACT_ADDRESS = "0xa1Ad7132c493aa058B85D41B5791EFA6a8FdcADE"; 
    
    // Get owner and other account
    const [owner, otherAccount] = await ethers.getSigners();
    
    // Get contract
    const MiToken = await ethers.getContractFactory("MiToken");
    const token = await MiToken.attach(CONTRACT_ADDRESS);

    // Mint tokens
    let tx = await token.mint(owner.address, 10000000000);
    await tx.wait();

    // Check balances
    let balance = await token.balanceOf(owner.address);
    console.log("Balance of owner", ethers.formatEther(balance));

    // Freeze account
    tx = await token.freeze(otherAccount.address);
    await tx.wait();

    // Try to send tokens from frozen account
    try {
        tx = await token.connect(otherAccount).transfer(owner.address, 10000000000); 
        await tx.wait();
    } catch (error) {
        console.log("Couldn't transfer from frozen account"); 
    }

    // Unfreeze account
    tx = await token.unfreeze(otherAccount.address);
    await tx.wait();

    // Burn from owner account
    tx = await token.connect(owner).burn(10000000000); 
    await tx.wait();

    // Check balances after burning
    balance = await token.balanceOf(owner.address);
    console.log("Balance of owner after burning", ethers.formatEther(balance));

}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });