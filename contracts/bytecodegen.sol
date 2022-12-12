pragma solidity =0.5.16;

import './UniswapV2Pair.sol';

contract bytecodeGen {
    bytes public bytecode = type(UniswapV2Pair).creationCode;

}