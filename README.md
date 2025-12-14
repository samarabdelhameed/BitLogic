<div align="center">

# 🔐 BitLogic

### Programmable Bitcoin Escrow with Zero-Knowledge Proofs & Cross-Chain Triggers

[![Bitcoin](https://img.shields.io/badge/Bitcoin-FF9900?style=for-the-badge&logo=bitcoin&logoColor=white)](https://bitcoin.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)](https://ethereum.org/)
[![ZK Proofs](https://img.shields.io/badge/ZK_Proofs-6B21A8?style=for-the-badge&logo=zap&logoColor=white)](https://en.wikipedia.org/wiki/Zero-knowledge_proof)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Unlocking Bitcoin's programmability through Zero-Knowledge verification and seamless cross-chain interoperability*

[🚀 Live Demo](#demo) • [📖 Documentation](#documentation) • [🏗️ Architecture](#architecture) • [⚡ Quick Start](#quick-start)

</div>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Use Cases](#-use-cases)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚨 Problem Statement

### The Bitcoin Programmability Gap

Bitcoin, the world's most secure and decentralized blockchain, has historically been limited in its programmability compared to smart contract platforms like Ethereum. This creates several critical challenges:

| Challenge | Impact |
|-----------|--------|
| **Limited Smart Contracts** | Bitcoin Script is intentionally restrictive, preventing complex conditional logic |
| **Escrow Trust Issues** | Traditional Bitcoin escrows require trusted intermediaries, introducing counterparty risk |
| **Cross-Chain Isolation** | Bitcoin assets are siloed, unable to trigger actions on other blockchains |
| **No Conditional Payments** | Payments cannot be automatically released based on real-world events or oracle data |
| **Complex Multi-Party Coordination** | Multi-signature setups are cumbersome and lack programmable conditions |

### Real-World Consequences

```
❌ Freelancers can't receive trustless milestone-based payments in Bitcoin
❌ Marketplaces can't offer secure escrow without centralized custody
❌ DAOs can't manage Bitcoin treasuries with programmable rules
❌ Cross-chain DeFi cannot leverage Bitcoin's security guarantees
```

---

## 💡 Our Solution

### BitLogic: Where Bitcoin Meets Programmability

**BitLogic** is a revolutionary infrastructure layer that brings **programmable escrow** and **cross-chain triggers** to Bitcoin, powered by **Zero-Knowledge Proofs** for trustless verification.

<div align="center">

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Bitcoin UTXO  →  ZK Conditions  →  Proof Verified  →  Action │
│                                                                 │
│   ┌─────────┐      ┌──────────┐     ┌───────────┐    ┌────────┐│
│   │ Escrow  │  →   │Time-Lock │  →  │ Grail Pro │ →  │ Unlock ││
│   │  Fund   │      │  Oracle  │     │  Verify   │    │ Trigger││
│   │ (BTC)   │      │Multi-Sig │     │   (ZK)    │    │(EVM/BTC││
│   └─────────┘      └──────────┘     └───────────┘    └────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

</div>

### Core Innovation

| Feature | Description |
|---------|-------------|
| **🔒 UTXO-Based Escrow** | Funds locked in Bitcoin UTXOs with cryptographic conditions |
| **🧠 ZK Condition Engine** | Define complex release conditions verified by zero-knowledge proofs |
| **🌉 Cross-Chain Bridge** | Successful escrow release triggers actions on Ethereum and other chains |
| **🛡️ Trustless Verification** | No intermediaries — math guarantees correctness |

---

## ✨ Key Features

### 1. Programmable Bitcoin Escrow
Create escrows with sophisticated conditions that go beyond simple multi-sig:

```typescript
// Example: Time-locked escrow with oracle condition
const escrow = await BitLogic.createEscrow({
  amount: 0.5, // BTC
  conditions: [
    { type: 'TIME_LOCK', unlockAfter: '2024-12-31T00:00:00Z' },
    { type: 'ORACLE', source: 'chainlink', condition: 'BTC_PRICE > 100000' }
  ],
  beneficiary: 'bc1q...',
  crossChainAction: {
    chain: 'ethereum',
    contract: '0x...',
    method: 'mintNFT',
    params: { tokenId: 1 }
  }
});
```

### 2. Zero-Knowledge Proof Verification
- **Privacy-Preserving**: Prove conditions are met without revealing sensitive data
- **Efficient**: Succinct proofs that verify in milliseconds
- **Secure**: Powered by Grail Pro's battle-tested ZK infrastructure

### 3. Cross-Chain Action Triggers
When escrow conditions are satisfied:
- 🎨 **Mint NFTs** on Ethereum
- 💰 **Release stablecoins** on any EVM chain
- 📜 **Execute smart contracts** with custom logic
- 🗳️ **Trigger governance actions** in DAOs

### 4. Developer-Friendly SDK
```typescript
import { BitLogic, Conditions, Actions } from '@bitlogic/sdk';

// Initialize
const client = new BitLogic({ network: 'testnet' });

// Create, verify, and trigger — all in a few lines
const escrow = await client.createEscrow(config);
const proof = await client.generateProof(escrow.id);
const result = await client.executeWithProof(proof);
```

---

## 🎯 Use Cases

### 1. 💼 Freelance & Gig Economy

**Scenario**: A developer is hired to build a smart contract. Payment is in Bitcoin.

```
┌────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  Client locks  │ →  │ Developer       │ →  │ Code reviewed &  │
│  1 BTC escrow  │    │ submits work    │    │ proof generated  │
└────────────────┘    └─────────────────┘    └──────────────────┘
                                                      │
                                                      ▼
┌────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│ Achievement    │ ←  │ BTC released to │ ←  │ ZK proof verifies│
│ NFT minted     │    │ developer       │    │ completion       │
└────────────────┘    └─────────────────┘    └──────────────────┘
```

**Benefits**:
- ✅ No trusted third party needed
- ✅ Automatic payment on verified completion
- ✅ Portable proof of work (NFT credential)

---

### 2. 🛒 Decentralized Marketplace

**Scenario**: Buying physical goods with Bitcoin, with buyer protection.

| Step | Actor | Action |
|------|-------|--------|
| 1 | Buyer | Locks BTC in escrow |
| 2 | Seller | Ships item with tracking |
| 3 | Oracle | Reports delivery confirmation |
| 4 | System | ZK proof of delivery generated |
| 5 | Smart Contract | Releases BTC to seller |
| 6 | Cross-Chain | Mints receipt NFT on Ethereum |

---

### 3. 🏛️ DAO Treasury Management

**Scenario**: A DAO holds Bitcoin but needs programmable spending rules.

```typescript
const treasuryEscrow = await BitLogic.createEscrow({
  amount: 10, // BTC
  conditions: [
    { type: 'GOVERNANCE_VOTE', threshold: '66%', proposal: 'PROP-42' },
    { type: 'TIME_LOCK', minDelay: '48h' }
  ],
  crossChainAction: {
    chain: 'ethereum',
    contract: 'DAO_GOVERNANCE_CONTRACT',
    method: 'executeProposal',
    params: { proposalId: 42 }
  }
});
```

---

### 4. 🔄 Atomic Cross-Chain Swaps

**Scenario**: Trustless BTC ↔ ETH swap without centralized exchanges.

```
Party A (has BTC)              Party B (has ETH)
     │                              │
     │  Creates BTC escrow          │
     │  with hashlock ─────────────▶│
     │                              │
     │         Creates ETH escrow   │
     │◀─────────── with same hash   │
     │                              │
     │  Reveals preimage            │
     │ ────────────────────────────▶│
     │                              │
     │  Both escrows unlock         │
     │  atomically via ZK proof     │
     ▼                              ▼
  Gets ETH                       Gets BTC
```

---

## 🏗️ Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              BITLOGIC ARCHITECTURE                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                        FRONTEND LAYER                            │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐    │    │
│  │  │  React/   │  │  Wallet   │  │  Escrow   │  │  Status   │    │    │
│  │  │  Next.js  │  │  Connect  │  │  Creator  │  │  Monitor  │    │    │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                        SDK / API LAYER                           │    │
│  │  ┌───────────────┐  ┌────────────────┐  ┌───────────────────┐  │    │
│  │  │ BitLogic SDK  │  │ Charms Protocol│  │ Cross-Chain API   │  │    │
│  │  │ (TypeScript)  │  │  Integration   │  │ (Event Listeners) │  │    │
│  │  └───────────────┘  └────────────────┘  └───────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│         ┌──────────────────────────┼──────────────────────────┐         │
│         ▼                          ▼                          ▼         │
│  ┌─────────────┐         ┌─────────────────┐         ┌─────────────┐   │
│  │   BITCOIN   │         │   ZK PROVING    │         │  ETHEREUM   │   │
│  │   LAYER     │         │     LAYER       │         │   LAYER     │   │
│  │             │         │                 │         │             │   │
│  │ ┌─────────┐ │         │ ┌─────────────┐ │         │ ┌─────────┐ │   │
│  │ │  UTXO   │ │◀───────▶│ │ Grail Pro   │ │◀───────▶│ │Trigger  │ │   │
│  │ │ Escrow  │ │         │ │   Prover    │ │         │ │Contract │ │   │
│  │ └─────────┘ │         │ └─────────────┘ │         │ └─────────┘ │   │
│  │ ┌─────────┐ │         │ ┌─────────────┐ │         │ ┌─────────┐ │   │
│  │ │ Charms  │ │         │ │  Condition  │ │         │ │  NFT    │ │   │
│  │ │ Script  │ │         │ │   Engine    │ │         │ │ Minter  │ │   │
│  │ └─────────┘ │         │ └─────────────┘ │         │ └─────────┘ │   │
│  └─────────────┘         └─────────────────┘         └─────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Component Details

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React / Next.js | User interface for escrow management |
| **BitLogic SDK** | TypeScript | Developer SDK for integration |
| **Charms Protocol** | Rust / Bitcoin Script | UTXO programmability layer |
| **Grail Pro** | ZK-SNARK | Zero-knowledge proof generation & verification |
| **Cross-Chain Bridge** | Relayer Network | Event propagation across chains |
| **Ethereum Contracts** | Solidity | Trigger actions (NFT minting, token release) |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|-------|-------------|
| **Blockchain** | ![Bitcoin](https://img.shields.io/badge/Bitcoin-FF9900?style=flat-square&logo=bitcoin&logoColor=white) ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=flat-square&logo=ethereum&logoColor=white) |
| **ZK Infrastructure** | ![Grail Pro](https://img.shields.io/badge/Grail_Pro-6B21A8?style=flat-square) ![Charms](https://img.shields.io/badge/Charms_SDK-FF6B6B?style=flat-square) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) |
| **Smart Contracts** | ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white) ![Bitcoin Script](https://img.shields.io/badge/Bitcoin_Script-FF9900?style=flat-square) |
| **Testing** | ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white) ![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=flat-square) |

</div>

---

## ⚙️ How It Works

### Step-by-Step Flow

```mermaid
sequenceDiagram
    participant User as User (Payer)
    participant BL as BitLogic SDK
    participant BTC as Bitcoin Network
    participant ZK as Grail Pro (ZK)
    participant ETH as Ethereum

    User->>BL: Create Escrow Request
    BL->>BTC: Generate UTXO with Charms Script
    BTC-->>BL: Escrow UTXO Created
    BL-->>User: Escrow ID & Details

    Note over User,ETH: Time passes, conditions monitored...

    User->>BL: Request Proof Generation
    BL->>ZK: Submit Condition Data
    ZK->>ZK: Generate ZK Proof
    ZK-->>BL: Valid Proof

    BL->>BTC: Spend UTXO with Proof
    BTC-->>BL: Transaction Confirmed

    BL->>ETH: Trigger Cross-Chain Action
    ETH->>ETH: Execute Smart Contract
    ETH-->>User: Action Complete (NFT Minted)
```

### Detailed Process

#### 1️⃣ Escrow Creation
```typescript
// User defines escrow parameters
const escrowParams = {
  amount: 0.1,              // Amount in BTC
  beneficiary: 'bc1q...',   // Recipient address
  conditions: [...],        // Release conditions
  timeout: 604800,          // 7 days in seconds
  crossChainAction: {...}   // Optional cross-chain trigger
};

// SDK creates the escrow UTXO
const escrow = await bitlogic.createEscrow(escrowParams);
// Returns: { id, utxo, scriptHash, status }
```

#### 2️⃣ Condition Definition
Supported condition types:

| Condition | Description | Example |
|-----------|-------------|---------|
| `TIME_LOCK` | Release after timestamp | `unlockAfter: '2024-12-31'` |
| `ORACLE` | External data condition | `BTC_PRICE > 100000` |
| `MULTI_SIG` | M-of-N signatures | `2-of-3 signers` |
| `HASH_LOCK` | Preimage reveal | `sha256(preimage) = hash` |
| `CUSTOM` | Custom circuit logic | User-defined ZK circuit |

#### 3️⃣ ZK Proof Generation
```typescript
// When conditions are met, generate proof
const proofRequest = {
  escrowId: escrow.id,
  conditionData: {
    timestamp: Date.now(),
    oracleSignature: '0x...',
    // ... other condition witnesses
  }
};

const proof = await bitlogic.generateProof(proofRequest);
// Returns: { proof, publicInputs, verified: true }
```

#### 4️⃣ Escrow Release & Cross-Chain Trigger
```typescript
// Execute the escrow release with proof
const result = await bitlogic.executeRelease({
  escrowId: escrow.id,
  proof: proof.proof,
  publicInputs: proof.publicInputs
});

// Automatically triggers cross-chain action
// Returns: { 
//   btcTxId: '...', 
//   ethTxId: '...', 
//   nftTokenId: 42 
// }
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn** or **bun**
- **Bitcoin Core** (testnet) or access to a Bitcoin RPC
- **MetaMask** or compatible Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/bitlogic.git
cd bitlogic

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

### Environment Configuration

```env
# Bitcoin Configuration
BITCOIN_NETWORK=testnet
BITCOIN_RPC_URL=http://localhost:18332
BITCOIN_RPC_USER=your_rpc_user
BITCOIN_RPC_PASS=your_rpc_password

# Ethereum Configuration
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
ETHEREUM_PRIVATE_KEY=your_private_key

# Grail Pro Configuration
GRAIL_PRO_API_KEY=your_api_key
GRAIL_PRO_ENDPOINT=https://api.grailpro.io

# Charms SDK
CHARMS_NETWORK=testnet
```

### Quick Test

```bash
# Run tests
npm test

# Run a demo escrow flow
npm run demo:escrow

# Start the frontend
npm run dev
```

---

## 📁 Project Structure

```
bitlogic/
├── 📂 apps/
│   └── 📂 web/                    # Next.js frontend application
│       ├── 📂 components/         # React components
│       ├── 📂 pages/              # Next.js pages
│       ├── 📂 hooks/              # Custom React hooks
│       └── 📂 styles/             # CSS/Tailwind styles
│
├── 📂 packages/
│   ├── 📂 sdk/                    # BitLogic TypeScript SDK
│   │   ├── 📂 src/
│   │   │   ├── escrow.ts          # Escrow management
│   │   │   ├── conditions.ts      # Condition definitions
│   │   │   ├── proof.ts           # ZK proof generation
│   │   │   └── bridge.ts          # Cross-chain bridge
│   │   └── package.json
│   │
│   ├── 📂 contracts/              # Smart contracts
│   │   ├── 📂 bitcoin/            # Bitcoin/Charms scripts
│   │   └── 📂 ethereum/           # Solidity contracts
│   │
│   └── 📂 circuits/               # ZK circuits (Grail Pro)
│       └── 📂 conditions/         # Condition verification circuits
│
├── 📂 services/
│   ├── 📂 relayer/                # Cross-chain relayer service
│   └── 📂 oracle/                 # Oracle service for conditions
│
├── 📂 docs/                       # Documentation
├── 📄 package.json
├── 📄 turbo.json                  # Turborepo configuration
└── 📄 README.md
```

---

## 📚 API Reference

### SDK Methods

#### `createEscrow(params: EscrowParams): Promise<Escrow>`

Creates a new escrow on the Bitcoin network.

```typescript
interface EscrowParams {
  amount: number;                    // Amount in BTC
  beneficiary: string;               // Bitcoin address
  conditions: Condition[];           // Release conditions
  timeout?: number;                  // Timeout in seconds
  crossChainAction?: CrossChainAction;
}

interface Escrow {
  id: string;
  utxo: UTXO;
  scriptHash: string;
  status: 'pending' | 'active' | 'released' | 'refunded';
  createdAt: Date;
}
```

#### `generateProof(request: ProofRequest): Promise<Proof>`

Generates a ZK proof for escrow release.

```typescript
interface ProofRequest {
  escrowId: string;
  conditionData: Record<string, any>;
}

interface Proof {
  proof: string;
  publicInputs: string[];
  verified: boolean;
}
```

#### `executeRelease(params: ReleaseParams): Promise<ReleaseResult>`

Executes the escrow release with a valid proof.

```typescript
interface ReleaseParams {
  escrowId: string;
  proof: string;
  publicInputs: string[];
}

interface ReleaseResult {
  btcTxId: string;
  ethTxId?: string;
  status: 'success' | 'failed';
}
```

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Core escrow functionality
- [x] Time-lock conditions
- [x] Basic ZK proof generation
- [x] Bitcoin testnet integration

### Phase 2: Advanced Features 🚧
- [ ] Oracle integration (Chainlink, Pyth)
- [ ] Multi-condition logic (AND, OR, THRESHOLD)
- [ ] Ethereum mainnet deployment
- [ ] SDK npm package release

### Phase 3: Ecosystem 📅
- [ ] Additional EVM chain support (Polygon, Arbitrum)
- [ ] DAO governance integration
- [ ] Mobile wallet SDK
- [ ] Audit & mainnet launch

### Phase 4: Scale 🔮
- [ ] Layer 2 Bitcoin support (Lightning, RGB)
- [ ] Enterprise API tier
- [ ] White-label solution
- [ ] Decentralized relayer network

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Commit** your changes (`git commit -m 'Add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Charms Protocol** - For enabling Bitcoin programmability
- **Grail Pro** - For the ZK proving infrastructure
- **Bitcoin Community** - For building the most secure blockchain
- **Ethereum Community** - For pioneering smart contracts

---

<div align="center">

### Built with ❤️ for the Bitcoin & Ethereum ecosystems

**[Website](https://bitlogic.io)** • **[Twitter](https://twitter.com/bitlogic)** • **[Discord](https://discord.gg/bitlogic)** • **[Documentation](https://docs.bitlogic.io)**

</div>
