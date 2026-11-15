import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service.js';
import { PostService } from './post.service.js';
import { User as UserModel, Post as PostModel } from './generated/prisma/client.js';
import { CreateUserDto } from './dto/user.dto.js';
import { CreatePostDto } from './dto/post.dto.js';

@ApiTags('DapoerDjawa API')
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'API Health Check' })
  @ApiResponse({ status: 200, description: 'Backend service status' })
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'ok',
      message: 'Welcome to DapoerDjawa API (NestJS + Prisma v7 + Swagger)',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Post('user')
  @ApiOperation({ summary: 'Register a new user' })
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  async getPostById(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get all published posts' })
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  @ApiOperation({ summary: 'Filter posts by title or content search string' })
  @ApiParam({ name: 'searchString', type: 'string', example: 'nastar' })
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString, mode: 'insensitive' },
          },
          {
            content: { contains: searchString, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  @Post('post')
  @ApiOperation({ summary: 'Create a draft post' })
  async createDraft(@Body() postData: CreatePostDto): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  @ApiOperation({ summary: 'Publish a draft post by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
