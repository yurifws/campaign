pragma solidity ^0.8.19;

contract Campaign {
    address public manager;
    uint public minimumContribution;

    constructor(uint _minimum) {
        manager = msg.sender;
        minimumContribution = _minimum;
    }
}