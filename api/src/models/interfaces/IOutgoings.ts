export interface IOutgoingCreateBody {
  userId: number;
  userCardId: number;
  purchase_date: string;
  total_amount: number;
  total_installment_count: number;
  description?: string;
  is_paid?: boolean;
  paid_date?: Date;
}