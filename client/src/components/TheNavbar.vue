<template>
	<n-layout-header bordered>
		<n-menu mode="horizontal" :options="menuOptions" />
	</n-layout-header>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NLayoutHeader, NMenu } from 'naive-ui'

const menuOptions = [
	{
		label: () =>
			h(RouterLink, { to: '/' }, { default: () => 'Home' }),
		key: 'home'
	},
	{
		label: () =>
			h(RouterLink, { to: '/tickets' }, { default: () => 'Tickets' }),
		key: 'tickets'
	}
]
</script>
