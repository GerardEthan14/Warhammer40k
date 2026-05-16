<script>
  import StatBlock from '../components/StatBlock.svelte';
  import WeaponTable from '../components/WeaponTable.svelte';
  import AbilityList from '../components/AbilityList.svelte';
  import BuffToggle from '../components/BuffToggle.svelte';
  import { armyLists } from '../stores/armyLists.svelte.js';
  import { activeBuffs } from '../stores/activeBuffs.svelte.js';
  import { router } from '../router.svelte.js';
  import { getUnit, getDetachment } from '../data/index.js';
  import { BUFFS } from '../lib/buffs.js';
  import { computeUnit } from '../lib/modifiers.js';

  let { listId, instanceId } = $props();

  let list = $derived(armyLists.lists.find((l) => l.id === listId));
  let instance = $derived(list?.units.find((u) => u.instanceId === instanceId));
  let baseUnit = $derived(instance ? getUnit(instance.unitId) : null);
  let detachment = $derived(list?.detachmentId ? getDetachment(list.detachmentId) : null);

  // Buffs disponibles pour cette unité
  let unitAvailableBuffs = $derived(
    (baseUnit?.available_buffs ?? []).map((id) => BUFFS[id]).filter(Boolean)
  );

  // Buffs actifs combinés (globaux + per-unit)
  let allActiveBuffIds = $derived([
    ...activeBuffs.globalBuffIds,
    ...activeBuffs.unitBuffs(instanceId),
  ]);

  let computed = $derived(
    baseUnit
      ? computeUnit(baseUnit, {
          activeBuffIds: allActiveBuffIds,
          detachment,
          allBuffs: BUFFS,
          waaagh: activeBuffs.isGlobalActive('waaagh'),
        })
      : null
  );

  function isUnitBuffActive(buffId) {
    return (
      activeBuffs.isGlobalActive(buffId) ||
      activeBuffs.isUnitActive(instanceId, buffId)
    );
  }

  function toggleBuff(buffId) {
    if (BUFFS[buffId]?.scope === 'army') {
      activeBuffs.toggleGlobal(buffId);
    } else {
      activeBuffs.toggleUnit(instanceId, buffId);
    }
  }
</script>

{#if !baseUnit || !computed}
  <p>Unité introuvable. <a href="#/play/{listId}">Retour</a></p>
{:else}
  <div class="back">
    <button onclick={() => router.go(`/play/${listId}`)}>◂ Retour</button>
  </div>

  <h1>{baseUnit.name}</h1>
  <div class="meta-row">
    <span class="chip">{baseUnit.points} pts</span>
    <span class="chip yellow">{baseUnit.model_count} fig.</span>
    {#each baseUnit.keywords as kw}
      <span class="chip magenta">{kw}</span>
    {/each}
  </div>

  <StatBlock
    stats={computed.unit.stats}
    invulnSave={baseUnit.invuln_save}
    baseStats={baseUnit.stats}
  />

  <section>
    <div class="head">Bonus & auras</div>
    <div class="toggles">
      {#each unitAvailableBuffs as buff}
        <BuffToggle
          {buff}
          active={isUnitBuffActive(buff.id)}
          onToggle={toggleBuff}
        />
      {/each}
    </div>
    {#if computed.sources.length > 0}
      <ul class="sources">
        {#each computed.sources as s}
          <li>
            <span class="src-type">[{s.type}]</span>
            <strong>{s.name}</strong> :
            {s.effect.op === 'add' ? '+' : s.effect.op === 'sub' ? '−' : ''}
            {s.effect.value}
            <span class="dim">sur</span>
            {s.effect.target}.{s.effect.field}
          </li>
        {/each}
      </ul>
    {/if}
  </section>

  <WeaponTable
    weapons={computed.unit.weapons.ranged}
    baseWeapons={baseUnit.weapons.ranged}
    type="ranged"
  />
  <WeaponTable
    weapons={computed.unit.weapons.melee}
    baseWeapons={baseUnit.weapons.melee}
    type="melee"
  />

  <AbilityList abilities={baseUnit.abilities} />
{/if}

<style>
  .back {
    margin-bottom: 8px;
  }
  .back button {
    padding: 6px 12px;
    font-size: 11px;
  }
  .meta-row {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .head {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    letter-spacing: 2px;
    margin-bottom: 6px;
  }
  .toggles {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .sources {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: var(--magenta);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .src-type {
    font-family: var(--font-arcade);
    font-size: 9px;
    color: var(--text-mute);
    margin-right: 4px;
  }
</style>
