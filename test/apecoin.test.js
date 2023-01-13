const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { expect } = require("chai");

describe("main", async () => {
  let apeCoin;
  let deployer, buyer;

  beforeEach(async () => {
    const d = await deployments.fixture("apecoin");
    ({ deployer, buyer } = await getNamedAccounts());
    apeCoin = new ethers.Contract(d.ApeCoin.address, d.ApeCoin.abi, await ethers.getSigner(deployer));
  });

  it("name is correct", async () => {
    const name = await apeCoin.name();
    expect(name).to.equal("ApeCoin");
  });

  it("totol supply", async () => {
    const totalSupply = await apeCoin.totalSupply();
    expect(parseInt(totalSupply)).to.equal(21000000);
  });

  it("buy with 1 ether", async () => {
    const tx = await apeCoin.buy({ value: ethers.utils.parseEther("1") });
    await tx.wait(1);
  });

  it("buy less than 1 ether", async () => {
    await expect(apeCoin.buy({ value: ethers.utils.parseEther("0.9") })).to.be.reverted;
  });

  describe("buy", async () => {
    let apeCoinWithBuyer;

    beforeEach(async () => {
      apeCoinWithBuyer = await apeCoin.connect(await ethers.getSigner(buyer));
      await apeCoinWithBuyer.buy({ value: ethers.utils.parseEther("1") });
    });

    it("buyer balance", async () => {
      const balance = await ethers.provider.getBalance(apeCoin.address);
      expect(ethers.utils.formatEther(balance)).to.equal("1.0");
      const tokenBalance = await apeCoin.balanceOf(buyer);
      expect(parseInt(tokenBalance)).to.equal(1000);
    });

    it("withdraw", async () => {
      const oldEtherBalance = await ethers.provider.getBalance(deployer);
      await apeCoin.withdraw();
      const newEtherBalance = await ethers.provider.getBalance(deployer);
      expect(parseInt(oldEtherBalance) < parseInt(newEtherBalance)).to.be.true;
    });
  });
});
