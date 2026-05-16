<script>
  import DetachmentPicker from '../components/DetachmentPicker.svelte';
  import { armyLists } from '../stores/armyLists.svelte.js';
  import { router } from '../router.svelte.js';
  import { units } from '../data/index.js';

  let { listId } = $props();
  let list = $derived(armyLists.lists.find((l) => l.id === listId));

  let nameEdit = $derived(list?.name ?? '');

  function rename(e) {
    armyLists.rename(listId, e.target.value);
  }

  function totalPoints() {
    if (!list) return 0;
    return list.units.reduce((sum, u) => {
      const unit = units.find((x) => x.id === u.unitId);
      return sum + (unit?.points ?? 0);
    }, 0);
  }

  function unitDetails(unitId) {
    return units.find((u) => u.id === unitId);
  }
</script>

{#if !list}
  <p>Liste introuvable. <a href="#/">Retour</a></p>
{:else}
  <h1>Builder</h1>

  <section>
    <label class="lbl" for="list-name">Nom de la liste</label>
    <input id="list-name" type="text" value={list.name} oninput={rename} />
  </section>

  <section>
    <DetachmentPicker
      value={list.detachmentId}
      onChange={(id) => armyLists.setDetachment(listId, id)}
    />
  </section>

  <section>
    <div class="head">
      <h2>Unités ({list.units.length})</h2>
      <span class="chip yellow">{totalPoints()} pts</span>
    </div>

    {#if list.units.length === 0}
      <p class="muted">Pas encore d'unités. Ajoute-en depuis le catalogue ci-dessous.</p>
    {:else}
      <ul class="picked">
        {#each list.units as u}
          {@const d = unitDetails(u.unitId)}
          {#if d}
            <li class="neon-card row">
              <div>
                <div class="uname">{d.name}</div>
                <div class="meta">{d.points} pts · {d.model_count} fig.</div>
              </div>
              <button class="danger" onclick={() => armyLists.removeUnit(listId, u.instanceId)}>
                Retirer
              </button>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </section>

  <section>
    <h2>Catalogue Orks</h2>
    <ul class="catalog">
      {#each units as u}
        <li>
          <button class="neon-card hover catalog-btn" onclick={() => armyLists.addUnit(listId, u.id)}>
            <div class="row">
              <div>
                <div class="uname">{u.name}</div>
                <div class="meta">{u.points} pts · {u.model_count} fig.</div>
              </div>
              <span class="add-chip">+ Ajouter</span>
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </section>

  <section class="bottom">
    <button onclick={() => router.go(`/play/${listId}`)}>Aller à la partie ▸</button>
  </section>
{/if}

<style>
  section {
    margin-bottom: 18px;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .lbl {
    display: block;
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    letter-spacing: 2px;
    margin-bottom: 6px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .uname {
    font-family: var(--font-title);
    font-weight: 700;
    font-size: 15px;
    color: var(--ork);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .meta {
    font-size: 12px;
    color: var(--text-mute);
    margin-top: 2px;
  }
  .picked .neon-card {
    padding: 10px 12px;
  }
  .catalog-btn {
    display: block;
    width: 100%;
    padding: 10px 12px;
    text-align: left;
    text-transform: none;
    letter-spacing: 0;
    font-family: var(--font-body);
    color: var(--text);
  }
  .catalog-btn:hover {
    color: var(--text);
    background: var(--bg-elev-2);
  }
  .add-chip {
    display: inline-block;
    padding: 2px 8px;
    font-size: 11px;
    font-family: var(--font-title);
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    color: var(--ork);
  }
  .bottom {
    margin-top: 28px;
    text-align: center;
  }
  .bottom button {
    padding: 14px 24px;
    font-size: 14px;
  }
</style>
