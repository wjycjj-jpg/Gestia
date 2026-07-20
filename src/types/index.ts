export type UserRole = 'super_admin' | 'admin' | 'resident' | 'investor';
export type InvoiceStatus = 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled';
export type PaymentStatus = 'pending_verification' | 'approved' | 'rejected';
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'cancelled' | 'paused';
export type Currency = 'USD' | 'VES';
export type PaymentMethod = 'transfer' | 'mobile_payment' | 'cash' | 'card' | 'other';

export interface Profile {
  id: string;
  auth_id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  condominium_id?: string;
  unit_id?: string;
  is_active: boolean;
}

export interface Condominium {
  id: string;
  name: string;
  rif: string;
  address?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
}

export interface Unit {
  id: string;
  condominium_id: string;
  unit_number: string;
  alicuota_percentage: number;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  is_active: boolean;
}

export interface Invoice {
  id: string;
  unit_id: string;
  condominium_id: string;
  period: string;
  amount_ordinary: number;
  amount_extraordinary: number;
  total_usd: number;
  status: InvoiceStatus;
  due_date: string;
  issued_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  unit_id: string;
  amount_usd: number;
  amount_ves: number;
  exchange_rate: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  bank?: string;
  voucher_url?: string;
  notes?: string;
  paid_at: string;
  verified_at?: string;
  verified_by?: string;
}

export interface Project {
  id: string;
  condominium_id: string;
  name: string;
  description?: string;
  total_budget_usd: number;
  status: ProjectStatus;
  progress_percentage: number;
  start_date: string;
  estimated_end_date?: string;
  created_at: string;
}

export interface ExchangeRate {
  id: string;
  source: string;
  rate: number;
  updated_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  condominium_name: string;
  address: string;
  units_count: number;
  notes?: string;
  converted: boolean;
  created_at: string;
}
