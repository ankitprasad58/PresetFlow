// src/ai/dto/generate-content.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class GenerateContentDto {
  @IsString()
  prompt!: string;

  @IsOptional()
  @IsString()
  template?: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsEnum(['draft', 'completed', 'archived'])
  status?: string;
}