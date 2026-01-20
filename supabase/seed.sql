-- Impostor Game Seed Data
-- Run this after schema.sql

-- Insert Categories
INSERT INTO categories (name, description) VALUES
  ('Animals', 'Living creatures from around the world'),
  ('Food & Drinks', 'Edible items and beverages'),
  ('Movies & TV', 'Films, TV shows, and entertainment'),
  ('Sports', 'Athletic activities and games'),
  ('Countries', 'Nations from around the world'),
  ('Professions', 'Jobs and careers'),
  ('Household Items', 'Things found in a home'),
  ('Vehicles', 'Modes of transportation'),
  ('Music', 'Musical genres, instruments, and artists'),
  ('Nature', 'Natural phenomena and environments')
ON CONFLICT (name) DO NOTHING;

-- Insert Words for Animals
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Dog', 'easy'),
  ('Cat', 'easy'),
  ('Elephant', 'easy'),
  ('Lion', 'easy'),
  ('Tiger', 'easy'),
  ('Penguin', 'easy'),
  ('Dolphin', 'medium'),
  ('Giraffe', 'easy'),
  ('Kangaroo', 'medium'),
  ('Panda', 'easy'),
  ('Koala', 'medium'),
  ('Wolf', 'easy'),
  ('Eagle', 'medium'),
  ('Shark', 'easy'),
  ('Octopus', 'medium'),
  ('Butterfly', 'easy'),
  ('Crocodile', 'medium'),
  ('Hippo', 'medium'),
  ('Owl', 'easy'),
  ('Rabbit', 'easy')
) AS w(value, difficulty)
WHERE c.name = 'Animals';

-- Insert Words for Food & Drinks
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Pizza', 'easy'),
  ('Hamburger', 'easy'),
  ('Sushi', 'medium'),
  ('Pasta', 'easy'),
  ('Ice Cream', 'easy'),
  ('Chocolate', 'easy'),
  ('Coffee', 'easy'),
  ('Orange Juice', 'easy'),
  ('Steak', 'easy'),
  ('Salad', 'easy'),
  ('Sandwich', 'easy'),
  ('Tacos', 'easy'),
  ('Soup', 'easy'),
  ('Bread', 'easy'),
  ('Cheese', 'easy'),
  ('Apple', 'easy'),
  ('Banana', 'easy'),
  ('Cake', 'easy'),
  ('Popcorn', 'easy'),
  ('Pancakes', 'easy')
) AS w(value, difficulty)
WHERE c.name = 'Food & Drinks';

-- Insert Words for Movies & TV
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Star Wars', 'easy'),
  ('Harry Potter', 'easy'),
  ('The Avengers', 'easy'),
  ('Titanic', 'easy'),
  ('The Lion King', 'easy'),
  ('Friends', 'easy'),
  ('Game of Thrones', 'medium'),
  ('Breaking Bad', 'medium'),
  ('The Office', 'easy'),
  ('Stranger Things', 'easy'),
  ('Jurassic Park', 'easy'),
  ('Batman', 'easy'),
  ('Spider-Man', 'easy'),
  ('Frozen', 'easy'),
  ('The Simpsons', 'easy'),
  ('Finding Nemo', 'easy'),
  ('Toy Story', 'easy'),
  ('Shrek', 'easy'),
  ('James Bond', 'medium'),
  ('Indiana Jones', 'medium')
) AS w(value, difficulty)
WHERE c.name = 'Movies & TV';

-- Insert Words for Sports
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Soccer', 'easy'),
  ('Basketball', 'easy'),
  ('Tennis', 'easy'),
  ('Swimming', 'easy'),
  ('Baseball', 'easy'),
  ('Golf', 'easy'),
  ('Boxing', 'easy'),
  ('Hockey', 'easy'),
  ('Volleyball', 'easy'),
  ('Rugby', 'medium'),
  ('Skiing', 'medium'),
  ('Surfing', 'medium'),
  ('Cycling', 'easy'),
  ('Running', 'easy'),
  ('Gymnastics', 'medium'),
  ('Bowling', 'easy'),
  ('Wrestling', 'medium'),
  ('Archery', 'medium'),
  ('Karate', 'medium'),
  ('Skateboarding', 'medium')
) AS w(value, difficulty)
WHERE c.name = 'Sports';

-- Insert Words for Countries
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('United States', 'easy'),
  ('France', 'easy'),
  ('Japan', 'easy'),
  ('Brazil', 'easy'),
  ('Australia', 'easy'),
  ('Germany', 'easy'),
  ('Italy', 'easy'),
  ('Canada', 'easy'),
  ('Mexico', 'easy'),
  ('Spain', 'easy'),
  ('China', 'easy'),
  ('India', 'easy'),
  ('United Kingdom', 'easy'),
  ('Egypt', 'medium'),
  ('Greece', 'medium'),
  ('Russia', 'easy'),
  ('Argentina', 'medium'),
  ('South Africa', 'medium'),
  ('Thailand', 'medium'),
  ('Sweden', 'medium')
) AS w(value, difficulty)
WHERE c.name = 'Countries';

