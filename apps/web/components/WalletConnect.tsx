import { useState } from 'react';

interface WalletConnectProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

export function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleConnect = async () => {
        // Simulate wallet connection
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate demo address
        const demoAddress = 'bc1q' + Math.random().toString(36).slice(2, 10) + 'xyz';
        setAddress(demoAddress);
        setConnected(true);
        onConnect();
    };

    const handleDisconnect = () => {
        setConnected(false);
        setAddress('');
        setShowDropdown(false);
        onDisconnect();
    };

    if (connected) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 hover:border-purple-500 transition"
                >
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white font-mono text-sm">
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                        <button
                            onClick={handleDisconnect}
                            className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg"
                        >
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
            Connect Wallet
        </button>
    );
}
