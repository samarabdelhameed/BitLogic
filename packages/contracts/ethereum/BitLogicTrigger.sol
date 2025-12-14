// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BitLogicTrigger
 * @dev Cross-chain trigger contract for BitLogic escrow releases
 * This contract is called when a Bitcoin escrow is released to mint NFTs or execute actions
 */
contract BitLogicTrigger is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;

    // Events
    event EscrowReleased(
        bytes32 indexed escrowId,
        address indexed beneficiary,
        uint256 amount,
        uint256 timestamp
    );
    
    event NFTMinted(
        bytes32 indexed escrowId,
        address indexed recipient,
        uint256 tokenId,
        string tokenURI
    );
    
    event ActionExecuted(
        bytes32 indexed escrowId,
        string actionType,
        bytes data
    );

    // Structs
    struct EscrowRecord {
        bytes32 escrowId;
        address beneficiary;
        uint256 amount;
        uint256 releasedAt;
        uint256 tokenId;
        bool executed;
    }

    // State
    mapping(bytes32 => EscrowRecord) public escrowRecords;
    mapping(address => bytes32[]) public userEscrows;
    
    // Authorized relayers that can trigger cross-chain actions
    mapping(address => bool) public authorizedRelayers;

    // Modifiers
    modifier onlyAuthorizedRelayer() {
        require(authorizedRelayers[msg.sender] || msg.sender == owner(), "Not authorized relayer");
        _;
    }

    constructor() ERC721("BitLogic Escrow NFT", "BLNFT") {
        // Owner is automatically an authorized relayer
        authorizedRelayers[msg.sender] = true;
    }

    /**
     * @dev Add an authorized relayer
     */
    function addRelayer(address relayer) external onlyOwner {
        authorizedRelayers[relayer] = true;
    }

    /**
     * @dev Remove an authorized relayer
     */
    function removeRelayer(address relayer) external onlyOwner {
        authorizedRelayers[relayer] = false;
    }

    /**
     * @dev Called when a Bitcoin escrow is released
     * Mints an NFT as proof of the escrow completion
     */
    function onEscrowReleased(
        bytes32 escrowId,
        address beneficiary,
        uint256 btcAmount,
        string calldata tokenURI
    ) external onlyAuthorizedRelayer returns (uint256) {
        require(!escrowRecords[escrowId].executed, "Escrow already processed");
        
        // Mint NFT
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(beneficiary, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Record the escrow
        escrowRecords[escrowId] = EscrowRecord({
            escrowId: escrowId,
            beneficiary: beneficiary,
            amount: btcAmount,
            releasedAt: block.timestamp,
            tokenId: tokenId,
            executed: true
        });
        
        userEscrows[beneficiary].push(escrowId);

        emit EscrowReleased(escrowId, beneficiary, btcAmount, block.timestamp);
        emit NFTMinted(escrowId, beneficiary, tokenId, tokenURI);

        return tokenId;
    }

    /**
     * @dev Mint an NFT for a completed escrow
     */
    function mintNFT(
        address recipient,
        uint256 tokenId,
        string calldata tokenURI
    ) external onlyAuthorizedRelayer returns (uint256) {
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        return tokenId;
    }

    /**
     * @dev Execute a generic action triggered by escrow release
     */
    function executeAction(
        bytes32 escrowId,
        string calldata actionType,
        bytes calldata actionData
    ) external onlyAuthorizedRelayer {
        require(!escrowRecords[escrowId].executed, "Escrow already processed");
        
        // Mark as executed
        escrowRecords[escrowId].executed = true;
        
        emit ActionExecuted(escrowId, actionType, actionData);
    }

    /**
     * @dev Get escrow record by ID
     */
    function getEscrowRecord(bytes32 escrowId) external view returns (EscrowRecord memory) {
        return escrowRecords[escrowId];
    }

    /**
     * @dev Get all escrows for a user
     */
    function getUserEscrows(address user) external view returns (bytes32[] memory) {
        return userEscrows[user];
    }

    /**
     * @dev Check if an escrow has been processed
     */
    function isEscrowProcessed(bytes32 escrowId) external view returns (bool) {
        return escrowRecords[escrowId].executed;
    }

    /**
     * @dev Get total number of NFTs minted
     */
    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Required overrides for ERC721URIStorage
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
