<script>
  import AnswerBox from "./components/AnswerBox.svelte";
  import luminance from "./utils/getLuminance";

  let firstAnsbox; // ref to 1st input box

  let rgb = [100, 100, 120];

  const randomizeRgb = () => {
    rgb = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];

    // reset guesses and inputs
    guesses = [];
    rGuess = 0;
    gGuess = 0;
    bGuess = 0;
  };

  /* guesses */
  let guesses = [];

  let rGuess = 0;
  let gGuess = 0;
  let bGuess = 0;

  const submitAnswer = () => {
    if (rGuess == rgb[0] && gGuess == rgb[1] && bGuess == rgb[2]) {
      alert("Yay!");
      return;
    }

    guesses.unshift([rGuess, gGuess, bGuess]);
    guesses = guesses;

    // reset the guess
    rGuess = 0;
    gGuess = 0;
    bGuess = 0;

    // set cursor to 1st input
    firstAnsbox.focus();
  };
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
      <AnswerBox
        bind:value={rGuess}
        onSubmit={submitAnswer}
        bind:inputRef={firstAnsbox}
      />
      <AnswerBox bind:value={gGuess} onSubmit={submitAnswer} />
      <AnswerBox bind:value={bGuess} onSubmit={submitAnswer} />
      <button
        style="
			position: absolute; 
			margin-left: 22rem;
			margin-top: 1em;
		"
        on:click={submitAnswer}
      >
        Submit
      </button>
    </div>

    {#each guesses as guess}
      <div class="guesses-container">
        <AnswerBox id="first-ansbox" disabled value={guess[0]} />
        <AnswerBox disabled value={guess[1]} />
        <AnswerBox disabled value={guess[2]} />
      </div>
    {/each}
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

  .guesses-container,
  .ansboxes-container,
  .ansboxes-container-header {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 4px;
  }
  .ansboxes-container-header > span {
    width: 4.5rem;
    margin-bottom: 4px;
  }
  .guesses-container {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.3s;
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

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
