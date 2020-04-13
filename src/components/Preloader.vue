<template>
	<transition name="fade">
		<div v-if="showPreloader" class="anylook-preloader">
			<svg class="icon-svg icon-preloader"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-preloader"></use></svg>
		</div>
	</transition>
</template>

<script>
	export default {
		name : 'Preloader',
		props : {
			showPreloader : {
				type : Boolean,
				default : false
			}
		}
	}
</script>

<style lang="scss">

	.anylook-preloader {
		background-color: rgba(255,255,255,0.7);
		z-index: 1005;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	
		.icon-preloader {
			-webkit-animation: spin 2s linear infinite;
			animation: spin 2s linear infinite;
			position: absolute;
			top: 8px;
			left: 50%;
			margin-left: -12px;
			width: 24px;
			height: 24px;
		}
	}
</style>