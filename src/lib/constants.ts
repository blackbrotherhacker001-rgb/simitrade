export const ADMIN_WALLET_ADDRESS = '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1';
export const USER_WALLET_ADDRESS = '0x1234567890AbCdEf1234567890aBcDeF12345678';

// This object is used to SEED the database.
// The login form SIMULATION also depends on the Default User and Admin User entries.
export const MOCK_USERS: Record<string, { name: string; balance: number; lastLoginAt: string; }> = {
    '0x1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa': { name: 'Satoshi Nakamoto', balance: 980000, lastLoginAt: '2025-08-23T14:07:03Z' },
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': { name: 'Vitalik Buterin', balance: 450000, lastLoginAt: '2025-08-23T13:07:03Z' },
    '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2': { name: 'Charles Hoskinson', balance: 250000, lastLoginAt: '2025-08-22T18:30:00Z' },
    '0x742d35Cc6634C0532925a3b844Bc454e4438f44e': { name: 'Gavin Wood', balance: 150000, lastLoginAt: '2025-08-21T11:45:00Z' },
    '0x503828976D22510aad0201ac7EC88293211D23Da': { name: 'Barry Silbert', balance: 75000, lastLoginAt: '2025-08-20T09:00:00Z' },
    '0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503': { name: 'Michael Saylor', balance: 125000, lastLoginAt: '2025-08-19T10:00:00Z' },
    [ADMIN_WALLET_ADDRESS]: { name: 'Admin User', balance: 1000000, lastLoginAt: new Date().toISOString() },
    [USER_WALLET_ADDRESS]: { name: 'Default User', balance: 10000, lastLoginAt: new Date().toISOString() },
};
