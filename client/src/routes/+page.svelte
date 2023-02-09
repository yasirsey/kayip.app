<svelte:head>
  <title>Ara</title>
</svelte:head>

<section class="container">
  <p class="text-center lead">
    Sorgulama ekranımız kalıcı olarak kaldırılmıştır. Sorgulama işlemlerinizi <a class="fw-bold"
      href="https://enabiz.gov.tr">enabiz.gov.tr</a
    > adresine giriş yaparak Hasta ve Hasta Yakını Bilgilendirme kısmından yapabilirsiniz.
    <br/>
    <br />
    <span class="">Herkese geçmiş olsun diliyoruz. 🙏</span>
    <br />
    <br />
    <span>(Yardımcı olabileceğimiz bir şey olursa <a class="fw-bold"
      href="https://t.me/kayip_app">bizlere ulaşabilirsiniz</a
      >.)</span>
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
