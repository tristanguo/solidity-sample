// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.17;

contract ApeCoin is ERC20, Ownable {
  uint256 private INITIAL_SUPPLY = 21000000;
  uint256 private MAX_FOR_SALE = 10000000;
  uint256 private SOLD = 0;
  uint256 private AMOUNT_FOR_ONE = 1000;

  constructor() ERC20("ApeCoin", "APE") {
    _mint(owner(), INITIAL_SUPPLY);
  }

  function buy() public payable {
    require(msg.value == 1 ether, "exactly 1 ether for buying tokens");
    require(SOLD <= MAX_FOR_SALE - AMOUNT_FOR_ONE, "not enough tokens for sale");
    _transfer(owner(), msg.sender, AMOUNT_FOR_ONE);
    SOLD = SOLD + AMOUNT_FOR_ONE;
  }

  function withdraw() public payable onlyOwner {
    (bool success, ) = payable(owner()).call{value: address(this).balance}("");
    require(success, "withdraw failed");
  }
}
