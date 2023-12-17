// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721 is ERC721, Ownable {
  uint256 public tokenId;

  constructor(
    string memory name,
    string memory symbol,
    address initialOwner
  ) ERC721(name, symbol) Ownable(initialOwner) {}

  function mint() external {
    uint256 _tokenId = tokenId;
    _safeMint(msg.sender, _tokenId);
    tokenId++;
  }
}
