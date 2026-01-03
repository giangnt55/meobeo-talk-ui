/**
 * Debug utilities for API logging
 * Use these functions in browser console for debugging
 */

export const debugUtils = {
    /**
     * Get all API logs
     */
    getLogs: () => {
        try {
            const logs = JSON.parse(sessionStorage.getItem('api_logs') || '[]');
            console.table(logs);
            return logs;
        } catch (e) {
            console.error('Failed to get logs:', e);
            return [];
        }
    },

    /**
     * Get logs by type
     */
    getLogsByType: (type: 'REQUEST' | 'RESPONSE' | 'ERROR') => {
        const logs = debugUtils.getLogs();
        const filtered = logs.filter((log: any) => log.type === type);
        console.table(filtered);
        return filtered;
    },

    /**
     * Get error logs only
     */
    getErrors: () => {
        return debugUtils.getLogsByType('ERROR');
    },

    /**
     * Get mobile-specific logs
     */
    getMobileLogs: () => {
        const logs = debugUtils.getLogs();
        const mobile = logs.filter((log: any) => log.device === 'MOBILE');
        console.table(mobile);
        return mobile;
    },

    /**
     * Get recent logs (last N entries)
     */
    getRecent: (count: number = 10) => {
        const logs = debugUtils.getLogs();
        const recent = logs.slice(-count);
        console.table(recent);
        return recent;
    },

    /**
     * Clear all logs
     */
    clearLogs: () => {
        sessionStorage.removeItem('api_logs');
        console.log('✅ Logs cleared');
    },

    /**
     * Export logs as JSON file
     */
    exportLogs: () => {
        const logs = debugUtils.getLogs();
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `api-logs-${new Date().toISOString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        console.log('✅ Logs exported');
    },

    /**
     * Get logs for specific URL
     */
    getLogsByUrl: (urlPattern: string) => {
        const logs = debugUtils.getLogs();
        const filtered = logs.filter((log: any) =>
            log.url && log.url.includes(urlPattern)
        );
        console.table(filtered);
        return filtered;
    },

    /**
     * Get network error logs
     */
    getNetworkErrors: () => {
        const logs = debugUtils.getLogs();
        const networkErrors = logs.filter((log: any) => log.networkError === true);
        console.table(networkErrors);
        return networkErrors;
    },

    /**
     * Get logs summary
     */
    getSummary: () => {
        const logs = debugUtils.getLogs();
        const summary = {
            total: logs.length,
            requests: logs.filter((l: any) => l.type === 'REQUEST').length,
            responses: logs.filter((l: any) => l.type === 'RESPONSE').length,
            errors: logs.filter((l: any) => l.type === 'ERROR').length,
            networkErrors: logs.filter((l: any) => l.networkError === true).length,
            mobileRequests: logs.filter((l: any) => l.device === 'MOBILE').length,
            desktopRequests: logs.filter((l: any) => l.device === 'DESKTOP').length,
        };
        console.table(summary);
        return summary;
    },

    /**
     * Watch for new logs in real-time
     */
    watch: () => {
        console.log('👀 Watching for new API logs... (Press Ctrl+C to stop)');
        let lastCount = 0;

        const interval = setInterval(() => {
            const logs = JSON.parse(sessionStorage.getItem('api_logs') || '[]');
            if (logs.length > lastCount) {
                const newLogs = logs.slice(lastCount);
                console.log('🆕 New logs:', newLogs);
                lastCount = logs.length;
            }
        }, 1000);

        // Return stop function
        return () => {
            clearInterval(interval);
            console.log('⏹️ Stopped watching');
        };
    },

    /**
     * Print help
     */
    help: () => {
        console.log(`
🐛 API Debug Utils - Available Commands:

debugUtils.getLogs()              - Get all logs
debugUtils.getLogsByType(type)    - Get logs by type (REQUEST/RESPONSE/ERROR)
debugUtils.getErrors()            - Get error logs only
debugUtils.getMobileLogs()        - Get mobile-specific logs
debugUtils.getRecent(count)       - Get recent N logs (default: 10)
debugUtils.clearLogs()            - Clear all logs
debugUtils.exportLogs()           - Export logs as JSON file
debugUtils.getLogsByUrl(pattern)  - Get logs for specific URL
debugUtils.getNetworkErrors()     - Get network error logs
debugUtils.getSummary()           - Get logs summary
debugUtils.watch()                - Watch for new logs in real-time
debugUtils.help()                 - Show this help

Examples:
  debugUtils.getErrors()
  debugUtils.getLogsByUrl('/auth/login')
  debugUtils.getRecent(5)
  const stopWatching = debugUtils.watch()
  stopWatching() // to stop watching
    `);
    }
};

// Make it available globally for console access
if (typeof window !== 'undefined') {
    (window as any).debugUtils = debugUtils;
    console.log('🐛 Debug utils loaded! Type "debugUtils.help()" for available commands');
}
