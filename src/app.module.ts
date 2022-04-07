import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './project/project.controller';
import { DatasetController } from './dataset/dataset.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, DatasetController],
  providers: [AppService],
})
export class AppModule {}
