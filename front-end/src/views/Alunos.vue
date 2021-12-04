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
						<td style="max-width: 50px"><b-img v-bind="mainProps" :src="i.foto"></b-img></td>
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
					v-model="form.nome"
					type="email"
					placeholder="Nome Completo"
					required
					></b-form-input>
				</b-form-group>

				<b-form-group id="input-group-2" label="Endereço:" label-for="input-2">
					<b-form-input
					id="input-2"
					v-model="form.endereco"
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
import AlunosRestResource from '../services/alunos';

export default ({
	data() {
		return {
			items: [],
			form: {
				nome: '',
				edereco: '',
				foto: []
			},
			show: true,
			mainProps: {
				center: true,
				fluidGrow: true,
			}
		}

	},

	created() {
		this.getAlunos()
	},

	methods: {
		async getAlunos() {
			return AlunosRestResource.getAlunos().then(
				(response) => {
					console.log("Response: ", response)
					for (var i = 0; i < response.length; i++) {
						var bytes = new Uint8Array(response[i].foto.data);
						var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
						response[i].foto = "data:image/jpeg;base64," + btoa(binary); 
					}
					this.items = response 
				}
			)
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
