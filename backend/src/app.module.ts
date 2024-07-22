import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodellmService } from './codellm/codellm.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CodellmService],
})
export class AppModule {}
