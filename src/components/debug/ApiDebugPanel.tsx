import { useState, useEffect } from 'react';
import './ApiDebugPanel.css';

interface ApiLog {
    timestamp: string;
    type: 'REQUEST' | 'RESPONSE' | 'ERROR';
    device: 'MOBILE' | 'DESKTOP';
    userAgent: string;
    online: boolean;
    details?: unknown;
}

export const ApiDebugPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState<ApiLog[]>([]);
    const [filter, setFilter] = useState<'ALL' | 'REQUEST' | 'RESPONSE' | 'ERROR'>('ALL');

    const loadLogs = () => {
        try {
            const storedLogs = JSON.parse(sessionStorage.getItem('api_logs') || '[]');
            setLogs(Array.isArray(storedLogs) ? storedLogs.reverse() : []); // Show newest first
        } catch (e) {
            console.error('Failed to load logs:', e);
            setLogs([]);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const rafId = window.requestAnimationFrame(loadLogs);
            const interval = setInterval(() => {
                window.requestAnimationFrame(loadLogs);
            }, 1000); // Refresh every second
            return () => {
                window.cancelAnimationFrame(rafId);
                clearInterval(interval);
            };
        }
        return;
    }, [isOpen]);

    const clearLogs = () => {
        sessionStorage.removeItem('api_logs');
        setLogs([]);
    };

    const exportLogs = () => {
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `api-logs-${new Date().toISOString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const filteredLogs = filter === 'ALL' ? logs : logs.filter(log => log.type === filter);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="debug-panel-trigger"
                title="Open API Debug Panel"
            >
                🐛 API Logs ({logs.length})
            </button>
        );
    }

    return (
        <div className="debug-panel-overlay">
            <div className="debug-panel">
                <div className="debug-panel-header">
                    <h3>API Debug Panel</h3>
                    <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
                </div>

                <div className="debug-panel-controls">
                    <div className="filter-buttons">
                        {(['ALL', 'REQUEST', 'RESPONSE', 'ERROR'] as const).map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`filter-btn ${filter === type ? 'active' : ''}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="action-buttons">
                        <button onClick={loadLogs} className="action-btn">🔄 Refresh</button>
                        <button onClick={exportLogs} className="action-btn">💾 Export</button>
                        <button onClick={clearLogs} className="action-btn danger">🗑️ Clear</button>
                    </div>
                </div>

                <div className="debug-panel-content">
                    {filteredLogs.length === 0 ? (
                        <div className="no-logs">No logs available</div>
                    ) : (
                        filteredLogs.map((log, index) => (
                            <div key={index} className={`log-entry log-${log.type.toLowerCase()}`}>
                                <div className="log-header">
                                    <span className="log-type">{log.type}</span>
                                    <span className="log-device">{log.device}</span>
                                    <span className="log-time">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    <span className={`log-online ${log.online ? 'online' : 'offline'}`}>
                                        {log.online ? '🟢 Online' : '🔴 Offline'}
                                    </span>
                                </div>
                                <div className="log-details">
                                    <pre>{JSON.stringify(log, null, 2)}</pre>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
