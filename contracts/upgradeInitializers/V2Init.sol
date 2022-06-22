// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import "../libraries/LibDiamondStorage.sol";


// It is expected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init funciton if you need to.

contract V2Init {    

    // You can add parameters to this function in order to pass in 
    // data to set your own state variables
    function initV1(uint256 _nextVar) external {
       LibDiamondStorage.AppStorage storage s = LibDiamondStorage.diamondStorage();
        s.secondVar = _nextVar;
  }


}