import Head from 'next/head';
import { useState } from 'react';
import { EscrowCreator } from '../components/EscrowCreator';
import { EscrowList } from '../components/EscrowList';
import { StatusMonitor } from '../components/StatusMonitor';
import { WalletConnect } from '../components/WalletConnect';

export default function Home() {
    const [activeTab, setActiveTab] = useState<'create' | 'list' | 'monitor'>('create');
    const [walletConnected, setWalletConnected] = useState(false);

    return (
        <>
            <Head>
                <title>BitLogic - Programmable Bitcoin Escrow</title>
                <meta name="description" content="Programmable Bitcoin Escrow with ZK Proofs & Cross-Chain Triggers" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
                {/* Header */}
                <header className="border-b border-gray-800 bg-black/50 backdrop-blur-lg">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">B</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">BitLogic</h1>
                                <p className="text-xs text-gray-400">Programmable Bitcoin Escrow</p>
                            </div>
                        </div>

                        <WalletConnect
                            onConnect={() => setWalletConnected(true)}
                            onDisconnect={() => setWalletConnected(false)}
                        />
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Lock BTC. Set Conditions.
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                                {' '}Trigger Actions.
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Create trustless escrows on Bitcoin with ZK-verified conditions.
                            Automatically trigger cross-chain actions on Ethereum when conditions are met.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { label: 'Total Locked', value: '12.5 BTC', icon: '🔒' },
                            { label: 'Active Escrows', value: '47', icon: '📋' },
                            { label: 'Completed', value: '234', icon: '✅' },
                            { label: 'NFTs Minted', value: '189', icon: '🎨' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex space-x-2 mb-8">
                        {[
                            { id: 'create', label: 'Create Escrow', icon: '➕' },
                            { id: 'list', label: 'My Escrows', icon: '📋' },
                            { id: 'monitor', label: 'Status Monitor', icon: '📊' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-gray-800/30 backdrop-blur border border-gray-700 rounded-2xl p-8">
                        {activeTab === 'create' && <EscrowCreator walletConnected={walletConnected} />}
                        {activeTab === 'list' && <EscrowList />}
                        {activeTab === 'monitor' && <StatusMonitor />}
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-800 mt-16 py-8">
                    <div className="container mx-auto px-4 text-center text-gray-400">
                        <p>Built for Encode Club Bitcoin Hackathon 2024</p>
                        <p className="text-sm mt-2">
                            Powered by Charms Protocol + Grail Pro + Ethereum
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
