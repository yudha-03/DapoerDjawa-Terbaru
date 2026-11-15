import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { UserService } from './user.service.js';
import { PostService } from './post.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: UserService,
          useValue: {
            users: vi.fn().mockResolvedValue([]),
            createUser: vi.fn(),
          },
        },
        {
          provide: PostService,
          useValue: {
            post: vi.fn(),
            posts: vi.fn().mockResolvedValue([]),
            createPost: vi.fn(),
            updatePost: vi.fn(),
            deletePost: vi.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return welcome health status', () => {
      const result = appController.getHello();
      expect(result.status).toBe('ok');
    });
  });
});
