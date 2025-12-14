import { useState } from 'react';

interface Escrow {
    id: string;
    amount: number;
    beneficiary: string;
    status: 'pending' | 'active' | 'released' | 'refunded';
    conditionType: string;
    createdAt: string;
    crossChainAction?: string;
}

// Demo data
const demoEscrows: Escrow[] = [
    {
        id: 'escrow_1a2b3c4d',
        amount: 0.5,
        beneficiary: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        status: 'active',
        conditionType: 'TIME_LOCK',
        createdAt: '2024-12-10T10:30:00Z',
        crossChainAction: 'mintNFT'
    },
    {
        id: 'escrow_5e6f7g8h',
        amount: 1.2,
        beneficiary: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
        status: 'released',
        conditionType: 'ORACLE',
        createdAt: '2024-12-08T14:00:00Z',
        crossChainAction: 'releaseTokens'
    },
    {
        id: 'escrow_9i0j1k2l',
        amount: 0.25,
        beneficiary: 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0g',
        status: 'pending',
        conditionType: 'MULTI_SIG',
        createdAt: '2024-12-14T08:00:00Z'
    }
];

export function EscrowList() {
    const [escrows] = useState<Escrow[]>(demoEscrows);
    const [selectedEscrow, setSelectedEscrow] = useState<Escrow | null>(null);

    const getStatusColor = (status: Escrow['status']) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'released': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'refunded': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getConditionIcon = (type: string) => {
        switch (type) {
            case 'TIME_LOCK': return '⏰';
            case 'ORACLE': return '📡';
            case 'MULTI_SIG': return '🔐';
            default: return '📋';
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-white mb-6">My Escrows</h3>

            {escrows.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-gray-400">No escrows found. Create your first one!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {escrows.map((escrow) => (
                        <div
                            key={escrow.id}
                            onClick={() => setSelectedEscrow(escrow)}
                            className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-2xl">{getConditionIcon(escrow.conditionType)}</span>
                                        <span className="font-mono text-gray-400 text-sm">{escrow.id}</span>
                                    </div>
                                    <div className="text-2xl font-bold text-orange-500 mb-1">
                                        {escrow.amount} BTC
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        To: {escrow.beneficiary.slice(0, 12)}...{escrow.beneficiary.slice(-8)}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(escrow.status)}`}>
                                        {escrow.status}
                                    </span>
                                    <div className="text-gray-500 text-sm mt-2">
                                        {new Date(escrow.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {escrow.crossChainAction && (
                                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center text-sm text-gray-400">
                                    <span className="mr-2">🌉</span>
                                    Cross-chain: {escrow.crossChainAction === 'mintNFT' ? 'Mint NFT' : 'Release Tokens'} on Ethereum
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Escrow Detail Modal */}
            {selectedEscrow && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-lg w-full mx-4">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-xl font-bold text-white">Escrow Details</h4>
                            <button
                                onClick={() => setSelectedEscrow(null)}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-400">ID</span>
                                <span className="text-white font-mono">{selectedEscrow.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Amount</span>
                                <span className="text-orange-500 font-bold">{selectedEscrow.amount} BTC</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status</span>
                                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedEscrow.status)}`}>
                                    {selectedEscrow.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Condition</span>
                                <span className="text-white">{getConditionIcon(selectedEscrow.conditionType)} {selectedEscrow.conditionType}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-1">Beneficiary</span>
                                <span className="text-white font-mono text-sm break-all">{selectedEscrow.beneficiary}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-700 flex space-x-3">
                            {selectedEscrow.status === 'active' && (
                                <button className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-lg font-medium">
                                    Generate Proof
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedEscrow(null)}
                                className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
