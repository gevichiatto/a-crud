<template>
	<div class="alunos">
		<div class="table-title">
			<h2>Página dos alunos</h2>
			<b-button v-b-modal.add-modal>Adicionar</b-button>
		</div>
		<div>
			<table class="table">
				<thead>
					<tr>
						<th>Nome</th>
						<th>Endereço</th>
						<th>Foto</th>
						<th>Ação</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in items" :key="i">
						<td>{{ i.nome }}</td>
						<td>{{ i.endereco }}</td>
						<td>{{ i.foto }}</td>
						<td class="clicable">
							<b-icon-pencil class="icon" v-b-modal.edit-modal title="Editar"></b-icon-pencil>
							<b-icon-trash class="icon" v-b-modal.delete-modal title="Deletar"></b-icon-trash>
						</td>
					</tr>
				</tbody>

			</table>
		</div>
		<b-modal id="add-modal">
			<b-form>
				<b-form-group
					id="input-group-1"
					label="Nome do(a) Aluno(a):"
					label-for="input-1"
				>
					<b-form-input
					id="input-1"
					v-model="form.email"
					type="email"
					placeholder="Nome Completo"
					required
					></b-form-input>
				</b-form-group>

				<b-form-group id="input-group-2" label="Endereço:" label-for="input-2">
					<b-form-input
					id="input-2"
					v-model="form.name"
					placeholder="Endereço"
					required
					></b-form-input>
				</b-form-group>

				<b-form-group id="input-group3" label="Foto" laber-for="input-3">
					<b-form-file 
					accept="image/jpeg"
					id="input-3"
					placeholder="Escolha um arquivo ou arrastre pra cá"
					required
					></b-form-file>
				</b-form-group>
				
				<!-- <b-button type="submit" variant="primary">Adicionar</b-button>
				<b-button type="reset" variant="danger">Limpar</b-button> -->
			</b-form>
		</b-modal>
		<b-modal id="edit-modal">Modal Edição</b-modal>
		<b-modal id="delete-modal">Modal Deletar</b-modal>
	</div>
</template>


<script>
export default ({
	data() {
		return {
			items: [
				{ foto: 40, nome: 'Dickerson', endereco: 'Macdonald' },
          		{ foto: 21, nome: 'Larsen', endereco: 'Shaw' },
          		{ foto: 89, nome: 'Geneva', endereco: 'Wilson' },
          		{ foto: 38, nome: 'Jami', endereco: 'Carney' }
			],
			form: {
				email: '',
				name: '',
				food: null,
				checked: []
			},
			foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
			show: true
		}

	}
})
</script>

<style>
.table-title {
	display: flex;
    justify-content: space-between;
}

.clicable {
	cursor: pointer;
}

.icon {
	margin-right: 1rem;
}

.icon:hover {
	color: orange;
}
</style>
