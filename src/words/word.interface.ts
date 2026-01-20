export interface Word {
  id: string;
  value: string;
  categoryId: string;
}

export interface WordEntity {
  id: string;
  category_id: string;
  value: string;
  difficulty: string | null;
  is_active: boolean;
  created_at: string;
}
