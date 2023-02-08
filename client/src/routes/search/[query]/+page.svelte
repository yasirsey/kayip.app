<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
  
    const query = $page.url.pathname.split("/")[2].replace('%20', ' ');
    let missings  = []
  
    onMount(async () => {
      const response = await fetch(
        `/api/missings?query=${query}`
      );
  
      const data = await response.json();
  
      missings = data;
    });
  </script>
  
  <svelte:head>
    <title>Bulunanlar</title>
    <meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section class="container mt-5">
    <p class="mt-2 text-center">
      <span>{query}</span> ile eşleşen <span>{missings.length}</span> kişi bulundu.
      <br />
      {#if missings.length < 1}
      <span>Lütfen ilerleyen saatlerde tekrar deneyin. Umudunuzu yitirmeyin.</span>
      {/if}
    </p>
  
    <div class="container d-flex flex-wrap justify-content-between">
      {#each missings as missing}
      <div class="card mt-3" style="width: 300px;">
        <div
          class="imageBox"
          style="background: url('/images/{missing._id}.jpg')"
        />
        <div class="card-body">
          <h5 class="card-title">Adı: {missing.fullName || 'bilinmiyor'}</h5>
          <h5 class="card-title">Yaşı: {missing.age || 'bilinmiyor'}</h5>
          <h5 class="card-title">Şehir: {missing.city || 'bilinmiyor'}</h5>
          <p class="card-text">
            {missing.description}
          </p>
        </div>
      </div>
      {/each}
    </div>
  </section>
  
  <style>
    .imageBox {
      width: 100%;
      height: 200px;
      background: #ccc;
      background-size: cover !important;
    }
  
    @media (max-width: 768px) {
      section {
        width: 100%;
      }
    }
  </style>
  