<script>
  let { weapons, type = 'ranged', baseWeapons = null } = $props();

  let cols = $derived(
    type === 'ranged'
      ? [
          { k: 'name', label: 'ARME', align: 'left' },
          { k: 'range', label: 'P', fmt: (v) => `${v}"` },
          { k: 'A', label: 'A' },
          { k: 'BS', label: 'BS', fmt: (v) => `${v}+` },
          { k: 'S', label: 'S' },
          { k: 'AP', label: 'AP' },
          { k: 'D', label: 'D' },
        ]
      : [
          { k: 'name', label: 'ARME', align: 'left' },
          { k: 'A', label: 'A' },
          { k: 'WS', label: 'WS', fmt: (v) => `${v}+` },
          { k: 'S', label: 'S' },
          { k: 'AP', label: 'AP' },
          { k: 'D', label: 'D' },
        ]
  );

  function isModified(w, k) {
    if (!baseWeapons) return false;
    const base = baseWeapons.find((b) => b.name === w.name);
    if (!base) return false;
    return base[k] !== w[k];
  }
</script>

{#if weapons && weapons.length > 0}
  <div class="wrap">
    <div class="head">
      {type === 'ranged' ? 'Tir' : 'Mêlée'}
    </div>
    <table>
      <thead>
        <tr>
          {#each cols as c}
            <th class="align-{c.align ?? 'center'}">{c.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each weapons as w}
          <tr>
            {#each cols as c}
              <td class="align-{c.align ?? 'center'}" class:modified={isModified(w, c.k)}>
                {c.fmt ? c.fmt(w[c.k]) : w[c.k]}
              </td>
            {/each}
          </tr>
          {#if w.keywords && w.keywords.length > 0}
            <tr class="kw-row">
              <td colspan={cols.length}>
                <span class="kw-label">[</span>{w.keywords.join(', ')}<span class="kw-label">]</span>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .wrap {
    margin-bottom: 12px;
  }
  .head {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    letter-spacing: 2px;
    margin-bottom: 4px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-body);
    font-size: 14px;
  }
  th {
    font-family: var(--font-arcade);
    font-size: 9px;
    color: var(--text-dim);
    letter-spacing: 1px;
    padding: 4px 4px;
    border-bottom: 1px solid var(--border);
    font-weight: normal;
  }
  td {
    padding: 4px 4px;
    border-bottom: 1px dashed rgba(57, 255, 20, 0.1);
    color: var(--text);
  }
  td.modified {
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    font-weight: bold;
  }
  .align-left {
    text-align: left;
  }
  .align-center {
    text-align: center;
  }
  .kw-row td {
    padding: 0 4px 6px;
    color: var(--text-mute);
    font-size: 11px;
    border-bottom: 1px solid var(--border);
  }
  .kw-label {
    color: var(--ork);
  }
</style>
