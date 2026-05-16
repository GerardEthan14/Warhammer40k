<script>
  import { detachments } from '../data/index.js';

  let { value = null, onChange } = $props();
</script>

<div class="picker">
  <div class="label">Détachement</div>
  <div class="options">
    {#each detachments as d}
      <button
        class="opt"
        class:selected={value === d.id}
        onclick={() => onChange?.(d.id)}
      >
        <span class="name">{d.name}</span>
        <span class="rule-name">{d.rule.name}</span>
      </button>
    {/each}
  </div>
  {#if value}
    {@const sel = detachments.find((x) => x.id === value)}
    {#if sel}
      <div class="rule-box">
        <h3>{sel.rule.name}</h3>
        <p>{sel.rule.description}</p>
        {#if sel.enhancements && sel.enhancements.length > 0}
          <div class="enh-head">Enhancements</div>
          <ul>
            {#each sel.enhancements as e}
              <li>
                <strong>{e.name}</strong>
                <span class="chip yellow">{e.cost} pts</span>
                <div class="dim">{e.description}</div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .picker {
    margin-bottom: 16px;
  }
  .label {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    letter-spacing: 2px;
    margin-bottom: 6px;
  }
  .options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .opt {
    flex: 1 1 140px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 8px 10px;
    text-transform: none;
    letter-spacing: 0;
  }
  .opt .name {
    font-family: var(--font-title);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .opt .rule-name {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--text-mute);
    margin-top: 2px;
  }
  .opt.selected {
    color: var(--bg);
    background: var(--ork);
    box-shadow: var(--glow-ork-strong);
  }
  .opt.selected .rule-name {
    color: rgba(10, 10, 10, 0.6);
  }
  .rule-box {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px;
    background: var(--bg-elev-1);
  }
  .enh-head {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    letter-spacing: 1px;
    margin: 8px 0 4px;
  }
  .rule-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .rule-box li {
    border-left: 2px solid var(--border-strong);
    padding-left: 8px;
  }
</style>
