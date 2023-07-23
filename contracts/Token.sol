// SPDX-License-Identifier: MIT
// 0xbd2518dbb401170EB022474944CE979083eEE7Cd
// 0x10caB9aF770099155E98d137CE7e4DFe288ee703
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract MiToken is ERC20, Ownable {

  constructor() ERC20("Watermelon", "WTL") {
      _mint(msg.sender, 1000000 * (10 ** decimals()));
  }

  function mint(address to, uint256 amount) public onlyOwner {
      _mint(to, amount);
  }

  function burn(uint256 amount) public {
      _burn(msg.sender, amount);
  }

  mapping(address => bool) public frozenAccount;
  
  function freeze(address account) public onlyOwner {
    frozenAccount[account] = true;
  }
  
  function unfreeze(address account) public onlyOwner {
    frozenAccount[account] = false;
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
    require(!frozenAccount[from], "Account is frozen");
    super._beforeTokenTransfer(from, to, amount);
  }

}