<template>
<n-config-provider>
	<n-layout>
		<TheTheNavbar />
		<n-layout-content>
			<div class="container">
				<router-view />
			</div>
		</n-layout-content>
	</n-layout>
</n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NLayout, NLayoutContent } from 'naive-ui'
import TheTheNavbar from '@/components/TheNavbar.vue'
</script>

<style lang="sass">
.n-page-header
	padding: 0 16px
.container
	max-width: 1100px
	margin: 0 auto
	padding: 20px 16px
</style>
