const hre = require("hardhat");

async function main() {
    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    const uniswapV2Factory = await UniswapV2Factory.deploy("0xf1b6dFf81D71018837863A90531BcF9b3Df0000c");

    await uniswapV2Factory.deployed();

    console.log("UniswapV2Factory contract: " + uniswapV2Factory.address);

    uniswapV2Factory.createPair('0x08a978a0399465621e667C49CD54CC874DC064Eb');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
