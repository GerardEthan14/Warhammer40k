<script>
  import NeonTitle from '../components/NeonTitle.svelte';
  import { armyLists } from '../stores/armyLists.svelte.js';
  import { router } from '../router.svelte.js';
  import { detachments } from '../data/index.js';

  let newName = $state('');

  function create() {
    const list = armyLists.create(newName || undefined);
    newName = '';
    router.go(`/builder/${list.id}`);
  }

  function open(id) {
    router.go(`/play/${id}`);
  }

  function edit(id) {
    router.go(`/builder/${id}`);
  }

  function detName(id) {
    if (!id) return null;
    return detachments.find((d) => d.id === id)?.name ?? null;
  }
</script>

<header class="hero">
  <div class="title">
    <NeonTitle text="WAAAGH!!" size="xl" />
  </div>
  <p class="sub">Mekboy Companion · Compagnon de bataille Orks</p>
</header>

<section class="create">
  <h2>Nouvelle Waaagh</h2>
  <div class="row">
    <input
      type="text"
      placeholder="Nom de la liste (ex: Da Big Krumpin')"
      bind:value={newName}
      onkeydown={(e) => e.key === 'Enter' && create()}
    />
    <button onclick={create}>Créer ▸</button>
  </div>
</section>

<section class="lists">
  <h2>Tes listes</h2>
  {#if armyLists.lists.length === 0}
    <p class="muted">Aucune liste pour le moment. Crée ta première Waaagh ci-dessus.</p>
  {:else}
    <ul>
      {#each armyLists.lists as l}
        <li class="neon-card">
          <div class="li-head">
            <div>
              <div class="name">{l.name}</div>
              <div class="meta">
                {l.units.length} unité{l.units.length > 1 ? 's' : ''}
                · {detName(l.detachmentId) ?? 'Aucun détachement'}
              </div>
            </div>
            <div class="acts">
              <button class="magenta" onclick={() => edit(l.id)}>Build</button>
              <button onclick={() => open(l.id)}>Play ▸</button>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .hero {
    text-align: center;
    padding: 40px 0 24px;
  }
  .sub {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    letter-spacing: 2px;
    margin-top: 18px;
  }
  .create {
    margin-bottom: 24px;
  }
  .row {
    display: flex;
    gap: 8px;
  }
  .row input {
    flex: 1;
  }
  .row button {
    white-space: nowrap;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .li-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .name {
    font-family: var(--font-title);
    font-weight: 700;
    font-size: 16px;
    color: var(--ork);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .meta {
    font-size: 12px;
    color: var(--text-mute);
    margin-top: 2px;
  }
  .acts {
    display: flex;
    gap: 6px;
  }
  .acts button {
    padding: 6px 10px;
    font-size: 11px;
  }
</style>
