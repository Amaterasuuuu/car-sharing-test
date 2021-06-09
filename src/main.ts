import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { json, urlencoded } from 'express'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  const config = new DocumentBuilder()
    .setTitle('Car sharing API documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  const port = process.env.PORT
  await app.listen(port, () => Logger.log(`Server has been started on http://localhost:${port}`, 'Bootstrap'))
}

bootstrap()
