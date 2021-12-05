<template>
	<div class="home">
		<div class="cards">
			<b-button 
			class="home-btn" 
			title="Alunos" 
			style="margin-right: 2rem;"
			@click="$router.push('Alunos')">
				<b-icon-people scale="5"></b-icon-people>
			</b-button>
			<b-button 
			class="home-btn" 
			disabled 
			title="Notas">
				<b-icon-clipboard-check scale="5"></b-icon-clipboard-check>
			</b-button>
		</div>
		<div class="cards">
			<b-button 
			class="home-btn" 
			disabled 
			title="Classes" 
			style="margin-right: 2rem;">
				<b-icon-collection scale="5"></b-icon-collection>
			</b-button>
			<b-button 
			class="home-btn" 
			disabled 
			title="Notas">
				<b-icon-calendar-week scale="5"></b-icon-calendar-week>
			</b-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	components: {}
}
</script>

<style>
.cards {
	margin-block: 5rem;
}

.home-btn {
	height: 10rem;
	width: 10rem;
	border-radius: 0.8rem !important;
	border-color: unset !important;
	transition: 100ms;
}

.home-btn:hover {
	background-color: orange !important;
	transform: scale(1.1)
}
</style>
