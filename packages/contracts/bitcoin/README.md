# BitLogic Bitcoin Scripts (Charms Protocol)

This directory contains Bitcoin scripts that define the escrow conditions using Charms Protocol.

## Overview

Charms Protocol enables programmable UTXOs on Bitcoin by allowing complex spending conditions that can be verified through Zero-Knowledge proofs.

## Scripts

### `escrow.charm`
Main escrow script that locks BTC with programmable conditions:
- Time-lock conditions
- Oracle conditions
- Multi-signature conditions
- Hash-lock conditions

### `timelock.charm`
Time-based release conditions for escrows.

### `multisig.charm`
M-of-N signature requirements for escrow release.

## Usage

```typescript
import { createEscrowScript } from './escrow';

const script = createEscrowScript({
  beneficiary: 'bc1q...',
  conditions: [
    { type: 'TIME_LOCK', unlockAfter: '2024-12-31' }
  ],
  timeout: 604800
});
```

## Integration with Grail Pro

The scripts work with Grail Pro's ZK verification system to:
1. Generate proofs that conditions are met
2. Verify proofs without revealing private data
3. Enable trustless escrow releases

## References

- [Charms Protocol Documentation](https://charms.dev/docs)
- [Bitcoin Script Reference](https://en.bitcoin.it/wiki/Script)
