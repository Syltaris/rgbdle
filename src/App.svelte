<script>
  export let name;

  let rgb = [100, 100, 120];

  const randomizeRgb = () => {
    rgb = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
  };
</script>

<main>
  <div
    class="container"
    style="background-color: rgb({rgb[0]},{rgb[1]},{rgb[2]});"
  >
    <h1>rgbdle</h1>
    <p>
      Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
      how to build Svelte apps.
    </p>
    <button on:click={randomizeRgb}>Generate!</button>
  </div>
</main>

<style>
  main {
    text-align: center;
    max-width: 240px;
    margin: 0 auto;
    min-height: 100vh;
    max-height: 100vh;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  p {
  }

  .container {
    width: 100%;
    height: calc(100vh - 50px); /* why 50px? */
    margin-bottom: 0px;
    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
