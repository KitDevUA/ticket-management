import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TicketModule } from './tickets/ticket.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../.env',
		}),
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production',
			port: 8000,
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: 'postgres',
				host: configService.get('POSTGRES_HOST'),
				port: configService.get<number>('POSTGRES_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				autoLoadModels: true,
				synchronize: false,
				timezone: configService.get('POSTGRES_TIMEZONE'),
				define: {
					timestamps: false,
				},
			}),
		}),
		TicketModule,
	],
})
export class AppModule {}
