<template>
<n-result
	status="404"
	title="No tickets found"
	description="Try changing your search criteria"
>
	<template #footer>
		<n-button @click="$emit('reset')">Reset filters</n-button>
	</template>
</n-result>
</template>

<script setup lang="ts">
import { NResult, NButton } from 'naive-ui'

defineEmits<{
	(e: 'reset'): void
}>()
</script>
