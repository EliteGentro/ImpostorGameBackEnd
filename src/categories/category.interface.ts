export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryEntity {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}
