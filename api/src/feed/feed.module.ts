import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedService } from './services/feed.service';
import { FeedController } from './controllers/feed.controller';
import { FeedPostEntity } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPostEntity])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
