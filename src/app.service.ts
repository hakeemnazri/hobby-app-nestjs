import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly loggerService: LoggerService) {}
  getHello(): string {
    this.loggerService.log('hello from logger!', 'AppService -> getHello()');
    return 'Hello World!';
  }
}
