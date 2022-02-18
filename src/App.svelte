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

  /* sRGB lumniance calculation */
  const luminance = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    return (
      0.2126 * Math.pow(r, 2.2) +
      0.7152 * Math.pow(g, 2.2) +
      0.0722 * Math.pow(b, 2.2)
    );
  };
</script>

<main>
  <div
    class="container"
    style="background-color: rgb({rgb[0]},{rgb[1]},{rgb[2]});"
  >
    <h1>rgbdle ({luminance(...rgb)})</h1>
    <p style="color:{luminance(...rgb) > 0.2 ? 'black' : 'white'};">
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
    transition: color 0.5s ease;
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

    transition: background-color 0.5s ease;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
