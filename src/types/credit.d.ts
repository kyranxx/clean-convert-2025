export interface Credit {
  id: string;
  userId: string;
  amount: number;
  type: 'BONUS' | 'REFUND' | 'USAGE';
  reason?: string | null;
  createdAt: Date;
}

export interface UserWithCredits {
  id: string;
  email: string;
  credits: number;
  creditHistory: Credit[];
}
