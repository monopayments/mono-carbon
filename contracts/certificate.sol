// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificate is ERC1155, ERC1155Burnable{
    using Counters for Counters.Counter;
    
    address whitelistContract;
    address owner;
    mapping (address => bool) private whitelistedMap;
    mapping (uint256 => address) private tokenToOwner;
    mapping (uint256 => uint256) public tokenToValue;
    mapping (uint256 => bool) public retiredStatus;

    Counters.Counter public _tokenIds;

    event Whitelisted(address indexed account, bool isWhitelisted);

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner.");
        _;
    }
    
    modifier whiteListed(){
        require(whitelistedMap[msg.sender], "Only whitelisted.");
        _;
    }

    constructor() ERC1155(""){
        owner = msg.sender;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintCertificate(uint256 carbon) public whiteListed{
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId, 1, '');
        tokenToOwner[newItemId] = msg.sender;
        tokenToValue[newItemId] = carbon;

        _tokenIds.increment();
    }

    function retireCertificate(uint _id) public{
        retiredStatus[_id] = true;
    }

    function addAddressWl(address _address)
        public
        onlyOwner
    {
        require(whitelistedMap[_address] != true);
        whitelistedMap[_address] = true;
        emit Whitelisted(_address, true);
    }

    function removeAddressWl(address _address)
        public
        onlyOwner
    {
        require(whitelistedMap[_address] != false);
        whitelistedMap[_address] = false;
        emit Whitelisted(_address, false);
    }
}