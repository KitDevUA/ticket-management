import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaginatedResponse, TicketsFilter } from '@/types/tickets'
import { ticketsApi } from '@/services/api'

export const useTicketsStore = defineStore('tickets', () => {
	const tickets = ref<PaginatedResponse | null>(null)
	const isLoading = ref(false)
	const error = ref<string | null>(null)

	const searchQuery = ref('')
	const userType = ref<'local' | 'tourist'>('local')
	const currentPage = ref(1)

	function updateFilters(filters: Partial<TicketsFilter>) {
		if (filters.search !== undefined) searchQuery.value = filters.search
		if (filters.userType !== undefined) userType.value = filters.userType as 'local' | 'tourist'
		if (filters.page !== undefined) currentPage.value = filters.page
	}

	function resetFilters() {
		searchQuery.value = ''
		userType.value = 'local'
		currentPage.value = 1
	}

	function getFilters(): TicketsFilter {
		return {
			search: searchQuery.value,
			userType: userType.value,
			page: currentPage.value
		}
	}

	async function fetchTickets() {
		try {
			isLoading.value = true
			error.value = null
			tickets.value = await ticketsApi.getTickets(getFilters())
		} catch (e) {
			error.value = 'Failed to load tickets'
			console.error(e)
		} finally {
			isLoading.value = false
		}
	}

	return {
		tickets,
		isLoading,
		error,
		searchQuery,
		userType,
		currentPage,
		updateFilters,
		resetFilters,
		fetchTickets
	}
})
