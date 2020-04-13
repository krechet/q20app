<template>
	<div id="app">
		<div class='main-container'>
			<router-view/>
		</div>
	</div>
</template>

<style lang="scss">

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.main-container {

	display: flex;
	max-width: 600px;
	padding-left: 32px;
	padding-right: 32px;
	width: 100%;
	box-sizing: border-box;
	margin-left: auto;
	margin-right: auto;	
	height: calc(var(--vh, 1vh) * 100);		

}

body {
	margin: 0;
}

.wrapper {
		
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 8px;	
}

</style>
