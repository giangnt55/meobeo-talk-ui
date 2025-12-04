export class SecurityMonitor {
  private requestCount = 0;
  private startTime = Date.now();
  private readonly SUSPICIOUS_THRESHOLD = 50; // 50 requests
  private readonly TIME_WINDOW = 10000; // in 10 seconds

  checkSuspiciousActivity(): boolean {
    this.requestCount++;
    const elapsed = Date.now() - this.startTime;

    if (elapsed > this.TIME_WINDOW) {
      this.requestCount = 1;
      this.startTime = Date.now();
      return false;
    }

    if (this.requestCount > this.SUSPICIOUS_THRESHOLD) {
      console.warn('Suspicious activity detected');
      return true;
    }

    return false;
  }
}

export const securityMonitor = new SecurityMonitor();