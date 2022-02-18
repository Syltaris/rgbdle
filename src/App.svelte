<script>
  import AnswerBox from "./components/AnswerBox.svelte";
  import luminance from "./utils/getLuminance";
  import QuestionSVG from "./assets/question.svg";
  import analytics from "mixpanel-browser";

  analytics.init("ab04dfac9dd11b6ba0a66e668f9ded93");

  let showDrawer = false;

  let firstAnsbox; // ref to 1st input box
  let secondAnsBox;
  let thirdAnsBox;
  let rainbowInterval;
  let rgb = [0, 0, 0];
  let rainbowRgb = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];

  /* guesses */
  let completed = false;
  let guesses = [];

  let rGuess = 0;
  let gGuess = 0;
  let bGuess = 0;

  const submitAnswer = () => {
    analytics.track("Answer Submitted", {
      answer: `${rGuess}, ${gGuess}, ${bGuess}`,
      correctAnswer: `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`,
    });

    guesses.unshift([rGuess, gGuess, bGuess]);
    guesses = guesses;

    if (rGuess == rgb[0] && gGuess == rgb[1] && bGuess == rgb[2]) {
      analytics.track("Game Won");
      completed = true;

      rainbowInterval = setInterval(() => {
        rainbowRgb = [
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
        ];
      }, 2000);

      return;
    }

    // reset the guess
    rGuess = 0;
    gGuess = 0;
    bGuess = 0;
    completed = false;

    // set cursor to 1st input
    firstAnsbox.focus();
  };
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
    completed = false;

    clearInterval(rainbowInterval);
  };

  const skipSubmitAndAutoTab = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      analytics.track("Enter Key Pressed");

      if (e.target === firstAnsbox) {
        secondAnsBox.focus();
      } else if (e.target === secondAnsBox) {
        thirdAnsBox.focus();
      } else if (e.target === thirdAnsBox) {
        submitAnswer();
      }
    }
  };

  const toggleDrawer = () => {
    showDrawer = !showDrawer;
    if (showDrawer) {
      analytics.track("Drawer Opened");
    } else {
      analytics.track("Drawer Closed");
    }
  };

  const onRegenerateClick = () => {
    analytics.track("Generate Clicked");
    randomizeRgb();
  };

  randomizeRgb();
</script>

<main>
  <span class="question-button" on:click={toggleDrawer}>
    <QuestionSVG width="2rem" height="2rem" />
  </span>
  <div class="drawer {showDrawer ? 'active' : ''}">
    <span class="close-button" on:click={toggleDrawer}>X</span>

    <p>
      Hi, this is a variant of Wordle but for RGB values instead, pretty
      straightforward. Done by <a
        on:click={() => analytics.track("Link to Homebase Clicked")}
        href="https://zexuan.xyz/projects/#rgbdle"
        target="blank_"
        noopenner
        noreferrer>@zexurge</a
      >.
    </p>
    <p>
      I saw this video
      <a
        on:click={() => analytics.track("Link to YouTube vid Clicked")}
        href="https://www.youtube.com/shorts/W4Rebo3aEkY"
        target="_blank"
        noopener
        noreferrer>here</a
      > of a guy describing his 'most useless skill' and he claims to be able to
      guess any RGB value accurately after having worked with it so much, and I thought
      it would be fun to make that into a game.
    </p>

    <p>
      To play, just type in the RGB values you think represents the current
      color of the background, each ranging 0-255, and then press enter to
      submit (or hit the submit button).
    </p>
    <p>
      If your guess is lower than the correct value, a 'down' chevron will show
      along your guess, and if it's higher, a 'up' chevron will show.
    </p>

    <p>
      The different colors also show how close you are to the correct answer.
    </p>
    <ul>Red: >100</ul>
    <ul>Orange: 50-100</ul>
    <ul>Yellow: 1-20</ul>
    <ul>Green: Congrats!</ul>

    <p>Thanks for checking this out, and have fun!</p>
  </div>

  <div
    class="container {completed ? 'slow-color-change' : ''}"
    style="
	background-color: rgb(
		{completed ? rainbowRgb[0] : rgb[0]},
		{completed ? rainbowRgb[1] : rgb[1]},
		{completed ? rainbowRgb[2] : rgb[2]}
	);
	color:{luminance(...rgb) > 0.2 ? 'black' : 'white'};
	"
  >
    <div>
      {#if completed}
        <p>Congratulations! You win!</p>
      {:else}
        <p>Try to guess the RGB value of the color of the background!</p>
      {/if}
      <button on:click={onRegenerateClick}>regenerate!</button>
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
        disabled={completed}
        bind:value={rGuess}
        onSubmit={skipSubmitAndAutoTab}
        bind:inputRef={firstAnsbox}
      />
      <AnswerBox
        disabled={completed}
        bind:value={gGuess}
        onSubmit={skipSubmitAndAutoTab}
        bind:inputRef={secondAnsBox}
      />
      <AnswerBox
        disabled={completed}
        bind:value={bGuess}
        onSubmit={submitAnswer}
        bind:inputRef={thirdAnsBox}
      />
      <button disabled={completed} class="right-offset" on:click={submitAnswer}>
        Submit
      </button>
    </div>

    {#each guesses as guess}
      <div class="guesses-container">
        <AnswerBox
          id="first-ansbox"
          disabled
          answer={rgb[0]}
          value={guess[0]}
        />
        <AnswerBox disabled answer={rgb[1]} value={guess[1]} />
        <AnswerBox disabled answer={rgb[2]} value={guess[2]} />

        <div
          class="anspreview-box right-offset"
          style="background-color: rgb({guess[0]},{guess[1]},{guess[2]})"
        />
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    max-width: 240px;
    margin: 0 auto;
    min-height: 100vh;
    max-height: 100vh;
  }

  p {
    font-size: 1.2em;
    text-shadow: 0.2em 0.2em 0.2em black;
  }

  .close-button {
    position: absolute;
    right: 0.2em;
    top: 0.2em;
    font-size: 1.5em;
    cursor: pointer;
  }

  .question-button {
    margin-top: 1rem;
    margin-left: 1rem;
    position: absolute;
    cursor: pointer;

    height: 2rem;
    width: 2rem;
    background-color: white;
    border-radius: 2rem;
  }
  .question-button:not(:disabled):active {
    background-color: #aaa;
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

  .right-offset {
    position: absolute;
    margin-left: 22rem;
    margin-top: 0.6em;
  }

  .anspreview-box {
    width: 2rem;
    height: 2rem;
    border: 5px solid black;
    border-radius: 4rem;
    outline: none;

    text-align: center;
  }

  .container {
    text-align: center;

    width: 100%;
    height: calc(100vh - 50px); /* why 50px? */
    margin-bottom: 0px;
    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    transition: background-color 0.5s ease, color 0.5s ease;
  }

  .slow-color-change {
    transition: background-color 2s linear, color 2s ease;
  }

  .drawer {
    position: absolute;
    height: 100vh;
    background-color: white;
    padding: 30px 12px 12px 12px;

    display: none;
    width: 300px;
  }
  .drawer.active {
    display: inline;

    animation-name: slideIn;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.3s;
  }

  .drawer > p {
    font-size: 1rem;
    text-shadow: none;
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

  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0%);
    }
  }
</style>
