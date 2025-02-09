export interface Ticket {
	ticket_id: number
	title: string
	description: string
	date: string
	location: string
	user_type: string
}

export interface PaginatedResponse {
	items: Ticket[]
	currentPage: number
	totalPages: number
	totalItems: number
	itemsPerPage: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export interface TicketsFilter {
	search?: string
	page: number
	userType: 'local' | 'tourist'
}
