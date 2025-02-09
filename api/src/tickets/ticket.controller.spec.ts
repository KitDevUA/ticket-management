import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import request from 'supertest';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe('TicketController (e2e)', () => {
	let app: INestApplication;
	let ticketServiceMock: Partial<TicketService>;

	beforeAll(async () => {
		ticketServiceMock = {
			findById: jest.fn(),
			findAll: jest.fn(),
		};

		const moduleFixture: TestingModule = await Test.createTestingModule({
			controllers: [TicketController],
			providers: [
				{ provide: TicketService, useValue: ticketServiceMock },
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('GET /tickets/:id - returns 404 when ticket is not found', async () => {
		(ticketServiceMock.findById as jest.Mock).mockRejectedValueOnce(
			new NotFoundException('Ticket with ID 1 not found'),
		);

		await request(app.getHttpServer()).get('/tickets/1').expect(404);
	});

	it('GET /tickets/:id - returns ticket when found', async () => {
		const sampleTicket = {
			ticket_id: 1,
			title: 'Sample Ticket',
			description: 'Ticket description',
			date: new Date().toISOString(),
			location: 'Test Location',
			user_type: 'Local',
		};

		(ticketServiceMock.findById as jest.Mock).mockResolvedValueOnce(
			sampleTicket,
		);

		const response = await request(app.getHttpServer())
			.get('/tickets/1')
			.expect(200);

		expect(response.body).toEqual(sampleTicket);
	});

	afterAll(async () => {
		await app.close();
	});
});
