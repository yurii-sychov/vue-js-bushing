<template>
	<AdminLayout />
	<!-- <component v-bind:is="layout"></component> -->
</template>

<script>
	import AdminLayout from '@/layouts/AdminLayout.vue';
	// import AuthLayout from "@/layouts/AuthLayout.vue";

	export default {
		name: 'App',
		computed: {
			layout() {
				console.log(this.$route);
				return this.$route.meta.layout || 'auth-layout';
			},
		},
		components: {
			AdminLayout,
			// AuthLayout
		},
	};
</script>

<style>
	.card-title {
		margin-left: 10px;
	}
	.mt-20 {
		margin-top: 20px;
	}
	.m-1 {
		margin: 1px;
	}
	.m-2 {
		margin: 2px;
	}
	.m-3 {
		margin: 3px;
	}
	.m-4 {
		margin: 4px;
	}
	.m-5 {
		margin: 5px;
	}
	.mx-2 {
		margin: 0 2px;
	}
	.my-2 {
		margin: 2px 0;
	}
	.mt-2 {
		margin-top: 2px;
	}
	.mr-2 {
		margin-right: 2px;
	}
	.mb-2 {
		margin-bottom: 2px;
	}
	.ml-2 {
		margin-left: 2px;
	}
</style>
