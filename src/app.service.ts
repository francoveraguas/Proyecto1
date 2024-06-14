import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPG: Client,
    @Inject('TAREA_ASINC') private tarea: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.port;
    return `La llave de la Aplicacion es: ${apiKey} de la base de datos: ${dbName}. Puerto de Conexion: ${dbPort}`;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return 'Revise la consola, se esta realizando una tarea asincrona...';
  }

  getTareas() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
