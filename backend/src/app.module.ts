import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodellmService } from './codellm/codellm.service';
import { OllamaService } from './ollama/ollama.service';
import CustomConfigService from './custom-config/custom-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // @ts-expect-error Nest will solve for us
      load: [CustomConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService, CodellmService, OllamaService],
})
export class AppModule {}
