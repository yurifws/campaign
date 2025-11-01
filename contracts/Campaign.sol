pragma solidity ^0.8.19;

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribution;
    address[] public approvers;

    constructor(uint _minimum) {
        manager = msg.sender;
        minimumContribution = _minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers.push(msg.sender);
    }
}