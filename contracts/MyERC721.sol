// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721 is ERC721, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter public tokenId;

  constructor(string memory tokenName, string memory tokenSymbol)
    ERC721(tokenName, tokenSymbol)
  {}

  function mint() external {
    uint256 _tokenId = tokenId.current();
    _safeMint(msg.sender, _tokenId);
    tokenId.increment();
  }

  function _beforeTokenTransfer(
    address _from,
    address _to,
    uint256 _tokenId
  ) internal override(ERC721) {
    super._beforeTokenTransfer(_from, _to, _tokenId);
  }

  function supportsInterface(bytes4 _interfaceId)
    public
    view
    override(ERC721)
    returns (bool)
  {
    return super.supportsInterface(_interfaceId);
  }
}
