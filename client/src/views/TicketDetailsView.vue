<template>
<n-space vertical size="large">
	<n-page-header title="Ticket Details">
		<template #extra>
			<n-button @click="router.back()">
				Back
			</n-button>
		</template>
	</n-page-header>

	<div class="container">
		<n-spin :show="ticketStore.isLoading">
			<template v-if="ticketStore.currentTicket">
				<n-card>
					<n-space vertical size="large">
						<n-h1>{{ ticketStore.currentTicket.title }}</n-h1>

						<n-space justify="space-between">
							<n-tag size="large">
								{{ ticketStore.currentTicket.user_type }}
							</n-tag>
							<n-text>{{ formatDate(ticketStore.currentTicket.date) }}</n-text>
						</n-space>

						<n-text>{{ ticketStore.currentTicket.description }}</n-text>

						<n-divider />

						<n-space>
							<n-text strong>Location:</n-text>
							<n-text>{{ ticketStore.currentTicket.location }}</n-text>
						</n-space>
					</n-space>
				</n-card>
			</template>
		</n-spin>
	</div>
</n-space>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/tickets'

const route = useRoute()
const router = useRouter()
const ticketStore = useTicketsStore()

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('uk-UA', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
}

onMounted(() => {
	ticketStore.fetchTicketById(Number(route.params.id))
})
</script>
