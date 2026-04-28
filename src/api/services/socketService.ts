// Base URL configuration - support both env variable names for compatibility
const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';

type MessageHandler = (data: unknown) => void;

class SocketService {
    private socket: WebSocket | null = null;
    private messageHandlers: MessageHandler[] = [];
    private shouldReconnect: boolean = false;
    private reconnectTimeoutId: number | null = null;
    private currentToken: string = '';

    // Exponential backoff settings
    private reconnectAttempts: number = 0;
    private readonly baseReconnectInterval: number = 3000;  // 3s initial
    private readonly maxReconnectInterval: number = 30000;  // 30s max
    private readonly maxReconnectAttempts: number = 10;      // give up after 10 attempts

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

        try {
            this.socket = new WebSocket(wsUrl);
        } catch (err) {
            console.warn('WebSocket construction failed:', err);
            this.scheduleReconnect();
            return;
        }

        this.socket.onopen = () => {
            console.log('✅ WebSocket connected successfully');
            // Reset backoff on successful connection
            this.reconnectAttempts = 0;
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
                this.scheduleReconnect();
            } else {
                console.log('Reconnection disabled - not attempting to reconnect');
            }
        };

        this.socket.onerror = (error) => {
            // Only warn, don't error - the onclose handler will handle reconnection
            console.warn('⚠️ WebSocket connection issue', error);
        };
    }

    private scheduleReconnect() {
        if (!this.shouldReconnect) return;

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.warn(`WebSocket: giving up after ${this.maxReconnectAttempts} attempts. Notifications will use REST API only.`);
            this.shouldReconnect = false;
            return;
        }

        // Exponential backoff: 3s, 6s, 12s, 24s, 30s, 30s, ...
        const delay = Math.min(
            this.baseReconnectInterval * Math.pow(2, this.reconnectAttempts),
            this.maxReconnectInterval
        );
        this.reconnectAttempts++;

        console.log(`Scheduling reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay / 1000}s...`);
        this.reconnectTimeoutId = window.setTimeout(() => {
            console.log(`Attempting to reconnect (attempt ${this.reconnectAttempts})...`);
            this.connect(this.currentToken);
        }, delay);
    }

    disconnect() {
        console.log('Disconnecting WebSocket (intentional)');
        
        // Disable automatic reconnection
        this.shouldReconnect = false;
        
        // Reset reconnect state
        this.reconnectAttempts = 0;
        
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
