<script>
  import { commandPoints } from '../stores/commandPoints.svelte.js';

  let { strat } = $props();

  let played = $derived(commandPoints.isPlayed(strat.id) && strat.once_per_turn);
  let canAfford = $derived(commandPoints.current >= strat.cost);

  function use() {
    commandPoints.spend(strat.cost, strat.id);
  }
</script>

<div class="card" class:played class:core={strat.detachment === null}>
  <div class="head">
    <span class="name">{strat.name}</span>
    <span class="cost">{strat.cost} PC</span>
  </div>
  <div class="phases">
    {#each strat.phase as p}
      <span class="chip {strat.detachment ? 'magenta' : 'yellow'}">{p}</span>
    {/each}
    {#if strat.detachment === null}
      <span class="chip">Core</span>
    {/if}
    {#if strat.once_per_turn}
      <span class="chip yellow">1×/tour</span>
    {/if}
  </div>
  <p class="desc">{strat.description}</p>
  <button class="use" onclick={use} disabled={!canAfford || played}>
    {#if played}Joué ce tour{:else}Utiliser (−{strat.cost} PC){/if}
  </button>
</div>

<style>
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .card:not(.played) {
    border-color: var(--border-strong);
  }
  .card.core {
    border-color: rgba(255, 242, 0, 0.5);
  }
  .card.played {
    opacity: 0.45;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .name {
    font-family: var(--font-title);
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--ork);
  }
  .cost {
    font-family: var(--font-arcade);
    font-size: 11px;
    color: var(--yellow);
    text-shadow: var(--glow-yellow);
  }
  .phases {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  .desc {
    margin: 4px 0;
    font-size: 14px;
    color: var(--text-dim);
  }
  .use {
    align-self: stretch;
    padding: 8px;
    font-size: 12px;
  }
</style>
