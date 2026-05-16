<script>
  import { commandPoints } from '../stores/commandPoints.svelte.js';
</script>

<div class="cp">
  <div class="left">
    <div class="label">PC</div>
    <div class="value">{commandPoints.current}</div>
  </div>
  <div class="ctrl">
    <button onclick={() => commandPoints.add(-1)} disabled={commandPoints.current <= 0}>−</button>
    <button onclick={() => commandPoints.add(1)}>+</button>
  </div>
  <div class="turn">
    <div class="label">Tour</div>
    <div class="t">{commandPoints.turn}</div>
    <button class="magenta next" onclick={() => commandPoints.nextTurn()}>Suivant ▸</button>
  </div>
</div>

<style>
  .cp {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: var(--bg-card);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--glow-ork);
    flex-wrap: wrap;
  }
  .left {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .label {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 1px;
  }
  .value {
    font-family: var(--font-title);
    font-weight: 900;
    font-size: 32px;
    color: var(--yellow);
    text-shadow: var(--glow-yellow);
    min-width: 40px;
    text-align: center;
  }
  .ctrl {
    display: flex;
    gap: 4px;
  }
  .ctrl button {
    padding: 6px 12px;
    font-size: 16px;
    min-width: 40px;
  }
  .turn {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-left: auto;
  }
  .t {
    font-family: var(--font-title);
    font-weight: 900;
    font-size: 22px;
    color: var(--text);
    min-width: 20px;
    text-align: center;
  }
  .next {
    padding: 6px 10px;
    font-size: 11px;
  }
</style>
