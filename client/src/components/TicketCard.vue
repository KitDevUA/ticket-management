<template>
<n-card
	class="ticket-card"
	:class="{ 'tourist-card': isTourist }"
	hoverable
	@click="navigateToDetails"
>
	<n-space vertical>
		<n-text strong class="title">{{ ticket.title }}</n-text>
		<n-text :depth="3" class="description">
			{{ ticket.description }}
		</n-text>
		<n-space justify="space-between" align="center">
			<n-text>{{ ticket.location }}</n-text>
			<n-text>{{ formatDate(ticket.date) }}</n-text>
		</n-space>
	</n-space>
</n-card>
</template>

<style lang="sass" scoped>
.ticket-card
	cursor: pointer
</style>

<script setup lang="ts">
import { NCard, NSpace, NText } from 'naive-ui'
import type { Ticket } from '@/types/tickets'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
	ticket: Ticket
	isTourist: boolean
}>()

const formatDate = (date: string) =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const navigateToDetails = () => {
	router.push({
		name: 'ticket-details',
		params: { id: props.ticket.ticket_id }
	})
}
</script>

<style lang="sass" scoped>
.tourist-card
	.title
		font-size: 1.2em

.description
	min-height: 3em
</style>
