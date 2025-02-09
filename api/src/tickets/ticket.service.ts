import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';
import {
	GetTicketsQueryDto,
	TicketResponseDto,
	TicketsResponseDto,
} from './dto/tickets.dto';
import { UserType } from './models/user-type.model';
import { Op } from 'sequelize';

@Injectable()
export class TicketService {
	private readonly ITEMS_PER_PAGE = 12;

	constructor(
		@InjectModel(Ticket)
		private ticketModel: typeof Ticket,
		@InjectModel(UserType)
		private readonly userTypeModel: typeof UserType,
	) {}

	async findById(ticket_id: number): Promise<TicketResponseDto> {
		const ticket = await this.ticketModel.findOne({
			where: { ticket_id },
			include: [
				{
					model: UserType,
					required: true,
					attributes: ['name'],
				},
			],
		});

		if (!ticket) {
			throw new NotFoundException(
				`Ticket with ID ${ticket_id} not found`,
			);
		}

		return this.mapToDto(ticket);
	}

	async findAll(query: GetTicketsQueryDto): Promise<TicketsResponseDto> {
		const { page = 1, search, userType } = query;
		const offset = (page - 1) * this.ITEMS_PER_PAGE;

		const whereClause: any = {};
		if (search) {
			whereClause[Op.or] = [
				{ title: { [Op.iLike]: `%${search}%` } },
				{ description: { [Op.iLike]: `%${search}%` } },
			];
		}

		if (userType) {
			const userTypeRecord = await this.userTypeModel.findOne({
				where: { name: userType },
			});
			if (userTypeRecord) {
				whereClause.user_type_id = userTypeRecord.user_type_id;
			} else {
				throw new BadRequestException('Invalid user type');
			}
		}

		const totalItems = await this.ticketModel.count({ where: whereClause });
		const totalPages = Math.ceil(totalItems / this.ITEMS_PER_PAGE);

		const tickets = await this.ticketModel.findAll({
			where: whereClause,
			include: [
				{
					model: UserType,
					required: true,
					attributes: ['name'],
				},
			],
			limit: this.ITEMS_PER_PAGE,
			offset,
			order: [['date', 'ASC']],
		});

		return {
			items: tickets.map((ticket) => this.mapToDto(ticket)),
			currentPage: page,
			totalPages,
			totalItems,
			itemsPerPage: this.ITEMS_PER_PAGE,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
		};
	}

	private mapToDto(ticket: Ticket): TicketResponseDto {
		return {
			ticket_id: ticket.ticket_id,
			title: ticket.title,
			description: ticket.description,
			date: ticket.date,
			location: ticket.location,
			user_type: ticket.user_type?.name,
		};
	}
}
