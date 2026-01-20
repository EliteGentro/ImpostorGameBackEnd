import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRandomWordDto {
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    return value;
  })
  categories?: string[];
}
