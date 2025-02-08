import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import {
	GetTicketsQueryDto,
	TicketResponseDto,
	TicketsResponseDto,
} from './dto/tickets.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketController {
	constructor(private readonly ticketService: TicketService) {}

	@Get(':id')
	@ApiOperation({ summary: 'Get ticket by ID' })
	@ApiParam({ name: 'id', required: true, description: 'Ticket ID' })
	@ApiResponse({
		status: 200,
		description: 'Returns ticket information',
		type: TicketResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: 'Ticket not found',
	})
	async getTicketById(
		@Param('id', new ParseIntPipe()) ticket_id: number,
	): Promise<TicketResponseDto> {
		return await this.ticketService.findById(ticket_id);
	}

	@Get()
	@ApiOperation({ summary: 'Get paginated list of tickets' })
	@ApiResponse({
		status: 200,
		description: 'Returns paginated list of tickets',
		type: TicketsResponseDto,
	})
	async getTickets(
		@Query() query: GetTicketsQueryDto,
	): Promise<TicketsResponseDto> {
		return this.ticketService.findAll(query);
	}
}
