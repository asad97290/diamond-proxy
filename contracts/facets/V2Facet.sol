// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import  "../libraries/LibDiamondStorage.sol";
contract V2Facet {
    
    function func2() external view returns(uint256) {
        LibDiamondStorage.AppStorage storage s = LibDiamondStorage.diamondStorage();
        return s.secondVar + s.lastVar;
    }
}