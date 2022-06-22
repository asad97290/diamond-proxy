// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibDiamondStorage {
   
    bytes32 constant APP_STORAGE_POSITION = keccak256("com.akru.app");
    
    struct AppStorage {
        uint256 firstVar;
        uint256 secondVar;
        uint256 lastVar;
        mapping(bytes4 =>uint) das;
    }

    function diamondStorage() internal pure returns (AppStorage storage ds) {
        bytes32 position = APP_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
}