<script>
  let { abilities = [] } = $props();
</script>

{#if abilities.length > 0}
  <div class="wrap">
    <div class="head">Capacités</div>
    <ul>
      {#each abilities as a}
        <li>
          <span class="name">{a.name}</span>
          {#if a.type}
            <span class="chip {a.type === 'faction' ? 'magenta' : ''}">{a.type}</span>
          {/if}
          <p>{a.description}</p>
        </li>
      {/each}
    </ul>
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
  li {
    border-left: 2px solid var(--border-strong);
    padding: 4px 0 4px 10px;
  }
  .name {
    font-family: var(--font-title);
    color: var(--ork);
    font-weight: 700;
    margin-right: 6px;
  }
  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: var(--text-dim);
  }
</style>
