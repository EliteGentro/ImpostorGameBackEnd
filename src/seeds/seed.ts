import { AppDataSource } from '../../data-source';
import { Category } from '../categories/entities/category.entity';
import { Word } from '../words/entities/word.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const categoryRepository = AppDataSource.getRepository(Category);
    const wordRepository = AppDataSource.getRepository(Word);

    // Clear existing data
    await wordRepository.createQueryBuilder().delete().execute();
    await categoryRepository.createQueryBuilder().delete().execute();
    console.log('Cleared existing data');

    // Seed categories
    const categories = [
      { name: 'Animals', description: 'Animals and creatures' },
      { name: 'Food', description: 'Food and beverages' },
      { name: 'Sports', description: 'Sports and activities' },
      { name: 'Technology', description: 'Technology and gadgets' },
      { name: 'Professions', description: 'Jobs and careers' },
      { name: 'Countries', description: 'Countries and places' },
      { name: 'Movies', description: 'Movies and entertainment' },
      { name: 'Music', description: 'Music and instruments' },
    ];

    const savedCategories = await categoryRepository.save(categories);
    console.log(`Seeded ${savedCategories.length} categories`);

    // Helper function to create words for a category
    const createWords = (categoryName: string, wordList: string[]) => {
      const category = savedCategories.find((c) => c.name === categoryName);
      if (!category) return [];
      return wordList.map((value) => ({
        value,
        categoryId: category.id,
        difficulty: 'medium',
        isActive: true,
      }));
    };

    // Seed words
    const allWords = [
      ...createWords('Animals', [
        'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Penguin', 'Dolphin', 
        'Kangaroo', 'Panda', 'Zebra', 'Monkey', 'Eagle', 'Shark',
        'Butterfly', 'Crocodile', 'Octopus', 'Wolf', 'Fox', 'Bear',
        'Rabbit', 'Squirrel', 'Parrot', 'Snake', 'Turtle', 'Owl',
      ]),
      ...createWords('Food', [
        'Pizza', 'Burger', 'Sushi', 'Pasta', 'Salad', 'Steak',
        'Taco', 'Sandwich', 'Ice Cream', 'Cake', 'Cookie', 'Donut',
        'Coffee', 'Tea', 'Juice', 'Smoothie', 'Soup', 'Rice',
        'Noodles', 'Chicken', 'Fish', 'Cheese', 'Bread', 'Fruit',
      ]),
      ...createWords('Sports', [
        'Soccer', 'Basketball', 'Tennis', 'Baseball', 'Golf', 'Swimming',
        'Running', 'Cycling', 'Boxing', 'Wrestling', 'Skiing', 'Surfing',
        'Volleyball', 'Hockey', 'Cricket', 'Rugby', 'Bowling', 'Archery',
        'Fencing', 'Gymnastics', 'Yoga', 'Karate', 'Judo', 'Climbing',
      ]),
      ...createWords('Technology', [
        'Computer', 'Smartphone', 'Tablet', 'Laptop', 'Keyboard', 'Mouse',
        'Monitor', 'Printer', 'Scanner', 'Camera', 'Headphones', 'Speaker',
        'Router', 'Modem', 'Server', 'Database', 'Algorithm', 'Software',
        'Hardware', 'Internet', 'Website', 'Application', 'Cloud', 'AI',
      ]),
      ...createWords('Professions', [
        'Doctor', 'Teacher', 'Engineer', 'Lawyer', 'Chef', 'Artist',
        'Musician', 'Actor', 'Writer', 'Journalist', 'Scientist', 'Nurse',
        'Pilot', 'Architect', 'Designer', 'Programmer', 'Accountant', 'Manager',
        'Firefighter', 'Police Officer', 'Farmer', 'Mechanic', 'Plumber', 'Electrician',
      ]),
      ...createWords('Countries', [
        'USA', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'UK',
        'France', 'Germany', 'Italy', 'Spain', 'Russia', 'China',
        'Japan', 'India', 'Australia', 'Egypt', 'Nigeria', 'Kenya',
        'Turkey', 'Greece', 'Netherlands', 'Sweden', 'Norway', 'Switzerland',
      ]),
      ...createWords('Movies', [
        'Avatar', 'Titanic', 'Inception', 'Interstellar', 'Gladiator', 'Matrix',
        'Joker', 'Batman', 'Superman', 'Spiderman', 'Avengers', 'Ironman',
        'Thor', 'Frozen', 'Toy Story', 'Shrek', 'Finding Nemo', 'Up',
        'Wall-E', 'Ratatouille', 'Coco', 'Moana', 'Encanto', 'Zootopia',
      ]),
      ...createWords('Music', [
        'Piano', 'Guitar', 'Drums', 'Violin', 'Flute', 'Trumpet',
        'Saxophone', 'Clarinet', 'Cello', 'Harp', 'Organ', 'Accordion',
        'Harmonica', 'Banjo', 'Ukulele', 'Trombone', 'Tuba', 'Xylophone',
        'Tambourine', 'Maracas', 'Bongos', 'Synthesizer', 'DJ', 'Conductor',
      ]),
    ];

    const savedWords = await wordRepository.save(allWords);
    console.log(`Seeded ${savedWords.length} words`);

    await AppDataSource.destroy();
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seed();
