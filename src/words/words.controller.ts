import { Controller, Get, Query } from '@nestjs/common';
import { WordsService, WordDto } from './words.service';
import { GetRandomWordDto } from './dto/get-random-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get('random')
  async getRandomWord(@Query() query: GetRandomWordDto): Promise<WordDto> {
    return this.wordsService.getRandomWord(query.categories);
  }
}
