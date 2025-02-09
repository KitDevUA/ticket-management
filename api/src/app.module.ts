import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TicketModule } from './tickets/ticket.module';
import {Ticket} from "./tickets/models/ticket.model";
import {UserType} from "./tickets/models/user-type.model";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production',
			port: 8000,
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [],
			useFactory: () => ({
				dialect: 'postgres',
				host: process.env.POSTGRES_HOST,
				port: Number(process.env.POSTGRES_PORT),
				username: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DB,
				synchronize: false,
				timezone: process.env.POSTGRES_TIMEZONE,
				models: [Ticket, UserType],
			}),
		}),
		TicketModule,
	],
})
export class AppModule {}
