import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Resep Rahasia Nastar DapoerDjawa', description: 'Post title' })
  title: string;

  @ApiPropertyOptional({ example: 'Gunakan butter wisman asli...', description: 'Post content' })
  content?: string;

  @ApiProperty({ example: 'user@dapoerdjawa.com', description: 'Author email' })
  authorEmail: string;
}

