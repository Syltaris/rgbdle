<script>
  export let id = undefined;
  export let value = 0;
  export let disabled = false;
  export let onSubmit = undefined;
  export let answer = undefined;

  export let inputRef = undefined;

  const validateAndUpdate = (e) => {
    var invalidChars = /[^0-9]/gi;
    if (invalidChars.test(e.target.value)) {
      e.target.value = e.target.value.replace(invalidChars, "");
    }

    // instead of allowing > 4 numbers/chars to go through
    // just splice it out
    if (String(e.target.value).length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }

    e.target.value = Math.min(255, Math.max(0, e.target.value));

    value = e.target.value;
  };

  const getBoxColor = (value) => {
    if (answer === undefined) {
      return "white";
    }

    const difference = Math.abs(answer - value);
    if (difference > 100) {
      return "#E71D36";
    } else if (difference > 20) {
      return "#F46036";
    } else if (difference > 0) {
      return "#FED766";
    } else {
      return "#2BC016";
    }
  };
</script>

<main>
  <input
    {id}
    {disabled}
    on:input={validateAndUpdate}
    on:keypress={(e) => e.key === "Enter" && onSubmit?.(e)}
    bind:value
    bind:this={inputRef}
    style="background-color: {getBoxColor(value)};"
  />
</main>

<style>
  input {
    width: 4.6rem;
    height: 100%;
    border: 5px solid black;
    border-radius: 20px;
    outline: none;
    font-size: 1.5em;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    background: white;
    color: black;
    text-align: center;
    padding: 0.5em;
    margin: 0;
  }
</style>
