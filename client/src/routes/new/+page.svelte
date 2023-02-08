<script>
  import cities from "../../data/cities.js";
  let fullName = "",
    age = "",
    city = "bilinmiyor",
    description = "",
    files = "",
    message = "";

  const create = async () => {
    const data = new FormData();

    data.append("fullName", fullName);
    data.append("age", age);
    data.append("city", city);
    data.append("description", description);
    data.append("photo", files[0]);

    const response = await fetch("/api/missings", {
      method: "POST",
      body: data,
    });

    if (response.status === 201) {
      message = "Kayıt başarıyla oluşturuldu.";
    } else {
      message = "Kayıt oluşturulamadı.";
    }
  };
</script>

<svelte:head>
  <title>Yeni Kayıt</title>
</svelte:head>

<section class="container">
  <p class="mt-2 text-center fs-4">
    <b>Lütfen sadece bulunan insanların bilgilerini girin.</b><br/>Aradıklarınız için kayıt oluşturmayın.
  </p>
  {#if message == ""}
    <div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Ad Soyad"
          bind:value={fullName}
        />
      </div>
      <div class="btn-group w-100 mb-3" role="group">
        <input class="me-2" type="number" bind:value={age} placeholder="Yaş" />
        <select bind:value={city} class="form-select" aria-label="Şehir">
          <option selected value="bilinmiyor">Şehir</option>
          {#each cities as city}
            <option value={city}>{city}</option>
          {/each}
        </select>
      </div>
      <div class="mb-3">
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Açıklama"
          bind:value={description}
          maxlength="200"
        />
      </div>
      <div class="btn-group w-100" role="group">
        <input type="file" id="photo" class="d-none" bind:files />
        <label class="btn btn-primary w-100" for="photo">Fotoğraf Seç</label>
        <button
          type="button"
          class="btn btn-success w-100"
          on:click|once={create}>Gönder</button
        >
      </div>
      <p class="mt-2 text-center">
        Fotoğraf zorunlu değildir. Gönder butonuna bastığınızda kayıt
        oluşturulacaktır.
      </p>
    </div>
  {:else}
    <div>
      <h1 class="text-center text-primary">{message}</h1>
      <footer>
        <p class="text-center">
          Bizlerle <a href="https://t.me/kayip_app">iletişime</a> geçebilirsiniz.
        </p>
      </footer>
    </div>
  {/if}
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
