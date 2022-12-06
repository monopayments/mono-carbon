const hre = require("hardhat");

async function main() {
  const MonoCarbon = await ethers.getContractFactory("MonoCarbon");
  const monoCarbon = await MonoCarbon.deploy();

  await monoCarbon.deployed();

  console.log("MonoCarbon contract: " + monoCarbon.address);

  const Certificate = await ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();

  await certificate.deployed();

  console.log("Certificate contract: " + certificate.address);

  const CarbonMarket = await ethers.getContractFactory("CarbonMarket");
  const carbonMarket = await CarbonMarket.deploy(monoCarbon.address, certificate.address);

  await carbonMarket.deployed();

  console.log("CarbonMarket contract: " + carbonMarket.address);

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const uniswapV2Factory = await UniswapV2Factory.deploy(monoCarbon.address);

  await uniswapV2Factory.deployed();

  console.log("UniswapV2Factory contract: " + uniswapV2Factory.address);

  // uniswapV2Factory.createPair('0x82DCEC6aa3c8BFE2C96d40d8805EE0dA15708643');

  const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router02");
  const uniswapV2Router = await UniswapV2Router.deploy(uniswapV2Factory.address, "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7");

  await uniswapV2Router.deployed();

  console.log("UniswapV2Router contract: " + uniswapV2Router.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
