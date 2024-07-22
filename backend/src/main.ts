import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
async function bootstrapCLI() {
  const cliName = 'Kuzco';
  const cliExcutable = './bin/kuzco';

  const app = await CommandFactory.createWithoutRunning(AppModule, {
    completion: {
      cmd: cliName,
      nativeShell: {
        executablePath: cliExcutable,
      },
    },
  });
  await CommandFactory.runApplication(app);
}
bootstrap();
bootstrapCLI();
