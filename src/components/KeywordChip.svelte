<script>
  import { findKeyword } from '../lib/keywords.js';
  import { keywordPopup } from '../stores/keywordPopup.svelte.js';

  let { text } = $props();
  let def = $derived(findKeyword(text));
</script>

{#if def}
  <button class="kw-link" type="button" onclick={() => keywordPopup.show(def, text)}>
    {text}
  </button>
{:else}
  <span class="kw-plain">{text}</span>
{/if}

<style>
  .kw-link {
    display: inline;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    border-bottom: 1px dotted var(--ork);
    color: var(--ork);
    font-family: inherit;
    font-size: inherit;
    text-transform: none;
    letter-spacing: 0;
    cursor: pointer;
    box-shadow: none;
  }
  .kw-link:hover:not(:disabled),
  .kw-link:active:not(:disabled) {
    background: none;
    color: var(--yellow);
    box-shadow: none;
    text-shadow: var(--glow-yellow);
  }
  .kw-plain {
    color: var(--text-mute);
  }
</style>
