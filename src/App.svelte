<script>
  import AnswerBox from "./components/AnswerBox.svelte";
  import luminance from "./utils/getLuminance";

  let rgb = [100, 100, 120];

  const randomizeRgb = () => {
    rgb = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
  };

  /* guesses */
  const guesses = [];
</script>

<main>
  <div
    class="container"
    style="
	background-color: rgb({rgb[0]},{rgb[1]},{rgb[2]});
	color:{luminance(...rgb) > 0.2 ? 'black' : 'white'};
	"
  >
    <div>
      <p>Try to guess the RGB value of the color of the background!</p>
      <button on:click={randomizeRgb}>Generate!</button>
    </div>
    <div class="ansboxes-container-header" style="font-size: 5em;">
      <span>r</span>
      <span>g</span>
      <span>b</span>
      <span
        style="
	  	position: absolute; 
		margin-left: 8.5em;
		margin-top: 1em;
		font-size: .5em;
		">(dle)</span
      >
    </div>
    <div class="ansboxes-container">
      <AnswerBox />
      <AnswerBox />
      <AnswerBox />
    </div>
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
    font-size: 4em;
    font-weight: 400;
  }

  p {
  }

  .ansboxes-container,
  .ansboxes-container-header {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .ansboxes-container-header > span {
    width: 4.5rem;
    margin-bottom: 4px;
  }

  .container {
    width: 100%;
    height: calc(100vh - 50px); /* why 50px? */
    margin-bottom: 0px;
    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    transition: background-color 0.5s ease;
    transition: color 0.5s ease;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
