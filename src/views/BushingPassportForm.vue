<template>
	<form v-on:submit.prevent="submitHandler">
		<div class="row mt-20">
			<div class="col s12">
				<div class="card">
					<div class="card-content">
						<span class="card-title center">
							{{ title }}
						</span>
						<template v-if="loading">
							<div class="row" v-if="loading">
								<div class="progress">
									<div class="indeterminate"></div>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="row">
								<div class="input-field col s12 m4">
									<select v-model="phase" id="SelectPhase" ref="selectPhase">
										<option value="" disabled>Оберіть фазу</option>
										<option v-for="item in phases" v-bind:key="item.id" v-bind:value="item.id">{{ item.name }}</option>
									</select>
									<label for="SelectPhase">Фаза</label>
									<template v-for="error of v$.phase.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m4">
									<select v-model="type_bushing" id="SelectTypeBushing" ref="selectTypeBushing">
										<option value="" disabled>Оберіть ознаку вводу</option>
										<option v-for="item in types_bushings" v-bind:key="item.id" v-bind:value="item.id">{{ item.name }}</option>
									</select>
									<label for="SelectTypeBushing">Ознака</label>
									<template v-for="error of v$.type_bushing.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m4">
									<input placeholder="Вкажіть тип вводу" v-model="tip" type="text" id="InputTip" v-bind:class="{invalid: v$.tip.$error, valid: v$.tip.$dirty || !v$.tip.$invalid}" />
									<label class="active" for="InputTip">Тип вводу</label>
									<template v-for="error of v$.tip.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть рік випуску вводу" v-model="year_made" type="date" id="InputYearMade" v-bind:class="{invalid: v$.year_made.$error, valid: v$.year_made.$dirty || !v$.year_made.$invalid}" />
									<label class="active" for="InputYearMade">Рік випуску вводу</label>
									<template v-for="error of v$.year_made.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть заводський № вводу" v-model="number" type="text" id="InputNumber" v-bind:class="{invalid: v$.number.$error, valid: v$.number.$dirty || !v$.number.$invalid}" />
									<label class="active" for="InputNumber">Заводський № вводу</label>
									<template v-for="error of v$.number.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть № креслення вводу" v-model="number_scheme" type="text" id="InputNumberScheme" v-bind:class="{invalid: v$.number_scheme.$error, valid: v$.number_scheme.$dirty || !v$.number_scheme.$invalid}" />
									<label class="active" for="InputNumberScheme">№ креслення</label>
									<template v-for="error of v$.number_scheme.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
								<div class="input-field col s12 m3">
									<input placeholder="Вкажіть вагу вводу" v-model="weight" type="text" id="InputWeight" v-bind:class="{invalid: v$.weight.$error, valid: v$.weight.$dirty || !v$.weight.$invalid}" />
									<label class="active" for="InputWeight">Вага вводу</label>
									<template v-for="error of v$.weight.$errors" :key="error.$uid">
										<span class="helper-text" v-bind:data-error="error.$message"></span>
									</template>
								</div>
							</div>
						</template>
					</div>
					<div class="card-action right-align">
						<router-link
							v-bind:to="{
								name: 'bushing-passports',
								query: {
									filial_id: $route.query.filial_id ? $route.query.filial_id : passport.filial_id,
									stantion_id: $route.query.stantion_id ? $route.query.stantion_id : passport.stantion_id,
									disp_id: $route.query.disp_id ? $route.query.disp_id : passport.disp_id,
								},
							}"
							class="waves-effect waves-light btn m-2"
						>
							Назад до паспортів
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
	import {required, numeric} from '@vuelidate/validators';
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
				phases: [],
				types_bushings: [],
				passport: {},
				selectPhase: null,
				selectTypeBushing: null,
				phase: '',
				type_bushing: '',
				tip: '',
				year_made: '',
				number: '',
				number_scheme: '',
				weight: '',
			};
		},
		validations() {
			return {
				phase: {
					required,
				},
				type_bushing: {
					required,
				},
				tip: {
					required,
				},
				year_made: {
					required,
				},
				number: {
					required,
				},
				number_scheme: {
					required,
				},
				weight: {
					required,
					numeric,
				},
			};
		},
		async mounted() {
			await this.getPhases();
			await this.getTypesBushings();
			if (this.page === 'edit') {
				const data = await this.getPassport();
				this.phase = data.phase_id;
				this.type_bushing = data.type_bushing_id;
				this.tip = data.tip;
				this.year_made = data.year_made;
				this.number = data.number;
				this.number_scheme = data.number_scheme;
				this.weight = data.weight;
			}
			this.loading = false;
		},
		updated() {
			this.selectPhase = window.M.FormSelect.init(this.$refs.selectPhase, {
				classes: this.v$.phase.$error ? 'invalid' : this.v$.phase.$dirty || !this.v$.phase.$invalid ? 'valid' : '',
			});
			this.selectTypeBushing = window.M.FormSelect.init(this.$refs.selectTypeBushing, {
				classes: this.v$.type_bushing.$error ? 'invalid' : this.v$.type_bushing.$dirty || !this.v$.type_bushing.$invalid ? 'valid' : '',
			});
		},
		beforeUnmount() {
			if (this.selectPhase && this.selectPhase.destroy) this.selectPhase.destroy();
			if (this.selectTypeBushing && this.selectTypeBushing.destroy) this.selectTypeBushing.destroy();
		},
		methods: {
			submitHandler: function() {
				this.v$.$touch();
				if (this.v$.$error) return;
				alert('Form success!!!');
			},
			getPassport: async function() {
				await fetch('http://bushing.sdzp.pp.ua/api/passports/get_passport/' + this.$route.query.id)
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						this.passport = result.data;
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати паспорт (' + error + ')',
						});
					});
				return this.passport;
			},
			getPhases: async function() {
				await fetch('http://bushing.sdzp.pp.ua/api/phases/get_phases')
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						this.phases = result.data;
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати паспорт (' + error + ')',
						});
					});
				return this.phases;
			},
			getTypesBushings: async function() {
				await fetch('http://bushing.sdzp.pp.ua/api/types_bushings/get_types_bushings')
					.then((response) => {
						return response.json();
					})
					.then((result) => {
						this.types_bushings = result.data;
					})
					.catch((error) => {
						console.error('ERROR:', error);
						window.M.toast({
							html: 'Не можу отримати паспорт (' + error + ')',
						});
					});
				return this.types_bushings;
			},
		},
	};
</script>

<style scoped></style>
