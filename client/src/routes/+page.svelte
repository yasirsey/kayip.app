<script>
  let params = "";
</script>

<svelte:head>
  <title>Ara</title>
</svelte:head>

<section class="container">
  <p class="text-center lead">
    Bu platform, deprem sonrası kaybolan tanıdıkları bulmak ve bulunanları
    kaydetmek için gönüllü yardım sağlamaya odaklanır.
	<br/>Birlikte, acıyı hafifletmeyi ve birbirimize yardım etmeyi
    amaçlıyoruz. Lütfen siteyi kötü amaçlarla kullanmayın.
  </p>
  <input
    type="text"
    placeholder="Aramak istediğiniz kişinin adı soyadı"
    class="mb-3"
    bind:value={params}
  />
  <a class="btn btn-primary w-100 p-2 fs-5" href="/search/{params}">Ara</a>

  <p class="mt-2 text-center">
    Yoğunluk yaratmamak için siteyi sadece ihtiyaç duyduğunuzda
    kullanın.
	<br/>
	<a class="text-success" href="https://t.me/kayip_app">İletişime geçmek için tıklayın</a>.
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