-- Insert Words for Professions
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Doctor', 'easy'),
  ('Teacher', 'easy'),
  ('Firefighter', 'easy'),
  ('Police Officer', 'easy'),
  ('Chef', 'easy'),
  ('Pilot', 'easy'),
  ('Astronaut', 'medium'),
  ('Lawyer', 'easy'),
  ('Scientist', 'easy'),
  ('Artist', 'easy'),
  ('Musician', 'easy'),
  ('Engineer', 'easy'),
  ('Nurse', 'easy'),
  ('Farmer', 'easy'),
  ('Mechanic', 'easy'),
  ('Dentist', 'easy'),
  ('Architect', 'medium'),
  ('Photographer', 'medium'),
  ('Journalist', 'medium'),
  ('Veterinarian', 'medium')
) AS w(value, difficulty)
WHERE c.name = 'Professions';

-- Insert Words for Household Items
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Television', 'easy'),
  ('Refrigerator', 'easy'),
  ('Couch', 'easy'),
  ('Lamp', 'easy'),
  ('Mirror', 'easy'),
  ('Toaster', 'easy'),
  ('Microwave', 'easy'),
  ('Vacuum Cleaner', 'easy'),
  ('Washing Machine', 'easy'),
  ('Bed', 'easy'),
  ('Chair', 'easy'),
  ('Table', 'easy'),
  ('Clock', 'easy'),
  ('Blender', 'easy'),
  ('Pillow', 'easy'),
  ('Blanket', 'easy'),
  ('Towel', 'easy'),
  ('Scissors', 'easy'),
  ('Umbrella', 'easy'),
  ('Candle', 'easy')
) AS w(value, difficulty)
WHERE c.name = 'Household Items';

-- Insert Words for Vehicles
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Car', 'easy'),
  ('Airplane', 'easy'),
  ('Bicycle', 'easy'),
  ('Motorcycle', 'easy'),
  ('Train', 'easy'),
  ('Bus', 'easy'),
  ('Helicopter', 'medium'),
  ('Boat', 'easy'),
  ('Submarine', 'medium'),
  ('Truck', 'easy'),
  ('Taxi', 'easy'),
  ('Ambulance', 'easy'),
  ('Fire Truck', 'easy'),
  ('Tractor', 'easy'),
  ('Scooter', 'easy'),
  ('Yacht', 'medium'),
  ('Rocket', 'medium'),
  ('Skateboard', 'easy'),
  ('Hot Air Balloon', 'medium'),
  ('Canoe', 'medium')
) AS w(value, difficulty)
WHERE c.name = 'Vehicles';

-- Insert Words for Music
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Guitar', 'easy'),
  ('Piano', 'easy'),
  ('Drums', 'easy'),
  ('Violin', 'easy'),
  ('Saxophone', 'medium'),
  ('Trumpet', 'medium'),
  ('Flute', 'easy'),
  ('Rock', 'easy'),
  ('Jazz', 'medium'),
  ('Hip Hop', 'easy'),
  ('Classical', 'medium'),
  ('Pop', 'easy'),
  ('Country', 'easy'),
  ('Electronic', 'medium'),
  ('Blues', 'medium'),
  ('Concert', 'easy'),
  ('Microphone', 'easy'),
  ('Headphones', 'easy'),
  ('Singer', 'easy'),
  ('Band', 'easy')
) AS w(value, difficulty)
WHERE c.name = 'Music';

-- Insert Words for Nature
INSERT INTO words (category_id, value, difficulty)
SELECT c.id, w.value, w.difficulty
FROM categories c
CROSS JOIN (VALUES
  ('Mountain', 'easy'),
  ('Ocean', 'easy'),
  ('Forest', 'easy'),
  ('Desert', 'easy'),
  ('River', 'easy'),
  ('Waterfall', 'easy'),
  ('Beach', 'easy'),
  ('Volcano', 'medium'),
  ('Island', 'easy'),
  ('Lake', 'easy'),
  ('Rainbow', 'easy'),
  ('Thunder', 'easy'),
  ('Snow', 'easy'),
  ('Rain', 'easy'),
  ('Sunrise', 'easy'),
  ('Sunset', 'easy'),
  ('Moon', 'easy'),
  ('Stars', 'easy'),
  ('Tornado', 'medium'),
  ('Earthquake', 'medium')
) AS w(value, difficulty)
WHERE c.name = 'Nature';
