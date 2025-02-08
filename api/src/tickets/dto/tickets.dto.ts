import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TicketCreationAttrs {
	name!: string;
	description!: string;
	date!: Date;
	location!: string;
	user_type!: number;
}

export class UserTypeDto {
	@ApiProperty({
		example: 1,
		description: 'Unique identifier of the user type',
	})
	user_type_id!: number;

	@ApiProperty({ example: 'local', description: 'Name of the user type' })
	name!: string;
}

export class GetTicketsQueryDto {
	@ApiPropertyOptional({
		description: 'Search term for title or description',
		example: 'concert',
	})
	@IsOptional()
	@IsString()
	search?: string;

	@ApiProperty({
		description: 'Page number (required, starts from 1)',
		example: 1,
		minimum: 1,
	})
	@Type(() => Number)
	@IsNotEmpty({ message: 'Page is required' })
	@IsInt({ message: 'Page must be a number' })
	@Min(1, { message: 'Page must be at least 1' })
	page!: number;

	@ApiPropertyOptional({
		description: 'User type filter',
		example: 'local',
		enum: ['local', 'tourist'],
	})
	@IsOptional()
	@IsString({ message: 'User type must be a string' })
	userType?: string;
}

export class TicketResponseDto {
	@ApiProperty({ example: 1, description: 'Unique identifier of the ticket' })
	ticket_id!: number;

	@ApiProperty({ example: 'Concert', description: 'Title of the event' })
	title!: string;

	@ApiProperty({
		example: 'Amazing concert in the city center',
		description: 'Detailed description of the event',
	})
	description!: string;

	@ApiProperty({
		example: '2024-03-15T19:00:00Z',
		description: 'Date and time of the event',
	})
	date!: Date;

	@ApiProperty({
		example: 'City Concert Hall',
		description: 'Location of the event',
	})
	location!: string;

	@ApiProperty({
		example: 'local',
		description: 'Type of user this ticket is intended for',
	})
	user_type!: string;
}

export class TicketsResponseDto {
	@ApiProperty({
		type: [TicketResponseDto],
		description: 'List of ticket items',
	})
	items!: TicketResponseDto[];

	@ApiProperty({
		example: 1,
		description: 'Current page number',
	})
	currentPage!: number;

	@ApiProperty({
		example: 10,
		description: 'Total number of pages',
	})
	totalPages!: number;

	@ApiProperty({
		example: 100,
		description: 'Total number of items',
	})
	totalItems!: number;

	@ApiProperty({
		example: 10,
		description: 'Number of items per page',
	})
	itemsPerPage!: number;

	@ApiProperty({
		example: true,
		description: 'Indicates if there is a next page',
	})
	hasNextPage!: boolean;

	@ApiProperty({
		example: true,
		description: 'Indicates if there is a previous page',
	})
	hasPreviousPage!: boolean;
}
