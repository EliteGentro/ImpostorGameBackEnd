-- Impostor Game Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Words table
CREATE TABLE IF NOT EXISTS words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_words_category_id ON words(category_id);
CREATE INDEX IF NOT EXISTS idx_words_is_active ON words(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- Unique constraint to prevent duplicate words in same category
CREATE UNIQUE INDEX IF NOT EXISTS idx_words_unique_value_per_category 
ON words(category_id, LOWER(value));

-- Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

-- Read-only policies (anonymous access)
CREATE POLICY "Allow anonymous read access to active categories"
ON categories FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Allow anonymous read access to active words"
ON words FOR SELECT
USING (is_active = TRUE);
