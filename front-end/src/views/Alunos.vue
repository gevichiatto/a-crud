<template>
	<div class="alunos">
		<div class="table-title">
			<h2>Página dos alunos</h2>
			<b-button v-b-modal.add-modal @click="resetForm()">Adicionar</b-button>
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
					<tr v-for="i in items" :key="`tableRow${i.id}`">
						<td>{{ i.nome }}</td>
						<td>{{ i.endereco }}</td>
						<td style="max-width: 50px"><b-img v-bind="mainProps" :src="i.foto"></b-img></td>
						<td class="clicable">
							<b-icon-pencil class="icon" v-b-modal.edit-modal title="Editar" @click="editModal(i)"></b-icon-pencil>
							<b-icon-trash class="icon" v-b-modal.delete-modal title="Deletar"></b-icon-trash>
						</td>
					</tr>
				</tbody>

			</table>
		</div>
		<b-modal id="add-modal" @ok="submitAdd(form)">
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
					<b-img v-bind="mainProps" :src="url" style="max-width: fit-content;height: 18em;"></b-img>
					<b-form-file
					@change="loadImage"
					accept="image/jpeg"
					id="input-3"
					placeholder="Escolha um arquivo ou arrastre pra cá"
					required
					v-model="image"
					></b-form-file>
				</b-form-group>
				
				<!-- <b-button type="submit" variant="primary">Adicionar</b-button>
				<b-button type="reset" variant="danger">Limpar</b-button> -->
			</b-form>
		</b-modal>
		<!-- <b-modal id="edit-modal" @ok="submitEdit(form)">
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

				<b-form-group id="input-group3" label="Foto:" laber-for="input-3">
					<b-form-file
					@change="loadImage"
					accept="image/jpeg"
					id="input-3"
					placeholder="Escolha um arquivo ou arrastre pra cá"
					required
					v-model="form.foto"
					></b-form-file>
				</b-form-group>
		</b-modal> -->
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
			},
			image: [],
			url: '',
			selectedFile: null,
			obj: []
		}

	},

	created() {
		this.getAlunos()
	},

	methods: {
		async getAlunos() {
			return AlunosRestResource.getAlunos().then(
				(response) => {
					for (var i = 0; i < response.length; i++) {
						var bytes = new Uint8Array(response[i].foto.data);
						var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
						response[i].foto = "data:image/jpeg;base64," + btoa(binary);
					}
					this.items = response 
				}
			)
		},

		async postAluno(aluno) {
			return await AlunosRestResource.postAluno(aluno);
		},

		editModal(element) {
			this.form = JSON.parse(JSON.stringify(element));
		},

		submitEdit(form) {
		},

		async submitAdd(form) {
			const image = await this.convertImage(this.obj);
			form.foto = image.target.result;
			await this.postAluno(form)
		},

		resetForm() {
			this.form = {
				nome: '',
				endereco: '',
				foto: []
			},
			this.selectedFile = null,
			this.url = '',
			this.image = []
		},

		loadImage(evt) {
			evt.preventDefault()
			this.url = URL.createObjectURL(evt.target.files[0]);
			this.obj = evt.target.files[0];
		},

		async convertImage(file) {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = resolve;
				reader.readAsBinaryString(file);
			})
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
