export function StatusMonitor() {
    return (
        <div>
            <h3 className="text-2xl font-bold text-white mb-6">Status Monitor</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bitcoin Network Status */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                        <span className="text-2xl mr-2">₿</span>
                        Bitcoin Network
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Network</span>
                            <span className="text-orange-500">Testnet</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Block Height</span>
                            <span className="text-white">2,573,491</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Status</span>
                            <span className="text-green-400 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Connected
                            </span>
                        </div>
                    </div>
                </div>

                {/* Ethereum Network Status */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                        <span className="text-2xl mr-2">⟠</span>
                        Ethereum Network
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Network</span>
                            <span className="text-purple-400">Sepolia</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Block Height</span>
                            <span className="text-white">5,234,167</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Status</span>
                            <span className="text-green-400 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Connected
                            </span>
                        </div>
                    </div>
                </div>

                {/* ZK Prover Status */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                        <span className="text-2xl mr-2">🔮</span>
                        Grail Pro (ZK Prover)
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Endpoint</span>
                            <span className="text-white">api.grailpro.io</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Proofs Generated</span>
                            <span className="text-white">1,247</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Status</span>
                            <span className="text-green-400 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Cross-Chain Relayer Status */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                        <span className="text-2xl mr-2">🌉</span>
                        Cross-Chain Relayer
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Pending Actions</span>
                            <span className="text-white">3</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Completed Today</span>
                            <span className="text-white">24</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Status</span>
                            <span className="text-green-400 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h4 className="text-lg font-medium text-white mb-4">Recent Activity</h4>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl divide-y divide-gray-800">
                    {[
                        { type: 'escrow_created', desc: 'New escrow created: 0.5 BTC', time: '2 min ago', icon: '🔒' },
                        { type: 'proof_generated', desc: 'ZK proof generated for escrow_1a2b3c4d', time: '5 min ago', icon: '✅' },
                        { type: 'cross_chain', desc: 'NFT minted on Ethereum', time: '12 min ago', icon: '🎨' },
                        { type: 'escrow_released', desc: 'Escrow released: 1.2 BTC', time: '1 hour ago', icon: '💰' },
                    ].map((activity, i) => (
                        <div key={i} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{activity.icon}</span>
                                <span className="text-white">{activity.desc}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
