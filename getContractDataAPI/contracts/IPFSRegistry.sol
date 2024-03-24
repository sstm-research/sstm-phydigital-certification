// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSRegistry {
    // A structure to hold arrays of two types of CIDs: .json and .pdf
    struct FileCIDs {
        string[] jsonCIDs;
        string[] pdfCIDs;
    }

    // Mapping from address to FileCIDs, allowing for multiple CIDs of each type
    mapping(address => FileCIDs) private _addressToFileCIDs;

    // Events that are emitted when a CID is added
    event JsonCIDAdded(address indexed addr, string cid);
    event PdfCIDAdded(address indexed addr, string cid);

    // Events for when a CID is removed
    event JsonCIDRemoved(address indexed addr, string cid);
    event PdfCIDRemoved(address indexed addr, string cid);

    // Adds a .json CID for the sender's address
    function addMyJsonCID(string calldata cid, address _sender) public {
        _addressToFileCIDs[_sender].jsonCIDs.push(cid);
        emit JsonCIDAdded(_sender, cid);
    }

    // Adds a .pdf CID for the sender's address
    function addMyPdfCID(string calldata cid, address _sender) public {
        _addressToFileCIDs[_sender].pdfCIDs.push(cid);
        emit PdfCIDAdded(_sender, cid);
    }

    // Optional: Implement remove functions for Json and Pdf CIDs
    // Note: Removing an element from an array requires shifting elements

    // Retrieves the .json CIDs associated with an address. Returns an empty array if none are set.
    function getJsonCIDs(address addr) public view returns (string[] memory) {
        return _addressToFileCIDs[addr].jsonCIDs;
    }

    // Retrieves the .pdf CIDs associated with an address. Returns an empty array if none are set.
    function getPdfCIDs(address addr) public view returns (string[] memory) {
        return _addressToFileCIDs[addr].pdfCIDs;
    }
}
