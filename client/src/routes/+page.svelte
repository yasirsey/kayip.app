<script>
	let params = ' ';

	const search = async () => {
		const response = await fetch(`http://localhost:5000/missings?query=${params}`);
		
		console.log(response);
	};

</script>

<svelte:head>
	<title>Ara</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container">
	<input type="text" placeholder="Aramak istediğiniz kişinin adı soyadı" class=mb-3 bind:value={params}/>
	<a class="btn btn-primary w-100 p-2 fs-5" href="/search/{params}">Ara</a>

	<p class="mt-2 text-center">
		Lütfen yoğunluk olmaması açısından siteyi sadece ihtiyaç duyduğunuzda kullanın.
	</p>
</section>

<style>
	section {
		/* align horizontally and vertically center */
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	input {
		width: 100%;
		height: 50px;
		font-size: 1.5rem;
		padding: 0 1rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}

	@media (max-width: 768px) {
		section {
			width: 100%;
		}
	}
</style>
