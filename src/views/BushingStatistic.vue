<template>
	<div class="row mt-20">
		<div class="col s12 m4">
			<div class="card">
				<div class="card-content">
					<div class="row">
						<div class="col s8">
							<p class="font-15">Паспорти</p>
							<p class="font-10">
								Кількість паспортів в реєстрі по підприємству
							</p>
							<h4>{{ count_passports }}</h4>
						</div>
						<div class="col s4 right-align">
							<i class="medium material-icons teal-text darken-2-text">chrome_reader_mode</i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col s12 m4">
			<div class="card">
				<div class="card-content">
					<div class="row">
						<div class="col s8">
							<p class="font-15">Випробування</p>
							<p class="font-10">
								Кількість випробувань в реєстрі по підприємству
							</p>
							<h4>{{ count_tests }}</h4>
						</div>
						<div class="col s4 right-align">
							<i class="medium material-icons light-blue-text darken-2-text">flash_on</i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col s12 m4">
			<div class="card">
				<div class="card-content">
					<div class="row">
						<div class="col s8">
							<p class="font-15">Виконавці</p>
							<p class="font-10">
								Кількість виконавців в реєстрі по підприємству
							</p>
							<h4>{{ count_tests_conducted }}</h4>
						</div>
						<div class="col s4 right-align">
							<i class="medium material-icons indigo-text darken-2-text">people_outline</i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row mt-20">
		<div class="col s12 m6">
			<div class="card m-b-30">
				<div class="card-title valign-wrapper">
					<h5>Кількість вводів по рокам</h5>
				</div>
				<div class="card-content">
					<canvas id="countPassportsYear" class="chartjs-chart"></canvas>
				</div>
			</div>
		</div>

		<div class="col s12 m6">
			<div class="card m-b-30">
				<div class="card-title valign-wrapper">
					<h5>Кількість вводів по типам</h5>
				</div>
				<div class="card-content">
					<canvas id="countPassportsTip" class="chartjs-chart"></canvas>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Chart from 'chart.js/auto';
	export default {
		data() {
			return {
				chart1: null,
				chart2: null,
				count_passports: null,
				count_tests: null,
				count_tests_conducted: null,
				countPassportsYear: null,
				countPassportsTip: null,
			};
		},
		mounted() {
			fetch('http://bushing.sdzp.pp.ua/api/statistic/get_count_passports')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.count_passports = result.data;
				})
				.catch((error) => {
					console.log('ERROR:', error);
					window.M.toast({
						html: 'Не можу отримати кількість паспортів (' + error + ')',
					});
				});

			fetch('http://bushing.sdzp.pp.ua/api/statistic/get_count_tests')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.count_tests = result.data;
				})
				.catch((error) => {
					console.log('ERROR:', error);
					window.M.toast({
						html: 'Не можу отримати кількість випробувань (' + error + ')',
					});
				});

			fetch('http://bushing.sdzp.pp.ua/api/statistic/get_count_tests_conducted')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.count_tests_conducted = result.data;
				})
				.catch((error) => {
					console.log('ERROR:', error);
					window.M.toast({
						html: 'Не можу отримати кількість випробувачів (' + error + ')',
					});
				});

			fetch('http://bushing.sdzp.pp.ua/api/statistic/get_count_passports_year')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.countPassportsYear = result.data;
					const d = result.data;
					const labels = [];
					const data = [];
					d.forEach(function(item) {
						labels.push(item.year_made_format);
						data.push(item.count);
					});
					var ctx = document.getElementById('countPassportsYear').getContext('2d');
					this.chart1 = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: labels,
							datasets: [
								{
									label: 'Кількість, шт.',
									data: data,
									backgroundColor: 'rgb(173, 255, 47, 0.5)',
									borderColor: 'rgb(255, 255, 255)',
									borderWidth: 1,
								},
							],
						},
					});
				})
				.catch((error) => {
					console.log('ERROR:', error);
					window.M.toast({html: 'Не можу отримати дані (' + error + ')'});
				});

			fetch('http://bushing.sdzp.pp.ua/api/statistic/get_count_passports_tip')
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					this.countPassportsTip = result.data;
					const d = result.data;
					const labels = [];
					const data = [];
					d.forEach(function(item) {
						labels.push(item.tip);
						data.push(item.count);
					});
					var ctx = document.getElementById('countPassportsTip').getContext('2d');
					this.chart2 = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: labels,
							datasets: [
								{
									label: 'Кількість, шт.',
									data: data,
									backgroundColor: 'rgb(54, 255, 235, 0.5)',
									borderColor: 'rgb(255, 255, 255)',
									borderWidth: 1,
								},
							],
						},
					});
				})
				.catch((error) => {
					console.log('ERROR:', error);
					window.M.toast({html: 'Не можу отримати дані (' + error + ')'});
				});
		},
		updated() {},
		beforeUnmount() {
			// console.log('this.chart1.destroy', this.chart1)
			// console.log('this.chart2.destroy', this.chart2)
			// if (this.chart1 && this.chart1.destroy) {
			// 	this.chart1.destroy();
			// 	this.chart1 = null;
			// }
			// if (this.chart2 && this.chart2.destroy) {
			// 	this.chart2.destroy();
			// 	this.chart2 = null;
			// }
		},
	};
</script>

<style scoped>
	.font-15 {
		font-size: 15px;
		font-weight: 900;
		color: #4e5d71;
	}
	.font-10 {
		font-size: 10px;
		color: #4e5d71;
	}
</style>
