<template>
	<nav class="light-blue lighten-1" role="navigation">
		<div class="nav-wrapper container-fluid">
			<router-link id="logo-container" to="/" class="brand-logo">SDZP</router-link>
			<ul class="right hide-on-med-and-down">
				<router-link to="/" active-class="active" custom v-slot="{navigate, href, isActive}">
					<li :class="[isActive && 'active']">
						<a v-bind:href="href" v-on:click="navigate" class="waves-effect sidenav-close">Головна</a>
					</li>
				</router-link>
				<router-link
					v-bind:to="{
						name: 'bushing-passports',
						query: {
							filial_id: $route.query.filial_id,
							stantion_id: $route.query.stantion_id,
							disp_id: $route.query.disp_id,
						},
					}"
					custom
					v-slot="{navigate, href, isActive}"
				>
					<li :class="[isActive && 'active']">
						<a v-bind:href="href" v-on:click="navigate" :active="isActive" class="waves-effect sidenav-close">Паспорти</a>
					</li>
				</router-link>
				<!-- <router-link to="/bushing-passport-form" custom v-slot="{navigate, href, isActive}">
					<li :class="[isActive && 'active']">
						<a v-bind:href="href" v-on:click="navigate" :active="isActive" class="waves-effect sidenav-close">Форма</a>
					</li>
				</router-link> -->
				<li>
					<a class="dropdown-trigger" href="javascript:void(0);" data-target="DropdownUser">
						<i class="material-icons right">arrow_drop_down</i>
						<i class="material-icons right">person</i>
					</a>
				</li>
			</ul>
			<a href="#" data-target="nav-mobile" class="sidenav-trigger">
				<i class="material-icons">menu</i>
			</a>
		</div>
	</nav>

	<ul id="nav-mobile" class="sidenav">
		<li>
			<div class="user-view">
				<div class="background">
					<img src="@/assets/images/office.jpg" />
				</div>
				<img class="circle" src="@/assets/images/user.jpg" />
				<span class="white-text name">Yurii Sychov</span>
				<span class="white-text email">yurii@sychov.pp.ua</span>
			</div>
		</li>
		<li>
			<a href="#!"> <i class="material-icons">cloud</i>First Link With Icon </a>
		</li>
		<li>
			<div class="divider"></div>
		</li>
		<router-link to="/" active-class="active" custom v-slot="{navigate, href, isActive}">
			<li :class="[isActive && 'active']">
				<a v-bind:href="href" v-on:click="navigate" class="waves-effect sidenav-close">Головна</a>
			</li>
		</router-link>
		<router-link to="/bushing-passports" custom v-slot="{navigate, href, isActive}">
			<li :class="[isActive && 'active']">
				<a v-bind:href="href" v-on:click="navigate" :active="isActive" class="waves-effect sidenav-close">Паспорти</a>
			</li>
		</router-link>
	</ul>

	<ul id="DropdownUser" class="dropdown-content">
		<li><a href="/settimg">Налаштування</a></li>
		<li><a href="/profile">Профіль</a></li>
		<li class="divider"></li>
		<li><a href="/logout">Вихід</a></li>
	</ul>

	<div class="container-fluid">
		<router-view />
	</div>

	<footer class="page-footer orange hide">
		<div class="container">
			<div class="row">
				<div class="col l6 s12">
					<h5 class="white-text">SDZP</h5>
					<p class="grey-text text-lighten-4">
						We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.
					</p>
				</div>
				<div class="col l3 s12">
					<h5 class="white-text">Settings</h5>
					<ul>
						<li>
							<a class="white-text" href="#!">Link 1</a>
						</li>
						<li>
							<a class="white-text" href="#!">Link 2</a>
						</li>
						<li>
							<a class="white-text" href="#!">Link 3</a>
						</li>
						<li>
							<a class="white-text" href="#!">Link 4</a>
						</li>
					</ul>
				</div>
				<div class="col l3 s12">
					<h5 class="white-text">Connect</h5>
					<ul>
						<li>
							<a class="white-text" href="#!">Link 1</a>
						</li>
						<li>
							<a class="white-text" href="#!">Link 2</a>
						</li>
						<li>
							<a class="white-text" href="#!">Link 3</a>
						</li>
						<li>
							<a class="white-text" href="#!">Link 4</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="container">
				Made by
				<a class="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		mounted() {
			window.M.Sidenav.init(document.querySelectorAll('.sidenav'), {
				edge: 'left',
			});
			window.M.Carousel.init(document.querySelectorAll('.carousel'), {
				fullWidth: true,
				indicators: true,
			});
			window.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
				constrainWidth: false,
			});
		},
	};
</script>

<style scoped>
	nav .nav-wrapper {
		margin: 0 10px;
	}
</style>
