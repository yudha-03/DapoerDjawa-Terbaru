import { UserService } from './user.service.js';
import { PostService } from './post.service.js';
import { User as UserModel, Post as PostModel } from './generated/prisma/client.js';
import { CreateUserDto } from './dto/user.dto.js';
import { CreatePostDto } from './dto/post.dto.js';
export declare class AppController {
    private readonly userService;
    private readonly postService;
    constructor(userService: UserService, postService: PostService);
    getHello(): {
        status: string;
        message: string;
        timestamp: string;
    };
    getAllUsers(): Promise<UserModel[]>;
    signupUser(userData: CreateUserDto): Promise<UserModel>;
    getPostById(id: string): Promise<PostModel | null>;
    getPublishedPosts(): Promise<PostModel[]>;
    getFilteredPosts(searchString: string): Promise<PostModel[]>;
    createDraft(postData: CreatePostDto): Promise<PostModel>;
    publishPost(id: string): Promise<PostModel>;
    deletePost(id: string): Promise<PostModel>;
}
