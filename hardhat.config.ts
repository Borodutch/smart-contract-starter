import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-viem'

import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import { cleanEnv, str } from 'envalid'
import { generatePrivateKey } from 'viem/accounts'

dotenv.config()

const randomPrivateKey = generatePrivateKey()

const { CONTRACT_OWNER_PRIVATE_KEY, ETH_RPC, ETHERSCAN_API_KEY } = cleanEnv(
  process.env,
  {
    CONTRACT_OWNER_PRIVATE_KEY: str({
      default: randomPrivateKey,
    }),
    ETH_RPC: str({ default: '' }),
    ETHERSCAN_API_KEY: str({ default: '' }),
  }
)

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.30',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  networks: {
    deploy: {
      url: ETH_RPC,
      accounts: [CONTRACT_OWNER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

export default config
