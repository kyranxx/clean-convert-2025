import crypto from 'crypto';

export function hashIpAddress(ip: string): string {
  // Use SHA-256 for secure hashing
  return crypto
    .createHash('sha256')
    .update(ip + process.env.IP_HASH_SECRET)
    .digest('hex');
}
