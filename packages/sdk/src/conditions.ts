/**
 * BitLogic Conditions Module
 * Defines condition types for escrow release verification
 */

// Condition Types
export type ConditionType =
    | 'TIME_LOCK'
    | 'ORACLE'
    | 'MULTI_SIG'
    | 'HASH_LOCK'
    | 'GOVERNANCE_VOTE'
    | 'CUSTOM';

// Base Condition Interface
export interface BaseCondition {
    type: ConditionType;
    id?: string;
    description?: string;
}

// Time Lock Condition
export interface TimeLockCondition extends BaseCondition {
    type: 'TIME_LOCK';
    unlockAfter: string | Date;  // ISO timestamp or Date
    minDelay?: string;           // e.g., '48h', '7d'
}

// Oracle Condition
export interface OracleCondition extends BaseCondition {
    type: 'ORACLE';
    source: 'chainlink' | 'pyth' | 'custom';
    condition: string;           // e.g., 'BTC_PRICE > 100000'
    feedId?: string;
    threshold?: number;
}

// Multi-Sig Condition
export interface MultiSigCondition extends BaseCondition {
    type: 'MULTI_SIG';
    required: number;            // M of N
    signers: string[];           // Public keys or addresses
    currentSignatures?: string[];
}

// Hash Lock Condition
export interface HashLockCondition extends BaseCondition {
    type: 'HASH_LOCK';
    hashAlgorithm: 'sha256' | 'sha3' | 'blake2';
    hash: string;                // The hash to match
    preimage?: string;           // Revealed to unlock
}

// Governance Vote Condition
export interface GovernanceVoteCondition extends BaseCondition {
    type: 'GOVERNANCE_VOTE';
    proposalId: string;
    threshold: string;           // e.g., '66%', '51%'
    governanceContract?: string;
}

// Custom ZK Condition
export interface CustomCondition extends BaseCondition {
    type: 'CUSTOM';
    circuitId: string;
    inputs: Record<string, any>;
    verifierAddress?: string;
}

// Union type for all conditions
export type Condition =
    | TimeLockCondition
    | OracleCondition
    | MultiSigCondition
    | HashLockCondition
    | GovernanceVoteCondition
    | CustomCondition;

// Cross-Chain Action Types
export interface CrossChainAction {
    chain: 'ethereum' | 'polygon' | 'arbitrum' | 'base';
    contract: string;
    method: string;
    params: Record<string, any>;
    gasLimit?: number;
}

// Condition Builders (Factory Functions)
export const Conditions = {
    /**
     * Create a time-lock condition
     */
    timeLock(unlockAfter: string | Date, minDelay?: string): TimeLockCondition {
        return {
            type: 'TIME_LOCK',
            unlockAfter,
            minDelay
        };
    },

    /**
     * Create an oracle condition
     */
    oracle(source: 'chainlink' | 'pyth' | 'custom', condition: string, feedId?: string): OracleCondition {
        return {
            type: 'ORACLE',
            source,
            condition,
            feedId
        };
    },

    /**
     * Create a multi-sig condition
     */
    multiSig(required: number, signers: string[]): MultiSigCondition {
        if (required > signers.length) {
            throw new Error('Required signatures cannot exceed number of signers');
        }
        return {
            type: 'MULTI_SIG',
            required,
            signers
        };
    },

    /**
     * Create a hash-lock condition
     */
    hashLock(hash: string, algorithm: 'sha256' | 'sha3' | 'blake2' = 'sha256'): HashLockCondition {
        return {
            type: 'HASH_LOCK',
            hashAlgorithm: algorithm,
            hash
        };
    },

    /**
     * Create a governance vote condition
     */
    governanceVote(proposalId: string, threshold: string): GovernanceVoteCondition {
        return {
            type: 'GOVERNANCE_VOTE',
            proposalId,
            threshold
        };
    },

    /**
     * Create a custom ZK condition
     */
    custom(circuitId: string, inputs: Record<string, any>): CustomCondition {
        return {
            type: 'CUSTOM',
            circuitId,
            inputs
        };
    }
};

// Condition Validator
export function validateCondition(condition: Condition): boolean {
    switch (condition.type) {
        case 'TIME_LOCK':
            return !!condition.unlockAfter;
        case 'ORACLE':
            return !!condition.source && !!condition.condition;
        case 'MULTI_SIG':
            return condition.required > 0 && condition.signers.length >= condition.required;
        case 'HASH_LOCK':
            return !!condition.hash && !!condition.hashAlgorithm;
        case 'GOVERNANCE_VOTE':
            return !!condition.proposalId && !!condition.threshold;
        case 'CUSTOM':
            return !!condition.circuitId;
        default:
            return false;
    }
}

// Check if condition is met
export async function checkCondition(condition: Condition, data?: Record<string, any>): Promise<boolean> {
    switch (condition.type) {
        case 'TIME_LOCK': {
            const unlockTime = new Date(condition.unlockAfter).getTime();
            return Date.now() >= unlockTime;
        }
        case 'ORACLE': {
            // In production, fetch oracle data and evaluate condition
            console.log(`Checking oracle condition: ${condition.condition}`);
            return data?.oracleValue !== undefined;
        }
        case 'MULTI_SIG': {
            const signatures = condition.currentSignatures || [];
            return signatures.length >= condition.required;
        }
        case 'HASH_LOCK': {
            if (!condition.preimage) return false;
            // In production, hash the preimage and compare
            return data?.preimage !== undefined;
        }
        case 'GOVERNANCE_VOTE': {
            // In production, check on-chain vote status
            console.log(`Checking governance vote: ${condition.proposalId}`);
            return data?.voteApproved === true;
        }
        case 'CUSTOM': {
            // Custom conditions are verified through ZK proofs
            return data?.proofVerified === true;
        }
        default:
            return false;
    }
}
