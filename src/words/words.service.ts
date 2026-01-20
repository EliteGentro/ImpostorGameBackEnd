import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Word } from './entities/word.entity';

export interface WordDto {
  id: string;
  value: string;
  categoryId: string;
}

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async getRandomWord(categoryIds?: string[]): Promise<WordDto> {
    const queryBuilder = this.wordRepository
      .createQueryBuilder('word')
      .where('word.isActive = :isActive', { isActive: true });

    if (categoryIds && categoryIds.length > 0) {
      queryBuilder.andWhere('word.categoryId IN (:...categoryIds)', {
        categoryIds,
      });
    }

    const words = await queryBuilder.getMany();

    if (!words || words.length === 0) {
      throw new NotFoundException('No words found for the selected categories');
    }

    // Random selection
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    return {
      id: randomWord.id,
      value: randomWord.value,
      categoryId: randomWord.categoryId,
    };
  }
}
