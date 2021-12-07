<template>
	<div class="alunos">
		<div class="wrapper">
			<b-container fluid>
				<div class="table-title">
					<h2>Listagem de Alunos</h2>
					<b-button class="add-aluno-btn" v-b-modal.form-modal @click="resetForm()">Adicionar</b-button>
				</div>
				<div>
					<table class="table table-hover align-middle">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Endereço</th>
								<th>Foto</th>
								<th>Ação</th>
							</tr>
						</thead>
						<tbody v-if="!tableIsLoading">
							<tr v-for="i in items" :key="`tableRow${i.id}`">
								<td>{{ i.nome }}</td>
								<td>{{ i.endereco }}</td>
								<td style="max-width: 50px"><b-img v-bind="mainProps" :src="i.foto"></b-img></td>
								<td class="clicable">
									<b-icon-pencil class="icon" v-b-modal.form-modal title="Editar" @click="editModal(i)"></b-icon-pencil>
									<b-icon-trash class="icon" title="Deletar" @click="deleteAluno(i.id)"></b-icon-trash>
								</td>
							</tr>
						</tbody>
					</table>
					<div v-if="tableIsLoading" class="loading">
						<b-spinner class="align-middle"></b-spinner>
						<strong>Carregando...</strong>
					</div>
				</div>
			</b-container>
		</div>
		<b-modal 
		id="form-modal" 
		@ok="submitForm" 
		centered 
		:title="modalTitle" 
		@show="onModalLoaded()" 
		@hidden="onModalHidden()"
		cancel-title="Cancelar"
		>
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
					:state="formValidation.nome.state"
					></b-form-input>
					<b-form-invalid-feedback :state="formValidation.nome.isOk && formValidation.nome.isTypeOk">
						É necessário digitar um nome válido
					</b-form-invalid-feedback>
				</b-form-group>

				<b-form-group id="input-group-2" label="Endereço:" label-for="input-2">
					<b-form-input
					id="input-2"
					v-model="form.endereco"
					placeholder="Endereço"
					required
					:state="formValidation.endereco.state"
					></b-form-input>
					<b-form-invalid-feedback :state="formValidation.endereco.isOk && formValidation.endereco.isTypeOk">
						É necessário digitar um endereço válido
					</b-form-invalid-feedback>
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
					<div class="image-fail" v-if="!formValidation.foto.state">
						{{ imageFailText }}
						<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/></svg>">
					</div>
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
				endereco: '',
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
			loaded: false,
			tableIsLoading: false,
			formValidation: {
				nome: {
					isOk: true,
					isTypeOk: true,
					state: null
				},
				endereco: {
					isOk: true,
					isTypeOk: true,
					state: null
				},
				foto: {
					isOk: true,
					isTypeOk: true,
					isFormatOk: true,
					state: true
				},
			},
			imageFailText: "",
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
			this.tableIsLoading = true;
			return AlunosRestResource.getAlunos().then(
				(response) => {
					for (var i = 0; i < response.length; i++) {
						var bytes = new Uint8Array(response[i].foto.data);
						var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
						response[i].foto = "data:image/jpeg;base64," + btoa(binary);
					}
					this.tableIsLoading = false;
					this.items = response 
				}
			)
		},

		async postAluno(aluno) {
			return await AlunosRestResource.postAluno(aluno);
		},

		editModal(element) {
			this.validationReset();
			this.form = JSON.parse(JSON.stringify(element));
			this.form.id = element.id;
			this.url = JSON.parse(JSON.stringify(this.form.foto));
			this.action = 'edit';
			this.modalTitle = 'Editar registro de aluno';
		},

		async submitForm(bvModalEvt) {
			bvModalEvt.preventDefault()
			this.form.foto = this.imageBase64URL ? this.imageBase64URL : this.url;
			if (this.validateForm(this.form)) {
				this.$nextTick(() => {
          			this.$bvModal.hide('form-modal')
        		})
				this.validationReset();
				if (this.action == 'add') {
					await this.postAluno(this.form).then((result) => {
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
					await this.updateAluno(this.form).then((result) => {
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
			} else return;
		},

		resetForm() {
			this.form = {
				nome: '',
				endereco: '',
				foto: ''
			},
			this.url = ''
			this.image = []
			this.action = 'add'
			this.modalTitle = 'Adicionar registro de aluno'
			this.validationReset()
			this.imageBase64URL = ''
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
		},

		validateForm(form) {
			this.validationReset();
			var validationFailed = 0;
			if (form.nome) {
				if (typeof form.nome !== 'string') {
					this.formValidation.nome.isTypeOk = false
					this.formValidation.nome.state = false
					validationFailed++;
				}
			} else {
				this.formValidation.nome.isOk = false
				this.formValidation.nome.state = false
				validationFailed++;
			}

			if (form.endereco) {
				if (typeof form.endereco !== 'string') {
					this.formValidation.endereco.isTypeOk = false
					this.formValidation.endereco.state = false
					validationFailed++;
				}
			} else {
				this.formValidation.endereco.isOk = false
				this.formValidation.endereco.state = false
				validationFailed++;
			}

			if (form.foto) {
				if (typeof form.foto !== 'string') {
					this.imageFailText = "Arquivo inválido!"
					this.formValidation.foto.isTypeOk = false
					this.formValidation.foto.state = false
					validationFailed++;
				} else if (!form.foto.includes('data:image/jpeg;base64,')) {
					this.imageFailText = "A imagem escolhida não está no formato *.jpg"
					this.formValidation.foto.isFormatOk = false
					this.formValidation.foto.state = false
					validationFailed++;
				}
			} else {
				this.imageFailText = "É necessário escolher uma foto"
				this.formValidation.foto.isOk = false
				this.formValidation.foto.state = false
				validationFailed++;
			}
			return validationFailed ? false : true
		},

		validationReset() {
			this.formValidation = {
				nome: {
					isOk: true,
					isTypeOk: true,
					state: null
				},
				endereco: {
					isOk: true,
					isTypeOk: true,
					state: null
				},
				foto: {
					isOk: true,
					isTypeOk: true,
					isFormatOk: true,
					state: true
				},
			};
			this.imageFailText = "";
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

.loading {
	color: rgba(84, 19, 153, 0.7);
}

.image-fail {
	width: 100%; 
	margin-top: 0.25rem; 
	font-size: 80%; 
	color: #dc3545;
	display: flex;
    justify-content: space-between;
}

.btn-primary {
	background-color: #589913 !important;
	border-color: #589913 !important;
}

.btn-primary:hover {
	background-color: #6bb819 !important;
	border-color: #6bb819 !important;
}
</style>
