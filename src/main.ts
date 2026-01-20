import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Allow localhost origins for development
      if (origin.match(/^https?:\/\/localhost(:\d+)?$/)) {
        return callback(null, true);
      }
      
      // Allow your production domain (replace with your actual domain)
      if (origin.match(/^https?:\/\/your-domain\.com$/)) {
        return callback(null, true);
      }
      
      // Allow Vercel deployment
      if (origin === 'https://impostor-game-front-end.vercel.app') {
        return callback(null, true);
      }
      
      // For development, allow common localhost ports
      const allowedOrigins = [
        'http://localhost:5173', // Vite dev server
        'http://localhost:3000', // React dev server
        'http://localhost:4173', // Vite preview
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:4173',
      ];
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Impostor Game API running on http://localhost:${port}`);
}

bootstrap();
