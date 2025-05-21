import { formatEther } from 'viem'
import hre, { run } from 'hardhat'

async function main() {
  // Get private key from env or hardhat config
  const [
    {
      account: { address: ownerAddress },
    },
  ] = await hre.viem.getWalletClients()
  // Create clients
  const publicClient = await hre.viem.getPublicClient()
  // Get network
  console.log('Deploying to chain:', await publicClient.getChainId())
  // Print account info
  const balance = await publicClient.getBalance({
    address: ownerAddress,
  })
  console.log('Deploying contracts with the account:', ownerAddress)
  console.log('Account balance:', formatEther(balance))
  // Deploy contract
  const contractName = 'MyERC721'
  const contractSymbol = 'MYERC721'
  console.log(`Deploying ${contractName}...`)
  // Deploy the contract
  const contract = await hre.viem.deployContract(contractName, [
    contractName,
    contractSymbol,
    ownerAddress,
  ])
  // Print transaction details
  console.log(`${contractName} deployed to ${contract.address}`)
  // Wait for the chain to update
  console.log('Wait for 1 minute to make sure blockchain is updated')
  await new Promise((resolve) => setTimeout(resolve, 60 * 1000))
  // Try to verify the contract on Etherscan
  console.log('Verifying contract on Etherscan')
  try {
    await run('verify:verify', {
      address: contract.address,
      constructorArguments: [contractName, contractSymbol, ownerAddress],
    })
  } catch (err) {
    console.log(
      'Error verifying contract on Etherscan:',
      err instanceof Error ? err.message : err
    )
  }

  // Print out the information
  console.log(`${contractName} deployed and verified on Etherscan!`)
  console.log('Contract address:', contract.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
