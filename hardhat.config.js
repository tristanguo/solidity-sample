require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

module.exports = {
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  solidity: "0.8.17",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    buyer: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
