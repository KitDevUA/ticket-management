import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { getModelToken } from '@nestjs/sequelize';
import { Ticket } from './models/ticket.model';
import { UserType } from './models/user-type.model';
import { NotFoundException } from '@nestjs/common';

describe('TicketService', () => {
	let service: TicketService;
	let ticketModelMock: { findOne: jest.Mock };
	let userTypeModelMock: { findOne: jest.Mock };

	beforeEach(async () => {
		ticketModelMock = {
			findOne: jest.fn(),
		};

		userTypeModelMock = {
			findOne: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TicketService,
				{ provide: getModelToken(Ticket), useValue: ticketModelMock },
				{
					provide: getModelToken(UserType),
					useValue: userTypeModelMock,
				},
			],
		}).compile();

		service = module.get<TicketService>(TicketService);
	});

	it('should throw NotFoundException if the ticket is not found', async () => {
		ticketModelMock.findOne.mockResolvedValue(null);
		await expect(service.findById(1)).rejects.toThrow(NotFoundException);
	});
});
