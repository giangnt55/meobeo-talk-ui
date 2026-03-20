// Base URL configuration - support both env variable names for compatibility
const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';

type MessageHandler = (data: unknown) => void;

class SocketService {
    private socket: WebSocket | null = null;
    private messageHandlers: MessageHandler[] = [];
    private reconnectInterval: number = 5000;
    private shouldReconnect: boolean = false;
    private reconnectTimeoutId: number | null = null;
    private currentToken: string = '';

    connect(token: string) {
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
            console.log('WebSocket already connected or connecting');
            return;
        }
        
        // Store token for reconnection attempts
        this.currentToken = token;
        
        // Enable automatic reconnection for unexpected disconnects
        this.shouldReconnect = true;
        
        // Construct WS URL
        // The backend WebSocket endpoint is at /api/v1/ws
        // BASE_URL already includes /api/v1, so we just append /ws
        let wsUrl = '';
        if (BASE_URL.startsWith('http')) {
            // Replace http/https with ws/wss and append /ws
            wsUrl = BASE_URL.replace(/^http/, 'ws') + '/ws';
        } else {
            // For relative URLs, construct absolute WebSocket URL
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const host = window.location.host;
            wsUrl = `${protocol}//${host}${BASE_URL}/ws`;
        }
        
        // WebSocket doesn't support custom headers in the browser,
        // so we pass the token as a query parameter
        // The backend auth middleware checks for ?token= parameter for WebSocket connections
        if (token) {
            wsUrl += `?token=${token}`;
        }
        
        console.log('Connecting to WebSocket:', wsUrl.replace(/token=[^&]+/, 'token=***'));
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log('✅ WebSocket connected successfully');
        };

        this.socket.onmessage = (event) => {
            console.log('📨 WebSocket message received:', event.data);
            try {
                const data = JSON.parse(event.data);
                console.log('📨 Parsed message:', data);
                this.messageHandlers.forEach(handler => handler(data));
            } catch (error) {
                console.error('Failed to parse WebSocket message', error);
            }
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket disconnected', { code: event.code, reason: event.reason, wasClean: event.wasClean });
            this.socket = null;
            
            // Only attempt to reconnect if shouldReconnect is true (unexpected disconnect)
            if (this.shouldReconnect) {
                console.log(`Scheduling reconnection in ${this.reconnectInterval / 1000}s...`);
                this.reconnectTimeoutId = window.setTimeout(() => {
                    console.log('Attempting to reconnect...');
                    this.connect(this.currentToken);
                }, this.reconnectInterval);
            } else {
                console.log('Reconnection disabled - not attempting to reconnect');
            }
        };

        this.socket.onerror = (error) => {
            console.error('❌ WebSocket error', error);
        };
    }

    disconnect() {
        console.log('Disconnecting WebSocket (intentional)');
        
        // Disable automatic reconnection
        this.shouldReconnect = false;
        
        // Clear any pending reconnection timers
        if (this.reconnectTimeoutId !== null) {
            clearTimeout(this.reconnectTimeoutId);
            this.reconnectTimeoutId = null;
            console.log('Cleared pending reconnection timer');
        }
        
        // Close the socket
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        
        // Clear the token
        this.currentToken = '';
    }

    onMessage(handler: MessageHandler) {
        this.messageHandlers.push(handler);
        return () => {
            this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
        };
    }
}

export const socketService = new SocketService();
