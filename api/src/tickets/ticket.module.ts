import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { UserType } from './models/user-type.model';
import { Ticket } from './models/ticket.model';

@Module({
	controllers: [TicketController],
	providers: [TicketService],
	imports: [SequelizeModule.forFeature([UserType, Ticket])],
})
export class TicketModule {}
