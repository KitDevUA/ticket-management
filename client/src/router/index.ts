import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicketsView from '@/views/TicketsView.vue'
import TicketDetailsView from '@/views/TicketDetailsView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/tickets',
			name: 'tickets',
			component: TicketsView
		},
		{
			path: '/tickets/:id',
			name: 'ticket-details',
			component: TicketDetailsView,
			props: true
		}
	]
})

export default router
