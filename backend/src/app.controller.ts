import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ingest')
  ingest() {
    return this.appService.ingest();
  }

  @Post('chat')
  chat(prompt: string) {
    return this.appService.chat(prompt);
  }
  @Post('rename')
  rename(oldName: string, newName: string) {
    return this.appService.rename(oldName, newName);
  }
}
