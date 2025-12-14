# BitLogic ZK Circuits

Zero-Knowledge circuits for verifying escrow conditions using Grail Pro.

## Circuits

### Time-Lock Circuit
Verifies that the current time is after the specified unlock time.

**Public Inputs:**
- `currentTimestamp`: Current block timestamp
- `unlockTimestamp`: Required unlock time

**Private Inputs:**
- None (time-lock is fully public)

### Oracle Circuit
Verifies that oracle data satisfies the specified condition.

**Public Inputs:**
- `oraclePublicKey`: Oracle's signing key
- `conditionHash`: Hash of the condition being verified

**Private Inputs:**
- `oracleSignature`: Signature from oracle
- `oracleData`: The actual data from oracle

### Multi-Sig Circuit
Verifies that M of N required signatures are present.

**Public Inputs:**
- `requiredSignatures`: M (minimum required)
- `signerPubkeyCommitment`: Commitment to allowed signers

**Private Inputs:**
- `signatures`: Array of valid signatures
- `signerPubkeys`: Public keys of signers

### Hash-Lock Circuit
Verifies that the preimage matches the required hash.

**Public Inputs:**
- `hash`: The hash that must be matched

**Private Inputs:**
- `preimage`: The secret preimage

### Composite Circuit
Combines multiple condition types with AND/OR logic.

## Building Circuits

```bash
# Compile circuits
npm run build:circuits

# Generate proving key
npm run setup:circuits

# Run tests
npm run test:circuits
```

## Integration

Circuits are integrated with Grail Pro for:
- Proof generation
- On-chain verification
- Cross-chain proof relay
