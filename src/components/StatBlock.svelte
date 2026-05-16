<script>
  let { stats, invulnSave = null, baseStats = null } = $props();

  const labels = [
    { key: 'M', label: 'M' },
    { key: 'T', label: 'T' },
    { key: 'Sv', label: 'SV', format: (v) => `${v}+` },
    { key: 'W', label: 'W' },
    { key: 'Ld', label: 'LD', format: (v) => `${v}+` },
    { key: 'OC', label: 'OC' },
  ];

  function isModified(key) {
    if (!baseStats) return false;
    return baseStats[key] !== stats[key];
  }
</script>

<div class="block">
  {#each labels as { key, label, format }}
    <div class="stat" class:modified={isModified(key)}>
      <div class="label">{label}</div>
      <div class="value">{format ? format(stats[key]) : stats[key]}</div>
    </div>
  {/each}
  {#if invulnSave}
    <div class="stat invul">
      <div class="label">INV</div>
      <div class="value">{invulnSave}+</div>
    </div>
  {/if}
</div>

<style>
  .block {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 6px;
    margin: 8px 0 12px;
  }
  .stat {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    text-align: center;
    padding: 6px 2px;
    background: var(--bg-elev-1);
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
    font-size: 22px;
    color: var(--text);
    margin-top: 4px;
  }
  .stat.modified {
    border-color: var(--magenta);
    box-shadow: var(--glow-magenta);
  }
  .stat.modified .value {
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
  }
  .invul .label,
  .invul .value {
    color: var(--yellow);
  }
  .invul {
    border-color: var(--yellow);
  }
</style>
