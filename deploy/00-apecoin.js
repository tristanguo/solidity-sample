module.exports = async (hre) => {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  await deployments.deploy("ApeCoin", {
    from: deployer,
    args: [],
    log: true,
  });
};

module.exports.tags = ["all", "apecoin"];
