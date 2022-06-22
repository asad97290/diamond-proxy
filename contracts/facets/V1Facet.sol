// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import  "../libraries/LibDiamondStorage.sol";

contract V1Facet {

    function func1(uint256 _nextVar) external {
        LibDiamondStorage.AppStorage storage s = LibDiamondStorage.diamondStorage();
        s.firstVar = _nextVar * 2;
        s.lastVar = s.firstVar + _nextVar;
    }
}