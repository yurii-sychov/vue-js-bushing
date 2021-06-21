<template>
	<div class="row mt-20" v-if="tests.length">
		<div class="col s12">
			<div class="section">
				<div class="card">
					<div class="card-title blue-text text-darken-4 valign-wrapper">
						<h6>
							{{ passport.filial + ' / ' + passport.stantion + ' / ' + passport.disp + ' / Фаза ' + passport.phase }}
							<span class="red-text">{{ '(Зав. № ' + passport.number + ')' }}</span>
						</h6>
					</div>
					<div class="card-content">
						<div class="table-responsive">
							<table class="table centered highlight striped">
								<thead>
									<tr>
										<th width="5%">№ п/п</th>
										<th>Дата</th>
										<th>№ протоколу</th>
										<th>Tвв, °C</th>
										<th>Вид випроб.</th>
										<th>R1, МОм</th>
										<th>R3, МОм</th>
										<th>Tgδ1, %</th>
										<th>Tgδ3, %</th>
										<th>C1, ПФ</th>
										<th>C3, ПФ</th>
										<th>ΔЗ, %</th>
										<th>ΔП, %</th>
										<th width="15%">Дія</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in tests" v-bind:key="item.id" v-bind:value="item.id">
										<td>{{ index + 1 }}</td>
										<td>{{ item.test_data }}</td>
										<td>{{ item.protokol }}</td>
										<td>{{ item.t_bushing }}</td>
										<td>{{ item.type_test }}</td>
										<td>{{ item.r1 }}</td>
										<td>{{ item.r3 }}</td>
										<td>{{ Number(item.tg1).toFixed(3) }}</td>
										<td>{{ Number(item.tg3).toFixed(3) }}</td>
										<td>{{ Number(item.capacity1).toFixed(2) }}</td>
										<td>{{ Number(item.capacity3).toFixed(1) }}</td>
										<td>{{ item.delta_capacity1_pusk }}</td>
										<td v-bind:class="{'red-text': item.delta_capacity1_expl >= 5}">{{ item.delta_capacity1_expl }}</td>
										<td>
											<router-link
												v-bind:to="{
													name: 'bushing-test-edit',
													query: {
														id: item.id,
													},
												}"
											>
												<i class="material-icons green-text">edit</i>
											</router-link>
											<a href="#modal" class="modal-trigger" v-on:click="getTest(item)">
												<i class="material-icons orange-text">remove_red_eye</i>
											</a>
											<a v-bind:href="'http://bushing.sdzp.pp.ua/tests/protokol_test/' + item.id" v-if="item.type_test_id != 1" target="_blank">
												<i class="material-icons blue-text">local_printshop</i>
											</a>
											<a href="javascript:void(0);" v-else>
												<i class="material-icons grey-text">local_printshop</i>
											</a>
											<!-- <router-link to="/bushing-passport-delete"><i class="rmaterial-icons text-danger">delete_forever</i></router-link> -->
											<!-- <span  v-if="is_update">
												<router-link to="/bushing-passport-lock"><i class="rmaterial-icons text-secondary">lock_open</i></router-link>
											</span>
											<span  v-else>
												<i class="material-icons text-secondary">lock_outline</i>
											</span> -->
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="card-action right-align">
						<router-link
							v-bind:to="{
								name: 'bushing-passports',
								query: {
									filial_id: passport.filial_id,
									stantion_id: passport.stantion_id,
									disp_id: passport.disp_id,
								},
							}"
							class="waves-effect waves-light btn m-2"
						>
							Назад до паспортів
						</router-link>
						<router-link
							v-bind:to="{
								name: 'bushing-test-create',
								query: {
									passport_id: passport.id,
								},
							}"
							class="waves-effect waves-light btn purple darken-2 m-2"
						>
							Додати випробування
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Structure -->
	<div id="modal" class="modal modal-fixed-footer bottom-sheet" ref="modal">
		<div class="modal-content">
			<h4>Повні дані з випробувань</h4>
			<table class="highlight">
				<tbody>
					<tr>
						<td class="thead">Місце випробування</td>
						<td>{{ test.name_filial }}, {{ test.name_stantion }}, {{ test.name_disp }}, фаза {{ test.phase }}</td>
					</tr>
					<tr>
						<td class="thead">Дата випробування</td>
						<td>{{ test.test_data }}</td>
					</tr>
					<tr>
						<td class="thead">Протокол</td>
						<td>{{ test.protokol }}</td>
					</tr>
					<tr>
						<td class="thead">Тип випробувань</td>
						<td>{{ test.type_test_description }}</td>
					</tr>
					<tr>
						<td class="thead">Погода</td>
						<td>{{ test.weather }}</td>
					</tr>
					<tr>
						<td class="thead">Температура повітря, &deg;C</td>
						<td>{{ test.t_okr }}</td>
					</tr>
					<tr>
						<td class="thead">Температура ТС1, &deg;C</td>
						<td>{{ test.t_vsm1 }}</td>
					</tr>
					<tr>
						<td class="thead">Температура ТС2, &deg;C</td>
						<td>{{ test.t_vsm2 }}</td>
					</tr>
					<tr>
						<td class="thead">Температура вводу, &deg;C</td>
						<td>{{ test.t_bushing }}</td>
					</tr>
					<tr>
						<td class="thead">Більше інформації про випробування</td>
						<td>{{ test.more }}</td>
					</tr>
					<tr>
						<td class="thead">Опір ізоляції ділянки С1, МОм</td>
						<td>{{ test.r1 }}</td>
					</tr>
					<tr>
						<td class="thead">Опір ізоляції ділянки С3, МОм</td>
						<td>{{ test.r3 }}</td>
					</tr>
					<tr>
						<td class="thead">Tg&delta; ділянки С1, %</td>
						<td>{{ test.tg1 }}</td>
					</tr>
					<tr>
						<td class="thead">Tg&delta; ділянки С3, %</td>
						<td>{{ test.tg3 }}</td>
					</tr>
					<tr>
						<td class="thead">Ємність ділянки С1, пФ</td>
						<td>{{ test.capacity1 }}</td>
					</tr>
					<tr>
						<td class="thead">Ємність ділянки С3, пФ</td>
						<td>{{ test.capacity3 }}</td>
					</tr>
					<tr>
						<td class="thead">Прилади для випробувань</td>
						<td>{{ test.device }}</td>
					</tr>
					<tr>
						<td class="thead">Випробувальник</td>
						<td>{{ test.tests_conducted }}</td>
					</tr>
					<tr>
						<td class="thead">Висновок</td>
						<td>{{ test.conclusion }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="modal-footer">
			<a href="javascript:void(0);" class="modal-close waves-effect waves-light btn-flat">Закрити</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				passport: {},
				test: {},
				tests: [],
				modal: null,
			};
		},
		mounted() {
			this.modal = window.M.Modal.init(this.$refs.modal, {});
			fetch('http://bushing.sdzp.pp.ua/api/passports/get_passport/' + this.$route.query.passport_id)
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.passport = result.data;
				});

			fetch('http://bushing.sdzp.pp.ua/api/tests/get_tests/' + this.$route.query.passport_id)
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.tests = result.data;
				});
		},
		beforeUnmount() {
			if (this.modal && this.modal.destroy) this.modal.destroy();
		},
		methods: {
			getTest(test) {
				this.test = test;
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
	.bottom-sheet {
		height: 100%;
		max-height: 100%;
		overflow: visible;
	}
</style>
