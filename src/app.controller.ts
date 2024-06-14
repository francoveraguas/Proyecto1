import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getEnvs(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Envs: ${apiKey} ${name}`;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('useFactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }

  @Get('operativo')
  getEstoyFuncionando(): string {
    return 'Me siento OK!';
  }

  @Get('tareas')
  getTareas() {
    return this.appService.getTareas();
  }
}
