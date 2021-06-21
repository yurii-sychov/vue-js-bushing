<template>
	<div class="row mt-20">
		<div class="col s12">
			<div class="card">
				<div class="card-content">
					<div class="row" v-if="loading">
						<div class="progress">
							<div class="indeterminate"></div>
						</div>
					</div>
					<div class="row" v-else>
						<div class="input-field col s12 m4">
							<select class="custom-select" id="SelectFilial" v-on:change="changeFilial" ref="selectFilial" v-model="filial_id">
								<option value="" disabled>Виберіть підрозділ</option>
								<option v-for="item in filials" v-bind:key="item.id" v-bind:value="item.id">
									{{ item.name }}
								</option>
							</select>
							<label for="SelectFilial">Підрозділ</label>
						</div>
						<div class="input-field col s12 m4">
							<select class="custom-select" id="SelectStantion" v-on:change="changeStantion" ref="selectStantion" v-model="stantion_id">
								<option value="" disabled>Виберіть підстанцію</option>
								<option v-for="item in stantions" v-bind:key="item.id" v-bind:value="item.id">
									{{ item.name }}
								</option>
							</select>
							<label for="SelectStantion">Підстанція</label>
						</div>
						<div class="input-field col s12 m4">
							<select class="custom-select" id="SelectDisp" v-on:change="changeDisp" ref="selectDisp" v-model="disp_id">
								<option value="" disabled>Виберіть диспетчерське найменування</option>
								<option v-for="item in disps" v-bind:key="item.id" v-bind:value="item.id">
									{{ item.name }}
								</option>
							</select>
							<label for="SelectDisp">Диспетчерське найменування</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row mt-20" v-if="passports.length">
		<div class="col s12">
			<div class="card">
				<div class="card-title blue-text text-darken-4 valign-wrapper">
					<h6>
						{{ filial_name + ' / ' + stantion_name + ' / ' + disp_name }}
					</h6>
				</div>
				<div class="card-content">
					<div class="table-responsive">
						<table class="table centered highlight striped">
							<thead>
								<tr>
									<th width="5%">Фаза</th>
									<th width="10%">Ознака</th>
									<th width="20%">Тип вводу</th>
									<th width="15%">Рік випуску</th>
									<th width="10%">Зав. номер</th>
									<th width="15%">№ креслення</th>
									<th width="10%">Вага, кг</th>
									<th width="15%">Дія</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-bind:class="{
										'yellow-text text-accent-4': item.phase_id == 1,
										'green-text text-accent-4': item.phase_id == 2,
										'red-text text-accent-4': item.phase_id == 3,
										'blue-text text-accent-4': item.phase_id == 4,
									}"
									v-for="item in passports"
									v-bind:key="item.id"
									v-bind:value="item.id"
								>
									<td>{{ item.phase }}</td>
									<td>{{ item.type_bushing }}</td>
									<td>{{ item.tip }}</td>
									<td>{{ item.year_made }}</td>
									<td>{{ item.number }}</td>
									<td>{{ item.number_scheme }}</td>
									<td>{{ item.weight }}</td>
									<td>
										<!-- <router-link to="/bushing-passport-pdf"><i class="material-icons orange-text">picture_as_pdf</i></router-link> -->
										<router-link
											v-bind:to="{
												name: 'bushing-passport-edit',
												query: {
													id: item.id,
												},
											}"
										>
											<i class="material-icons green-text">edit</i>
										</router-link>
										<router-link v-bind:to="{name: 'bushing-tests', query: {passport_id: item.id}}">
											<i class="material-icons blue-text">view_list</i>
										</router-link>
										<!-- <router-link to="/bushing-passport-move"><i class="material-icons text-info"></i>directions_car</router-link> -->
										<!-- <router-link to="/bushing-passport-delete"><i class="material-icons red-text">delete_forever</i></router-link> -->
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card-action right-align">
					<router-link
						v-bind:to="{
							name: 'bushing-passport-create',
							query: {
								filial_id: $route.query.filial_id,
								stantion_id: $route.query.stantion_id,
								disp_id: $route.query.disp_id,
							},
						}"
						class="waves-effect waves-light btn purple darken-2 m-2"
					>
						Додати паспорт
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				selectFilial: null,
				selectStantion: null,
				selectDisp: null,
				filials: [],
				stantions: [],
				disps: [],
				passports: [],
				filial_id: '',
				stantion_id: '',
				disp_id: '',
				filial_name: '',
				stantion_name: '',
				disp_name: '',
			};
		},
		async mounted() {
			await this.getFilials();
			if (this.$route.query.filial_id) {
				await this.getStantion(this.$route.query.filial_id);
				this.filial_id = this.$route.query.filial_id;
			}
			if (this.$route.query.stantion_id) {
				await this.getDisp(this.$route.query.stantion_id);
				this.stantion_id = this.$route.query.stantion_id;
			}
			if (this.$route.query.disp_id) {
				await this.getPassports(this.$route.query.filial_id, this.$route.query.stantion_id, this.$route.query.disp_id);
				this.disp_id = this.$route.query.disp_id;
			}
			this.loading = false;
		},
		updated() {
			this.selectFilial = window.M.FormSelect.init(this.$refs.selectFilial, {
				classes: 'select-filial',
				dropdownOptions: {
					onOpenStart: () => {
						const elems = document.querySelectorAll('.select-filial .dropdown-content li > span');
						elems.forEach((item, key) => {
							item.parentElement.classList[key] || item.classList.add('purple-text', 'text-darken-4');
						});
					},
				},
			});
			this.selectStantion = window.M.FormSelect.init(this.$refs.selectStantion, {
				classes: 'select-stantion',
				dropdownOptions: {
					onOpenStart: () => {
						const elems = document.querySelectorAll('.select-stantion .dropdown-content li > span');
						elems.forEach((item, key) => {
							item.parentElement.classList[key] || item.classList.add('purple-text', 'text-darken-4');
						});
					},
				},
			});
			this.selectDisp = window.M.FormSelect.init(this.$refs.selectDisp, {
				classes: 'select-disp',
				dropdownOptions: {
					onOpenStart: () => {
						const elems = document.querySelectorAll('.select-disp .dropdown-content li > span');
						elems.forEach((item, key) => {
							item.parentElement.classList[key] || item.classList.add('purple-text', 'text-darken-4');
						});
					},
				},
			});

			this.filial_name = this.$refs.selectFilial && this.$refs.selectFilial.options[this.$refs.selectFilial.options.selectedIndex].text;
			this.stantion_name = this.$refs.selectStantion && this.$refs.selectStantion.options[this.$refs.selectStantion.options.selectedIndex].text;
			this.disp_name = this.$refs.selectDisp && this.$refs.selectDisp.options[this.$refs.selectDisp.options.selectedIndex].text;
		},
		beforeUnmount() {
			if (this.selectFilial && this.selectFilial.destroy) this.selectFilial.destroy();
			if (this.selectStantion && this.selectStantion.destroy) this.selectStantion.destroy();
			if (this.selectDisp && this.selectDisp.destroy) this.selectDisp.destroy();
		},
		methods: {
			getFilials: async function() {
				await fetch('http://bushing.sdzp.pp.ua/api/filials/get_filials')
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							window.M.toast({
								html: 'Не маэ зв`язку з сервером',
							});
						}
					})
					.then((result) => {
						if (result.data) {
							this.filials = result.data;
						} else {
							this.filials = [];
							this.stantions = [];
							this.disps = [];
							this.passports = [];
						}
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати перелік підрозділів (' + error + ')',
						});
					});
				return this.filials;
			},

			getStantion: async function(id) {
				await fetch('http://bushing.sdzp.pp.ua/api/stantions/get_stantions/' + id)
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							window.M.toast({
								html: 'Не маэ зв`язку з сервером',
							});
						}
					})
					.then((result) => {
						if (result.data) {
							this.stantions = result.data;
						} else {
							this.stantions = [];
							this.disps = [];
							this.passports = [];
						}
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати перелік підстанцій (' + error + ')',
						});
					});
				return this.stantions;
			},

			getDisp: async function(id) {
				await fetch('http://bushing.sdzp.pp.ua/api/disps/get_disps/' + id)
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							window.M.toast({
								html: 'Не маэ зв`язку з сервером',
							});
						}
					})
					.then((result) => {
						if (result.data) {
							this.disps = result.data;
						} else {
							this.disps = [];
							this.passports = [];
						}
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати перелік диспетчерських найменувань (' + error + ')',
						});
					});
				return this.disps;
			},

			getPassports: async function(filial_id, stantion_id, disp_id) {
				await fetch('http://bushing.sdzp.pp.ua/api/passports/get_passports/' + filial_id + '/' + stantion_id + '/' + disp_id)
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							window.M.toast({
								html: 'Не маэ зв`язку з сервером',
							});
						}
					})
					.then((result) => {
						if (result.data) {
							this.passports = result.data;
						} else {
							this.passports = [];
						}
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати перелік паспортів (' + error + ')',
						});
					});
				return this.passports;
			},

			changeFilial: function(e) {
				this.$router.push({
					name: 'bushing-passports',
					query: {
						filial_id: this.filial_id,
					},
				});
				this.stantion_id = '';
				this.stantion_name = '';
				this.disp_id = '';
				this.disp_name = '';
				this.passports = [];
				this.getStantion(this.filial_id);
				this.filial_name = e.target.options[e.target.options.selectedIndex].text;
			},

			changeStantion: function(e) {
				this.$router.push({
					name: 'bushing-passports',
					query: {
						filial_id: this.filial_id,
						stantion_id: this.stantion_id,
					},
				});
				this.disp_id = '';
				this.disp_name = '';
				this.passports = [];
				this.getDisp(this.stantion_id);
				this.stantion_name = e.target.options[e.target.options.selectedIndex].text;
			},

			changeDisp: function(e) {
				this.$router.push({
					name: 'bushing-passports',
					query: {
						filial_id: this.filial_id,
						stantion_id: this.stantion_id,
						disp_id: this.disp_id,
					},
				});
				this.passports = [];
				this.getPassports(this.filial_id, this.stantion_id, this.disp_id);
				this.disp_name = e.target.options[e.target.options.selectedIndex].text;
			},
		},
	};
</script>

<style scoped>
	.table-responsive {
		display: block;
		width: 100%;
		overflow-x: auto;
	}
	.dropdown-content li > a,
	.dropdown-content li > span {
		color: #fb8c00 !important;
	}
</style>
