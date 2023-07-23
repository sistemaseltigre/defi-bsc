//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenLock {
  uint256 INTEREST_RATE = 5; // 5%  
  uint256 SECONDS_IN_YEAR = 31536000; // 365 * 24 * 60
  IERC20 public token;

  struct LockInfo {
    uint256 amount;
    uint256 unlockTime;
  }

  mapping(address => LockInfo[]) public lockInfo;

  constructor(address _token) {
    token = IERC20(_token); 
  }

  function lock(uint256 _amount, uint256 _unlockTime) public {
    
    // Get token balance of msg.sender 
    uint256 balance = token.balanceOf(msg.sender);

    require(_amount <= balance, "Insufficient balance");

    lockInfo[msg.sender].push(
      LockInfo(_amount, _unlockTime)
    );

    // Transfer tokens from caller 
    token.transferFrom(msg.sender, address(this), _amount);
  }

  function withdraw() public {

    
    
    LockInfo[] storage userLockInfo = lockInfo[msg.sender];

    

    for(uint i = 0; i < userLockInfo.length; i++) {
      LockInfo storage info = userLockInfo[i];
      
      if(block.timestamp >= info.unlockTime) {
        
        uint timeLocked = block.timestamp - info.unlockTime;
        
        uint interest = info.amount * timeLocked * (INTEREST_RATE / 100) / SECONDS_IN_YEAR;

        token.transfer(msg.sender, (info.amount + interest) );
        info.amount = 0;
      }
    }
    }
}