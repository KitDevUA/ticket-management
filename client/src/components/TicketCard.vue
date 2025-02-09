<template>
<n-card :class="{ 'tourist-card': isTourist }">
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

<script setup lang="ts">
import { NCard, NSpace, NText, NImage } from 'naive-ui'
import type { Ticket } from '@/types/tickets'

defineProps<{
	ticket: Ticket
	isTourist: boolean
}>()

const formatDate = (date: string) =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
</script>

<style lang="sass" scoped>
.tourist-card
	.title
		font-size: 1.2em

.description
	min-height: 3em
</style>
