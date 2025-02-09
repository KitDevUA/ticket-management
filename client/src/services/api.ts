import axios from 'axios'
import type { PaginatedResponse, TicketsFilter } from '@/types/tickets'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

export const ticketsApi = {
	async getTickets(params: TicketsFilter): Promise<PaginatedResponse> {
		const { data } = await api.get('/tickets', { params })
		return data
	}
}
