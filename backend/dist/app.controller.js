var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Param, Post, Body, Put, Delete, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service.js';
import { PostService } from './post.service.js';
import { CreateUserDto } from './dto/user.dto.js';
import { CreatePostDto } from './dto/post.dto.js';
let AppController = class AppController {
    userService;
    postService;
    constructor(userService, postService) {
        this.userService = userService;
        this.postService = postService;
    }
    getHello() {
        return {
            status: 'ok',
            message: 'Welcome to DapoerDjawa API (NestJS + Prisma v7 + Swagger)',
            timestamp: new Date().toISOString(),
        };
    }
    async getAllUsers() {
        return this.userService.users({});
    }
    async signupUser(userData) {
        return this.userService.createUser(userData);
    }
    async getPostById(id) {
        return this.postService.post({ id: Number(id) });
    }
    async getPublishedPosts() {
        return this.postService.posts({
            where: { published: true },
        });
    }
    async getFilteredPosts(searchString) {
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
    async createDraft(postData) {
        const { title, content, authorEmail } = postData;
        return this.postService.createPost({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        });
    }
    async publishPost(id) {
        return this.postService.updatePost({
            where: { id: Number(id) },
            data: { published: true },
        });
    }
    async deletePost(id) {
        return this.postService.deletePost({ id: Number(id) });
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'API Health Check' }),
    ApiResponse({ status: 200, description: 'Backend service status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHello", null);
__decorate([
    Get('users'),
    ApiOperation({ summary: 'Get all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllUsers", null);
__decorate([
    Post('user'),
    ApiOperation({ summary: 'Register a new user' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signupUser", null);
__decorate([
    Get('post/:id'),
    ApiOperation({ summary: 'Get post by ID' }),
    ApiParam({ name: 'id', type: 'number', example: 1 }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPostById", null);
__decorate([
    Get('feed'),
    ApiOperation({ summary: 'Get all published posts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPublishedPosts", null);
__decorate([
    Get('filtered-posts/:searchString'),
    ApiOperation({ summary: 'Filter posts by title or content search string' }),
    ApiParam({ name: 'searchString', type: 'string', example: 'nastar' }),
    __param(0, Param('searchString')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getFilteredPosts", null);
__decorate([
    Post('post'),
    ApiOperation({ summary: 'Create a draft post' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createDraft", null);
__decorate([
    Put('publish/:id'),
    ApiOperation({ summary: 'Publish a draft post by ID' }),
    ApiParam({ name: 'id', type: 'number', example: 1 }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "publishPost", null);
__decorate([
    Delete('post/:id'),
    ApiOperation({ summary: 'Delete a post by ID' }),
    ApiParam({ name: 'id', type: 'number', example: 1 }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deletePost", null);
AppController = __decorate([
    ApiTags('DapoerDjawa API'),
    Controller(),
    __metadata("design:paramtypes", [UserService,
        PostService])
], AppController);
export { AppController };
//# sourceMappingURL=app.controller.js.map