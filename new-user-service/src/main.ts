import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const kafkaEndpoint = process.env.KAFKA_HOST
  console.log(kafkaEndpoint)
  const consumer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user-service',
          brokers: [kafkaEndpoint],
        },
        consumer: {
          groupId: 'user-consumer3', // declaring consumer here
        },
      },
    },
  );

  await Promise.all([
      consumer.listen(),
      app.listen(3333)
    ]
  )
}
bootstrap();
