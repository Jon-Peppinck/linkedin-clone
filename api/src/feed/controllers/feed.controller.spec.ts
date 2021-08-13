import { Test, TestingModule } from '@nestjs/testing';

import { DeleteResult, UpdateResult } from 'typeorm';
const httpMocks = require('node-mocks-http');

import { FeedController } from './feed.controller';
import { FeedService } from '../services/feed.service';
import { UserService } from '../../auth/services/user.service';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { User } from '../../auth/models/user.class';
import { FeedPost } from '../models/post.interface';

describe('FeedController', () => {
  let feedController: FeedController;
  let feedService: FeedService;
  let userService: UserService;

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = new User();
  mockRequest.user.firstName = 'Jon';

  const mockFeedPost: FeedPost = {
    body: 'body',
    createdAt: new Date(),
    author: mockRequest.user,
  };

  const mockFeedPosts: FeedPost[] = [
    mockFeedPost,
    { ...mockFeedPost, body: 'second feed post' },
    { ...mockFeedPost, body: 'third feed post' },
  ];

  const mockDeleteResult: DeleteResult = {
    raw: [],
    affected: 1,
  };

  const mockUpdateResult: UpdateResult = {
    ...mockDeleteResult,
    generatedMaps: [],
  };

  const mockFeedService = {
    createPost: jest
      .fn()
      .mockImplementation((user: User, feedPost: FeedPost) => {
        return {
          id: 1,
          ...feedPost,
        };
      }),
    findPosts: jest
      .fn()
      .mockImplementation((numberToTake: number, numberToSkip: number) => {
        const feedPostsAfterSkipping = mockFeedPosts.slice(numberToSkip);
        const filteredFeedPosts = feedPostsAfterSkipping.slice(0, numberToTake);
        return filteredFeedPosts;
      }),
    updatePost: jest.fn().mockImplementation(() => {
      return mockUpdateResult;
    }),
    deletePost: jest.fn().mockImplementation(() => {
      return mockDeleteResult;
    }),
  };
  const mockUserService = {};

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        FeedService,
        { provide: UserService, useValue: mockUserService },
        {
          provide: JwtGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: IsCreatorGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(FeedService)
      .useValue(mockFeedService)
      .compile();

    feedService = moduleRef.get<FeedService>(FeedService);
    userService = moduleRef.get<UserService>(UserService);

    feedController = moduleRef.get<FeedController>(FeedController);
  });

  it('should be defined', () => {
    expect(feedController).toBeDefined();
  });

  it('should create a feed post', () => {
    expect(feedController.create(mockFeedPost, mockRequest)).toEqual({
      id: expect.any(Number),
      ...mockFeedPost,
    });
  });

  it('should get 2 feed posts, skipping the first', () => {
    expect(feedController.findSelected(2, 1)).toEqual(mockFeedPosts.slice(1));
  });

  it('should update a feed post', () => {
    expect(
      feedController.update(1, { ...mockFeedPost, body: 'updated body' }),
    ).toEqual(mockUpdateResult);
  });

  it('should delete a feed post', () => {
    expect(feedController.delete(1)).toEqual(mockDeleteResult);
  });
});
