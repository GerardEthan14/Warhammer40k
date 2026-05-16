<script>
  import CPCounter from '../components/CPCounter.svelte';
  import StratagemCard from '../components/StratagemCard.svelte';
  import { armyLists } from '../stores/armyLists.svelte.js';
  import { stratagemsForDetachment, getDetachment } from '../data/index.js';

  let { listId } = $props();

  let list = $derived(armyLists.lists.find((l) => l.id === listId));
  let detachment = $derived(list?.detachmentId ? getDetachment(list.detachmentId) : null);
  let availableStrats = $derived(stratagemsForDetachment(list?.detachmentId ?? null));

  let phaseFilter = $state('all');
  const phases = ['all', 'command', 'movement', 'shooting', 'charge', 'fight', 'any'];

  let filtered = $derived(
    phaseFilter === 'all'
      ? availableStrats
      : availableStrats.filter((s) => s.phase.includes(phaseFilter))
  );

  let core = $derived(filtered.filter((s) => s.detachment === null));
  let det = $derived(filtered.filter((s) => s.detachment !== null));
</script>

{#if !list}
  <p>Liste introuvable. <a href="#/">Retour</a></p>
{:else}
  <h1>Stratagèmes</h1>

  <CPCounter />

  {#if detachment}
    <div class="det-tag">
      <span class="chip magenta">{detachment.name}</span>
    </div>
  {:else}
    <p class="muted">Aucun détachement choisi. Seuls les stratagèmes core sont affichés.</p>
  {/if}

  <div class="phases">
    {#each phases as p}
      <button
        class="phase-btn"
        class:active={phaseFilter === p}
        onclick={() => (phaseFilter = p)}
      >
        {p}
      </button>
    {/each}
  </div>

  {#if det.length > 0}
    <h2>Détachement</h2>
    <ul>
      {#each det as s}
        <li><StratagemCard strat={s} /></li>
      {/each}
    </ul>
  {/if}

  {#if core.length > 0}
    <h2 style="margin-top: 16px;">Core</h2>
    <ul>
      {#each core as s}
        <li><StratagemCard strat={s} /></li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  .det-tag {
    margin: 12px 0 6px;
  }
  .phases {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin: 12px 0;
  }
  .phase-btn {
    padding: 6px 10px;
    font-size: 11px;
  }
  .phase-btn.active {
    color: var(--bg);
    background: var(--magenta);
    border-color: var(--magenta);
    box-shadow: var(--glow-magenta);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
