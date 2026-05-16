<script>
  import CPCounter from '../components/CPCounter.svelte';
  import BuffToggle from '../components/BuffToggle.svelte';
  import { armyLists } from '../stores/armyLists.svelte.js';
  import { activeBuffs } from '../stores/activeBuffs.svelte.js';
  import { commandPoints } from '../stores/commandPoints.svelte.js';
  import { router } from '../router.svelte.js';
  import { units, getDetachment } from '../data/index.js';
  import { BUFFS } from '../lib/buffs.js';

  let { listId } = $props();
  let list = $derived(armyLists.lists.find((l) => l.id === listId));
  let detachment = $derived(list?.detachmentId ? getDetachment(list.detachmentId) : null);

  $effect(() => {
    if (list && commandPoints.turn === 1 && commandPoints.history.length === 0) {
      commandPoints.set(list.cpStart ?? 6);
    }
  });

  function unitDetails(unitId) {
    return units.find((u) => u.id === unitId);
  }
</script>

{#if !list}
  <p>Liste introuvable. <a href="#/">Retour</a></p>
{:else}
  <h1>{list.name}</h1>
  {#if detachment}
    <div class="chip magenta det">{detachment.name}</div>
  {/if}

  <section class="cp-section">
    <CPCounter />
  </section>

  <section class="army-buffs">
    <div class="head">Buffs d'armée</div>
    <div class="toggles">
      <BuffToggle
        buff={BUFFS.waaagh}
        active={activeBuffs.isGlobalActive('waaagh')}
        onToggle={(id) => activeBuffs.toggleGlobal(id)}
      />
    </div>
    {#if activeBuffs.isGlobalActive('waaagh')}
      <div class="waaagh-on">
        <span class="waaagh" style="font-size: 28px;">WAAAGH!!</span>
      </div>
    {/if}
  </section>

  <section>
    <h2>Unités</h2>
    {#if list.units.length === 0}
      <p class="muted">
        Pas d'unités. <a href="#/builder/{listId}">Ajoute-en</a> dans le builder.
      </p>
    {:else}
      <ul class="grid">
        {#each list.units as u}
          {@const d = unitDetails(u.unitId)}
          {#if d}
            <li>
              <button
                class="neon-card hover unit-btn"
                onclick={() => router.go(`/play/${listId}/unit/${u.instanceId}`)}
              >
                <div class="uname">{d.name}</div>
                <div class="stats-mini">
                  <span><b>M</b>{d.stats.M}</span>
                  <span><b>T</b>{d.stats.T}</span>
                  <span><b>SV</b>{d.stats.Sv}+</span>
                  <span><b>W</b>{d.stats.W}</span>
                  <span><b>OC</b>{d.stats.OC}</span>
                </div>
                <div class="meta">{d.points} pts · {d.model_count} fig.</div>
              </button>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </section>
{/if}

<style>
  .det {
    margin-bottom: 12px;
  }
  .cp-section {
    margin-bottom: 14px;
  }
  .army-buffs {
    margin-bottom: 18px;
  }
  .head {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    letter-spacing: 2px;
    margin-bottom: 6px;
  }
  .toggles {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .waaagh-on {
    text-align: center;
    margin: 14px 0;
  }
  .grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 8px;
  }
  .unit-btn {
    display: block;
    width: 100%;
    padding: 10px;
    text-align: left;
    text-transform: none;
    letter-spacing: 0;
    font-family: var(--font-body);
    color: var(--text);
  }
  .unit-btn:hover {
    color: var(--text);
    background: var(--bg-elev-2);
  }
  .uname {
    font-family: var(--font-title);
    font-weight: 700;
    font-size: 14px;
    color: var(--ork);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .stats-mini {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--text-dim);
    margin-bottom: 4px;
  }
  .stats-mini b {
    color: var(--text-mute);
    font-weight: normal;
    margin-right: 2px;
    font-size: 10px;
  }
  .meta {
    font-size: 11px;
    color: var(--text-mute);
  }
</style>
