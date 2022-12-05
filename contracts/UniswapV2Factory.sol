// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './UniswapV2Pair.sol';
import './interfaces/IUniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public override feeTo;
    address public override feeToSetter;
    address public monocarbon;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    constructor(address _monocarbon) {
        feeToSetter = msg.sender;
        monocarbon = _monocarbon;
    }

    function allPairsLength() external view override returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA) external returns (address pair) {
        require(feeToSetter == msg.sender, "Only the owner can add pairs.");
        require(tokenA != monocarbon, "UniswapV2: IDENTICAL_ADDRESSES");
        // (address token0, address token1) = tokenA < monocarbon ? (tokenA, monocarbon) : (monocarbon, tokenA);
        require(tokenA != address(0), "UniswapV2: ZERO_ADDRESS");
        require(
            getPair[monocarbon][tokenA] == address(0),
            "UniswapV2: PAIR_EXISTS"
        ); // single check is sufficient
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(monocarbon, tokenA));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(monocarbon, tokenA);
        getPair[monocarbon][tokenA] = pair;
        getPair[tokenA][monocarbon] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(monocarbon, tokenA, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function createPair(
        address tokenA,
        address tokenB
    ) external override returns (address pair) {}
}
