<script>
  export let id = undefined;
  export let value = 0;
  export let disabled = false;
  export let onSubmit = undefined;

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
</script>

<main>
  <input
    {id}
    {disabled}
    on:input={validateAndUpdate}
    on:keypress={(e) => e.key === "Enter" && onSubmit?.()}
    bind:value
    bind:this={inputRef}
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
    font-family: "Roboto", sans-serif;
    background: white;
    color: black;
    text-align: center;
    padding: 0.5em;
    margin: 0;
  }
</style>
