const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert } = require("chai");
const { network, ethers, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name) ? describe.skip : describe("Basic NFT Unit Tests", function () {
    let basicNft, deployer

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["basicnft"])
        basicNft = await ethers.getContract("BasicNft")
    })

    describe("Constructor", () => {
        inputToConfig("Initialized the NFT Correctly.", async () => {
            const name = await basicNft.name()
            const symbol = await basicNft.symbol()
            const tokenCounter = await basicNft.getTokenCounter()
            assert.equal(name, "Dogie")
            assert.equal(symbol, "DOG")
            assert.equal(tokenCounter.toString(), "0")
        })
    })
})