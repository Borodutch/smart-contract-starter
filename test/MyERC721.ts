import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('MyERC721 contract tests', () => {
  before(async function () {
    const accounts = await ethers.getSigners()
    this.owner = accounts[0]
    this.factory = await ethers.getContractFactory('MyERC721')
  })

  describe('Constructor', function () {
    it('should deploy the contract with the correct fields', async function () {
      const name = 'MyERC721'
      const symbol = 'TOKEN'
      const contract = await this.factory.deploy(
        name,
        symbol,
        this.owner.address
      )
      expect(await contract.name()).to.equal(name)
      expect(await contract.symbol()).to.equal(symbol)
    })
  })
})
