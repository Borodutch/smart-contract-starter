import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import hre from 'hardhat'

const name = 'MyERC721'
const symbol = 'TOKEN'

async function deploy() {
  const [ownerClient] = await hre.viem.getWalletClients()
  const myToken = await hre.viem.deployContract('MyERC721', [
    name,
    symbol,
    ownerClient.account.address,
  ])
  return { myToken }
}

describe('MyERC721 contract tests', () => {
  describe('Constructor', function () {
    it('should deploy the contract with the correct fields', async function () {
      const { myToken } = await loadFixture(deploy)

      const contractName = await myToken.read.name()
      const contractSymbol = await myToken.read.symbol()

      expect(contractName).to.equal(name)
      expect(contractSymbol).to.equal(symbol)
    })
  })
})
