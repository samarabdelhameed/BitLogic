/**
 * BitLogic SDK
 * Programmable Bitcoin Escrow with ZK Proofs & Cross-Chain Triggers
 * 
 * @packageDocumentation
 */

// Export main modules
export * from './escrow';
export * from './conditions';
export * from './proof';
export * from './bridge';

// Re-export commonly used types
export type {
    EscrowParams,
    Escrow,
    UTXO,
    ReleaseParams,
    ReleaseResult
} from './escrow';

export type {
    Condition,
    ConditionType,
    TimeLockCondition,
    OracleCondition,
    MultiSigCondition,
    HashLockCondition,
    GovernanceVoteCondition,
    CustomCondition,
    CrossChainAction
} from './conditions';

export type {
    ProofRequest,
    Proof,
    VerificationResult
} from './proof';

export type {
    CrossChainResult,
    EventMessage
} from './bridge';

// Import for main client
import { EscrowClient, createEscrowClient } from './escrow';
import { ProofGenerator, generateProof, verifyProof } from './proof';
import { BridgeClient, createBridgeClient, triggerCrossChainAction } from './bridge';
import { Conditions, Actions } from './conditions';

/**
 * BitLogic Main Client
 * Unified interface for all BitLogic functionality
 */
export class BitLogic {
    private escrowClient: EscrowClient;
    private proofGenerator: ProofGenerator;
    private bridgeClient: BridgeClient;

    public readonly network: 'mainnet' | 'testnet';

    constructor(config: { network?: 'mainnet' | 'testnet' } = {}) {
        this.network = config.network || 'testnet';
        this.escrowClient = createEscrowClient({ network: this.network });
        this.proofGenerator = new ProofGenerator({ network: this.network });
        this.bridgeClient = createBridgeClient();

        console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║   🔐 BitLogic SDK Initialized                        ║
    ║   Network: ${this.network.padEnd(42)}║
    ║                                                       ║
    ║   Programmable Bitcoin Escrow                        ║
    ║   with ZK Proofs & Cross-Chain Triggers              ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
    `);
    }

    // Escrow Methods
    async createEscrow(params: import('./escrow').EscrowParams) {
        return this.escrowClient.createEscrow(params);
    }

    async getEscrow(escrowId: string) {
        return this.escrowClient.getEscrow(escrowId);
    }

    async executeRelease(params: import('./escrow').ReleaseParams) {
        return this.escrowClient.executeRelease(params);
    }

    async refundEscrow(escrowId: string) {
        return this.escrowClient.refundEscrow(escrowId);
    }

    // Proof Methods
    async generateProof(request: import('./proof').ProofRequest) {
        return this.proofGenerator.generateProof(request);
    }

    async verifyProof(proof: import('./proof').Proof) {
        return this.proofGenerator.verifyProof(proof);
    }

    // Bridge Methods
    async triggerCrossChainAction(action: import('./conditions').CrossChainAction, escrowId: string, proof: string) {
        return this.bridgeClient.triggerAction(action, escrowId, proof);
    }

    // Convenience method for full flow
    async executeWithProof(proof: import('./proof').Proof, escrowId?: string) {
        // Verify the proof first
        const verification = await this.verifyProof(proof);
        if (!verification.valid) {
            throw new Error(`Proof verification failed: ${verification.error}`);
        }

        // Execute the release
        return this.executeRelease({
            escrowId: escrowId || proof.publicInputs[1] || '',
            proof: proof.proof,
            publicInputs: proof.publicInputs
        });
    }
}

// Export builders and utilities
export { Conditions, Actions };

// Default export
export default BitLogic;

// Version
export const VERSION = '1.0.0';
