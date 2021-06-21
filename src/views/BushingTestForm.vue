<template>
	<form v-on:submit.prevent="submitHandler">
		<div class="row mt-20">
			<div class="col s12">
				<div class="card">
					<div class="card-content">
						<span class="card-title center">{{ title }}</span>
						<template v-if="loading">
							<div class="row" v-if="loading">
								<div class="progress">
									<div class="indeterminate"></div>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="row">
								<div class="input-field col s12 m3">
									<select v-model="type_test" id="SelectTypeTest" ref="selectTypeTest">
										<option value="" disabled>Оберіть тип випробування</option>
										<option v-for="item in types_tests" v-bind:key="item.id" v-bind:value="item.id">{{ item.name }}</option>
									</select>
									<label for="SelectTypeTest">Тип випробування</label>
									<template v-for="error of v$.type_test.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть дату випробування" v-model="test_date" type="date" id="InputTestDate" ref="inputTestDate" class="datepicker" v-bind:class="{invalid: v$.test_date.$error, valid: v$.test_date.$dirty || !v$.test_date.$invalid}" />
									<label class="active" for="InputTestDate">Дата випробування</label>
									<template v-for="error of v$.test_date.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть протокол випробування" v-model="protokol" type="text" id="InputProtokol" v-bind:class="{invalid: v$.protokol.$error, valid: v$.protokol.$dirty || !v$.protokol.$invalid}" />
									<label class="active" for="InputProtokol">Протокол випробування</label>
									<template v-for="error of v$.protokol.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть погоду" v-model="weather" type="text" id="InputWeather" v-bind:class="{invalid: v$.weather.$error, valid: v$.weather.$dirty || !v$.weather.$invalid}" />
									<label class="active" for="InputWeather">Погода</label>
									<template v-for="error of v$.weather.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть температуру повітря" v-model="t_okr" type="text" id="InputTempOkr" v-bind:class="{invalid: v$.t_okr.$error, valid: v$.t_okr.$dirty || !v$.t_okr.$invalid}" />
									<label class="active" for="InputTempOkr">Токр., &deg;C</label>
									<template v-for="error of v$.t_okr.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть температуру масла" v-model="t_vsm1" type="text" id="InputTempVSM1" v-bind:class="{invalid: v$.t_vsm1.$error, valid: v$.t_vsm1.$dirty || !v$.t_vsm1.$invalid}" />
									<label class="active" for="InputTempVSM1">ТС1., &deg;C</label>
									<template v-for="error of v$.t_vsm1.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть температуру масла" v-model="t_vsm2" type="text" id="InputTempVSM2" v-bind:class="{invalid: v$.t_vsm2.$error, valid: v$.t_vsm2.$dirty || !v$.t_vsm2.$invalid}" />
									<label class="active" for="InputTempVSM2">ТС2., &deg;C</label>
									<template v-for="error of v$.t_vsm2.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть температуру повітря" v-model="t_bushing" type="text" id="InputTempBushing" v-bind:class="{invalid: v$.t_bushing.$error, valid: v$.t_bushing.$dirty || !v$.t_bushing.$invalid}" />
									<label class="active" for="InputTempBushing">Твводу., &deg;C</label>
									<template v-for="error of v$.t_bushing.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12">
									<input placeholder="Вкажіть додаткову інформацію про вимірюванням" v-model="more" type="text" id="InputMore" v-bind:class="{invalid: v$.more.$error, valid: v$.more.$dirty || !v$.more.$invalid}" />
									<label class="active" for="InputMore">Додаткова інформація про вимірюванням</label>
									<template v-for="error of v$.more.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m2">
									<input placeholder="Вкажіть R1" v-model="r1" type="text" id="InputR1" v-bind:class="{invalid: v$.r1.$error, valid: v$.r1.$dirty || !v$.r1.$invalid}" />
									<label class="active" for="InputR1">R1, МОм</label>
									<template v-for="error of v$.r1.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m2">
									<input placeholder="Вкажіть R3" v-model="r3" type="text" id="InputR3" v-bind:class="{invalid: v$.r3.$error, valid: v$.r3.$dirty || !v$.r3.$invalid}" />
									<label class="active" for="InputR3">R3, МОм</label>
									<template v-for="error of v$.r3.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m2">
									<input placeholder="Вкажіть Tgδ1" v-model="tg1" type="text" id="InputTg1" v-bind:class="{invalid: v$.tg1.$error, valid: v$.tg1.$dirty || !v$.tg1.$invalid}" />
									<label class="active" for="InputTg1">Tgδ1, %</label>
									<template v-for="error of v$.tg1.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m2">
									<input placeholder="Вкажіть Tgδ3" v-model="tg3" type="text" id="InputTg3" v-bind:class="{invalid: v$.tg3.$error, valid: v$.tg3.$dirty || !v$.tg3.$invalid}" />
									<label class="active" for="InputTg3">Tgδ3, %</label>
									<template v-for="error of v$.tg3.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m2">
									<input placeholder="Вкажіть C1" v-model="capacity1" type="text" id="InputCapacity1" v-bind:class="{invalid: v$.capacity1.$error, valid: v$.capacity1.$dirty || !v$.capacity1.$invalid}" />
									<label class="active" for="InputCapacity1">C1, пФ</label>
									<template v-for="error of v$.capacity1.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m2">
									<input placeholder="Вкажіть C3" v-model="capacity3" type="text" id="InputCapacity3" v-bind:class="{invalid: v$.capacity3.$error, valid: v$.capacity3.$dirty || !v$.capacity3.$invalid}" />
									<label class="active" for="InputCapacity3">C3, пФ</label>
									<template v-for="error of v$.capacity3.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12">
									<input placeholder="Вкажіть прилади для вимірювань" v-model="device" type="text" id="InputDevice" v-bind:class="{invalid: v$.device.$error, valid: v$.device.$dirty || !v$.device.$invalid}" />
									<label class="active" for="InputDevice">Прилади для вимірювань</label>
									<template v-for="error of v$.device.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12">
									<input placeholder="Вкажіть випробувальника" v-model="tests_conducted" type="text" id="InputTestsConducted" v-bind:class="{invalid: v$.tests_conducted.$error, valid: v$.tests_conducted.$dirty || !v$.tests_conducted.$invalid}" />
									<label class="active" for="InputTestsConducted">Випробувальник</label>
									<template v-for="error of v$.tests_conducted.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12">
									<input placeholder="Вкажіть висновок" v-model="conclusion" type="text" id="InputConclusion" v-bind:class="{invalid: v$.conclusion.$error, valid: v$.conclusion.$dirty || !v$.conclusion.$invalid}" />
									<label class="active" for="InputConclusion">Висновок</label>
									<template v-for="error of v$.conclusion.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
							</div>
						</template>
					</div>
					<div class="card-action right-align">
						<router-link
							v-bind:to="{
								name: 'bushing-tests',
								query: {
									passport_id: $route.query.passport_id ? $route.query.passport_id : test.passport_id,
								},
							}"
							class="waves-effect waves-light btn m-2"
						>
							Назад до випробувань
						</router-link>
						<button class="btn waves-effect waves-light blue m-2" type="submit">
							{{ button }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
	import useVuelidate from '@vuelidate/core';
	import {required, integer, decimal} from '@vuelidate/validators';
	export default {
		setup() {
			return {v$: useVuelidate()};
		},
		props: {
			title: String,
			button: String,
			page: String,
		},
		data() {
			return {
				loading: true,
				types_tests: [],
				test: {},
				selectTypeTest: null,
				inputTestDate: null,
				type_test: '',
				test_date: '',
				protokol: '',
				weather: '',
				t_okr: '',
				t_vsm1: '',
				t_vsm2: '',
				t_bushing: '',
				more: '',
				r1: '',
				r3: '',
				tg1: '',
				tg3: '',
				capacity1: '',
				capacity3: '',
				device: '',
				tests_conducted: '',
				conclusion: '',
			};
		},
		validations() {
			return {
				type_test: {
					required,
				},
				test_date: {
					required,
				},
				protokol: {
					required,
				},
				weather: {
					required,
				},
				t_okr: {
					required,
					integer,
				},
				t_vsm1: {
					required,
					integer,
				},
				t_vsm2: {
					required,
					integer,
				},
				t_bushing: {
					required,
					integer,
				},
				more: {
					required,
				},
				r1: {
					required,
					decimal,
				},
				r3: {
					required,
					decimal,
				},
				tg1: {
					required,
					decimal,
				},
				tg3: {
					required,
					decimal,
				},
				capacity1: {
					required,
					decimal,
				},
				capacity3: {
					required,
					decimal,
				},
				device: {
					required,
				},
				tests_conducted: {
					required,
				},
				conclusion: {
					required,
				},
			};
		},
		async mounted() {
			await this.getTypesTests();
			if (this.page === 'edit') {
				const data = await this.getTest();
				this.type_test = data.type_test_id;
				this.test_date = data.test_date;
				this.protokol = data.protokol;
				this.weather = data.weather;
				this.t_okr = data.t_okr;
				this.t_vsm1 = data.t_vsm1;
				this.t_vsm2 = data.t_vsm2;
				this.t_bushing = data.t_bushing;
				this.more = data.more;
				this.r1 = data.r1;
				this.r3 = data.r3;
				this.tg1 = data.tg3;
				this.tg3 = data.tg3;
				this.capacity1 = data.capacity1;
				this.capacity3 = data.capacity3;
				this.device = data.device;
				this.tests_conducted = data.tests_conducted;
				this.conclusion = data.conclusion;
			}
			this.loading = false;
		},
		updated() {
			this.selectTypeTest = window.M.FormSelect.init(this.$refs.selectTypeTest, {
				classes: this.v$.type_test.$error ? 'invalid' : this.v$.type_test.$dirty || !this.v$.type_test.$invalid ? 'valid' : '',
				dropdownOptions: {
					belowOrigin: true,
				},
			});
			// this.inputTestDate = window.M.Datepicker.init(this.$refs.inputTestDate, {
			// 	autoClose: true,
			// 	format: 'yyyy-mm-dd',
			// 	firstDay: 1,
			// });
		},
		beforeUnmount() {
			if (this.selectTypeTest && this.selectTypeTest.destroy) this.selectTypeTest.destroy();
			if (this.inputTestDate && this.inputTestDate.destroy) this.inputTestDate.destroy();
		},
		methods: {
			submitHandler: function() {
				this.v$.$touch();
				console.log(this.v$.$error);
				if (this.v$.$error) return;
				alert('Form success!!!');
			},
			getTest: async function() {
				await fetch('http://bushing.sdzp.pp.ua/api/tests/get_test/' + this.$route.query.id)
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						this.test = result.data;
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати паспорт (' + error + ')',
						});
					});
				return this.test;
			},
			getTypesTests: async function() {
				await fetch('http://bushing.sdzp.pp.ua/api/types_tests/get_types_tests')
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						this.types_tests = result.data;
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати паспорт (' + error + ')',
						});
					});
				return this.types_tests;
			},
		},
	};
</script>

<style scoped></style>
