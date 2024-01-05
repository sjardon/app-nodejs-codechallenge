import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';
import { MicroservicesClientModule } from './microservices-client/microservices-client.module';
import { MicroservicesClientService } from './microservices-client/services/microservices-client.service';
import { ClientProxyFactory } from '@nestjs/microservices';
@Module({
  controllers: [],
  providers: [
    {
      provide: 'ANTI_FRAUD_PRODUCER',
      useFactory: (microservicesClientService: MicroservicesClientService) => {
        const microservicesClientOptions =
          microservicesClientService.getOptions();
        return ClientProxyFactory.create(microservicesClientOptions);
      },
      inject: [MicroservicesClientService],
    },
  ],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    MicroservicesClientModule,
  ],
  exports: ['ANTI_FRAUD_PRODUCER'],
})
export class CommonModule {}
