import { useState } from 'react';
import { Conditions } from '@bitlogic/sdk';

interface EscrowCreatorProps {
    walletConnected: boolean;
}

export function EscrowCreator({ walletConnected }: EscrowCreatorProps) {
    const [amount, setAmount] = useState('');
    const [beneficiary, setBeneficiary] = useState('');
    const [conditionType, setConditionType] = useState<'TIME_LOCK' | 'ORACLE' | 'MULTI_SIG'>('TIME_LOCK');
    const [unlockDate, setUnlockDate] = useState('');
    const [oracleCondition, setOracleCondition] = useState('BTC_PRICE > 100000');
    const [enableCrossChain, setEnableCrossChain] = useState(true);
    const [crossChainAction, setCrossChainAction] = useState<'mintNFT' | 'releaseTokens'>('mintNFT');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleCreateEscrow = async () => {
        if (!walletConnected) {
            alert('Please connect your wallet first');
            return;
        }

        setLoading(true);
        try {
            // Build conditions based on type
            let conditions = [];

            if (conditionType === 'TIME_LOCK') {
                conditions.push(Conditions.timeLock(unlockDate));
            } else if (conditionType === 'ORACLE') {
                conditions.push(Conditions.oracle('chainlink', oracleCondition));
            }

            // Simulate escrow creation
            await new Promise(resolve => setTimeout(resolve, 2000));

            const escrowResult = {
                id: `escrow_${Date.now().toString(16)}`,
                amount: parseFloat(amount),
                beneficiary,
                conditions,
                status: 'active',
                createdAt: new Date().toISOString()
            };

            setResult(escrowResult);
            console.log('Escrow created:', escrowResult);

        } catch (error) {
            console.error('Failed to create escrow:', error);
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return (
            <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-white mb-4">Escrow Created Successfully!</h3>

                <div className="bg-gray-900/50 rounded-xl p-6 text-left max-w-md mx-auto mb-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Escrow ID:</span>
                            <span className="text-white font-mono text-sm">{result.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Amount:</span>
                            <span className="text-orange-500 font-bold">{result.amount} BTC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-green-500">Active</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setResult(null)}
                    className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
                >
                    Create Another Escrow
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Create New Escrow</h3>

            <div className="space-y-6">
                {/* Amount */}
                <div>
                    <label className="block text-gray-400 mb-2">Amount (BTC)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.1"
                        step="0.001"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    />
                </div>

                {/* Beneficiary */}
                <div>
                    <label className="block text-gray-400 mb-2">Beneficiary Address</label>
                    <input
                        type="text"
                        value={beneficiary}
                        onChange={(e) => setBeneficiary(e.target.value)}
                        placeholder="bc1q..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
                    />
                </div>

                {/* Condition Type */}
                <div>
                    <label className="block text-gray-400 mb-2">Release Condition</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'TIME_LOCK', label: 'Time Lock', icon: '⏰' },
                            { id: 'ORACLE', label: 'Oracle', icon: '📡' },
                            { id: 'MULTI_SIG', label: 'Multi-Sig', icon: '🔐' },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setConditionType(type.id as any)}
                                className={`p-4 rounded-lg border transition ${conditionType === type.id
                                        ? 'border-purple-500 bg-purple-500/20'
                                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{type.icon}</div>
                                <div className="text-white text-sm">{type.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Condition Details */}
                {conditionType === 'TIME_LOCK' && (
                    <div>
                        <label className="block text-gray-400 mb-2">Unlock After</label>
                        <input
                            type="datetime-local"
                            value={unlockDate}
                            onChange={(e) => setUnlockDate(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        />
                    </div>
                )}

                {conditionType === 'ORACLE' && (
                    <div>
                        <label className="block text-gray-400 mb-2">Oracle Condition</label>
                        <input
                            type="text"
                            value={oracleCondition}
                            onChange={(e) => setOracleCondition(e.target.value)}
                            placeholder="BTC_PRICE > 100000"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        />
                    </div>
                )}

                {/* Cross-Chain Action */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-gray-400">Enable Cross-Chain Action</label>
                        <button
                            onClick={() => setEnableCrossChain(!enableCrossChain)}
                            className={`w-12 h-6 rounded-full transition ${enableCrossChain ? 'bg-purple-500' : 'bg-gray-700'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${enableCrossChain ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </div>

                    {enableCrossChain && (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setCrossChainAction('mintNFT')}
                                className={`p-4 rounded-lg border transition ${crossChainAction === 'mintNFT'
                                        ? 'border-purple-500 bg-purple-500/20'
                                        : 'border-gray-700 bg-gray-900'
                                    }`}
                            >
                                <div className="text-2xl mb-1">🎨</div>
                                <div className="text-white text-sm">Mint NFT</div>
                                <div className="text-gray-500 text-xs">on Ethereum</div>
                            </button>
                            <button
                                onClick={() => setCrossChainAction('releaseTokens')}
                                className={`p-4 rounded-lg border transition ${crossChainAction === 'releaseTokens'
                                        ? 'border-purple-500 bg-purple-500/20'
                                        : 'border-gray-700 bg-gray-900'
                                    }`}
                            >
                                <div className="text-2xl mb-1">💰</div>
                                <div className="text-white text-sm">Release Tokens</div>
                                <div className="text-gray-500 text-xs">on Ethereum</div>
                            </button>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleCreateEscrow}
                    disabled={loading || !amount || !beneficiary}
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Creating Escrow...
                        </span>
                    ) : (
                        '🔒 Create Escrow'
                    )}
                </button>
            </div>
        </div>
    );
}
