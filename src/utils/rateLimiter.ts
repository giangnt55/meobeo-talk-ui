class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private timeWindow: number; // milliseconds

  constructor(maxRequests: number = 10, timeWindow: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    // Remove old timestamps outside time window
    const validTimestamps = timestamps.filter(
      time => now - time < this.timeWindow
    );

    if (validTimestamps.length >= this.maxRequests) {
      return false;
    }

    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
    return true;
  }

  getRemainingTime(key: string): number {
    const timestamps = this.requests.get(key) || [];
    if (timestamps.length === 0) return 0;
    
    const oldestTimestamp = timestamps[0];
    const waitTime = this.timeWindow - (Date.now() - oldestTimestamp);
    return Math.max(0, waitTime);
  }
}

export const rateLimiter = new RateLimiter(10, 60000);