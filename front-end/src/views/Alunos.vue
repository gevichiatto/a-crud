<template>
	<div class="alunos">
		<div class="wrapper">
			<b-container fluid>
				<div class="table-title">
					<h2>Listagem de Alunos</h2>
					<b-button class="add-aluno-btn" v-b-modal.add-modal @click="resetForm()">Adicionar</b-button>
				</div>
				<div>
							<table class="table table-hover">
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
											<b-icon-pencil class="icon" v-b-modal.add-modal title="Editar" @click="editModal(i)"></b-icon-pencil>
											<b-icon-trash class="icon" title="Deletar" @click="deleteAluno(i.id)"></b-icon-trash>
										</td>
									</tr>
								</tbody>
							</table>
				</div>
			</b-container>
		</div>
		<b-modal id="add-modal" @ok="submitForm(form)" centered :title="modalTitle" @show="onModalLoaded()" @hidden="onModalHidden()">
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

				<b-form-group id="input-group3" label="Foto" laber-for="input-3" v-if="loaded">
					<picture-input
					ref="pictureInput"
					@change="onImageLoaded"
					:width="300"
					:height="300"
					:hideChangeButton="true"
					accept="image/jpeg"
					buttonClass="ui button primary"
					:crop="false"
					:prefill="url"
					:prefillOptions="{
						mediaType: 'image/jpeg'
					}"
					:customStrings="{
						upload: '<h1>Upload it!</h1>',
						drag: 'Escolha um arquivo ou arrastre sua imagem pra cá'
					}">
					</picture-input>
				</b-form-group>
				
			</b-form>
		</b-modal>
	</div>
</template>


<script>
import AlunosRestResource from '../services/alunos';
import PictureInput from 'vue-picture-input';

export default ({
	data() {
		return {
			items: [],
			form: {
				nome: '',
				edereco: '',
				foto: [],
			},
			show: true,
			mainProps: {
				center: true,
				fluidGrow: true,
			},
			image: [],
			url: '',
			obj: [],
			action: '',
			modalTitle: '',
			loaded: false
		}

	},

	components: {
		PictureInput
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
			this.form.id = element.id;
			this.url = JSON.parse(JSON.stringify(this.form.foto));
			this.action = 'edit';
			this.modalTitle = 'Editar registro de aluno';
		},

		async submitForm(form) {
			form.foto = this.imageBase64URL;
			if (this.action == 'add') {
				await this.postAluno(form).then((result) => {
					if (result) {
						this.$swal.fire({
							title: 'Aluno(a) adicionado(a)!',
							text: 'Registro de aluno adicionado.',
							icon: 'success',
							confirmButtonColor: 'rgba(84, 19, 153, 0.8)',
						}).then((result) => {
							if (result) {
								this.getAlunos();
							}
						})
					}
				})
			} else if (this.action == 'edit') {
				await this.updateAluno(form).then((result) => {
					if (result) {
						this.$swal.fire({
							title: 'Atualizado!',
							text: 'Registro de aluno atualizado.',
							icon: 'success',
							confirmButtonColor: 'rgba(84, 19, 153, 0.8)',
						}).then((result) => {
							if (result) {
								this.getAlunos();
							}
						})
					}
				})
			} else return;
		},

		resetForm() {
			this.form = {
				nome: '',
				endereco: '',
				foto: ''
			},
			this.url = '',
			this.image = [],
			this.action = 'add',
			this.modalTitle = 'Adicionar registro de aluno'
		},

		deleteAluno(id) {
			this.$swal.fire({
				title: 'Tem certeza que quer deletar esse registro?',
				text: 'Não será possível reverter essa ação!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#589913',
				cancelButtonColor: '#991315',
				confirmButtonText: 'Sim, quero deletar!',
				cancelButtonText: 'Cancelar'
			}).then((result) => {
				if (result.isConfirmed) {
					AlunosRestResource.deleteAluno(id).then(() => {
						this.$swal.fire({
							title: 'Deletado!',
							text: 'Registro de aluno deletado.',
							icon: 'success',
							confirmButtonColor: 'rgba(84, 19, 153, 0.8)',
						}).then((result) => {
							if (result) {
								this.getAlunos();
							}
						})
					});
				}
			})
		},

		onImageLoaded() {
			if (this.$refs.pictureInput.file) {
				this.image = this.$refs.pictureInput.file;
				this.imageBase64URL = this.$refs.pictureInput.image
    		}
		},

		onModalLoaded() {
			var _this = this;
			setTimeout(() => {
				_this.loaded = true;
			}, 1)
		},

		onModalHidden() {
			this.loaded = false;
		},

		async updateAluno(aluno) {
			return await AlunosRestResource.updateAluno(aluno);
		}
	}
})
</script>

<style>
.table-title {
	display: flex;
    justify-content: space-between;
	margin-bottom: 2rem;
}

.wrapper {
	border-top: 10px solid rgba(84, 19, 153, 0.2);
	border-radius: 10px;
	background-color: #fff;
	margin-top: 3rem;
	padding-block: 2rem;
}

.clicable {
	cursor: pointer;
}

.icon {
	margin-right: 1rem;
}

.icon:hover {
	color: #589913;
}

.add-aluno-btn {
	background-color: rgba(84, 19, 153, 0.7);
}

.add-aluno-btn:hover {
	background-color: rgba(84, 19, 153, 1);
}

</style>
