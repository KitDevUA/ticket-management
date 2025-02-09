<template>
<n-space vertical size="large">
	<n-page-header title="Tickets">
		<template #subtitle>Find your perfect event</template>
	</n-page-header>

	<div class="container">
		<n-card class="top-bar">
			<n-space vertical>
				<n-input-group>
					<n-input
						v-model:value="searchQuery"
						placeholder="Search tickets..."
						clearable
					/>
					<n-select
						v-model:value="userType"
						:options="userTypeOptions"
						placeholder="Select user type"
						style="width: 140px"
					/>
				</n-input-group>
			</n-space>
		</n-card>

		<n-spin :show="ticketsStore.isLoading">
			<template v-if="ticketsStore.tickets?.items.length">
				<n-grid
					:cols="userType === 'local' ? 3 : 1"
					:x-gap="16"
					:y-gap="16"
					responsive="screen"
				>
					<n-grid-item
						v-for="ticket in ticketsStore.tickets.items"
						:key="ticket.ticket_id"
					>
						<TicketCard
							:ticket="ticket"
							:is-tourist="userType === 'tourist'"
						/>
					</n-grid-item>
				</n-grid>

				<div class="bottom-wrapper">
					<n-pagination
						v-model:page="currentPage"
						:page-count="ticketsStore.tickets.totalPages"
						:page-size="ticketsStore.tickets.itemsPerPage"
					/>
				</div>
			</template>
			<EmptyState
				v-else-if="!ticketsStore.isLoading"
				@reset="ticketsStore.resetFilters"
			/>
		</n-spin>
	</div>
</n-space>
</template>

<style lang="sass" scoped>
.top-bar
	margin-bottom: 16px
.bottom-wrapper
	margin-top: 16px
</style>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/tickets'
import { storeToRefs } from 'pinia'
import debounce from 'just-debounce-it';
import TicketCard from '@/components/TicketCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const ticketsStore = useTicketsStore()

const { searchQuery, userType, currentPage } = storeToRefs(ticketsStore)

const userTypeOptions = [
	{ label: 'Local', value: 'local' },
	{ label: 'Tourist', value: 'tourist' }
]

const updateQuery = () => {
	router.replace({
		query: {
			search: searchQuery.value || undefined,
			page: currentPage.value,
			userType: userType.value
		}
	})
}

const initializeFromUrl = () => {
	ticketsStore.updateFilters({
		search: route.query.search?.toString() || '',
		userType: (route.query.userType?.toString() || 'local') as 'local' | 'tourist',
		page: Number(route.query.page) || 1
	})
}

const debouncedFetch = debounce(() => {
	ticketsStore.fetchTickets()
}, 50)

watch([searchQuery, userType, currentPage], () => {
	updateQuery()
	debouncedFetch()
})

watch(
	() => route.query,
	() => {
		initializeFromUrl()
	}
)

onMounted(() => {
	initializeFromUrl()
	ticketsStore.fetchTickets()
})
</script>
