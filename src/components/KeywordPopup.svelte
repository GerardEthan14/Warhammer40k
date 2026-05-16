<script>
  import { keywordPopup } from '../stores/keywordPopup.svelte.js';
</script>

{#if keywordPopup.current}
  <div
    class="overlay"
    role="button"
    tabindex="-1"
    onclick={keywordPopup.close}
    onkeydown={(e) => e.key === 'Escape' && keywordPopup.close()}
  >
    <div class="modal" role="dialog" onclick={(e) => e.stopPropagation()}>
      <div class="head">
        <span class="kw">[{keywordPopup.current.originalText ?? keywordPopup.current.name}]</span>
        <button class="x" type="button" onclick={keywordPopup.close} aria-label="Fermer">×</button>
      </div>
      <h3>{keywordPopup.current.name}</h3>
      <p>{keywordPopup.current.description}</p>
      <button class="close" type="button" onclick={keywordPopup.close}>Fermer</button>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  .modal {
    background: var(--bg-card);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--glow-ork);
    max-width: 480px;
    width: 100%;
    padding: 14px 16px 12px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .kw {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--yellow);
    text-shadow: var(--glow-yellow);
    letter-spacing: 1px;
  }
  .x {
    background: none;
    border: none;
    color: var(--text-mute);
    font-size: 24px;
    line-height: 1;
    padding: 0 4px;
    cursor: pointer;
    box-shadow: none;
  }
  .x:hover:not(:disabled) {
    background: none;
    color: var(--red);
    box-shadow: none;
  }
  h3 {
    color: var(--ork);
    text-shadow: var(--glow-ork);
    margin: 0 0 8px;
  }
  p {
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 12px;
  }
  .close {
    width: 100%;
    padding: 10px;
    font-size: 12px;
  }
</style>
