const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")


module.exports = async function (hre) {
    const { deployments, getNamedAccounts, network, ethers } = hre

    const BASE_FEE = ethers.utils.parseEther("0.25") 
    const GAS_PRICE_LINK = 1e9

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("local network detected! Deploying mocks...")
        // deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: []
        })
        log("Mocks Deployed!")
        log("---------------------------")
    }
}

module.exports.tags = ["all", "mocks"]