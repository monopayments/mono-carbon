const { utils } = require("ethers");
const hre = require("hardhat");

async function main() {
    const BytecodeGenFactory = await ethers.getContractFactory("bytecodeGen");
    const bytecodeGenFactory = await BytecodeGenFactory.deploy();

    await bytecodeGenFactory.deployed();

    console.log("BytecodeGenFactory contract: " + bytecodeGenFactory.address);

    const bytecode = await bytecodeGenFactory.bytecode();

    const keccakver = utils.keccak256(bytecode)
    console.log(keccakver)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});