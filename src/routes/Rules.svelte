<script>
  import { RULES, RULES_ORDER } from '../data/rules.js';
  import KeywordChip from '../components/KeywordChip.svelte';

  let active = $state(RULES_ORDER[0]);

  function isFilled(section) {
    if (section.entries) return section.entries.length > 0;
    return (
      (section.intro && section.intro.length > 0) ||
      (section.steps && section.steps.length > 0) ||
      (section.key_points && section.key_points.length > 0)
    );
  }

  let activeSection = $derived(RULES[active]);
</script>

<h1>Règles du jeu</h1>
<p class="sub">Référence rapide · 10<sup>e</sup> édition</p>

<nav class="tabs">
  {#each RULES_ORDER as key}
    {@const s = RULES[key]}
    <button
      class:active={active === key}
      class:empty={!isFilled(s)}
      onclick={() => (active = key)}
    >
      <span class="icon">{s.icon}</span>
      <span class="lbl">{s.name}</span>
    </button>
  {/each}
</nav>

<section class="content neon-card">
  <h2>{activeSection.icon} {activeSection.name}</h2>

  {#if !isFilled(activeSection)}
    <p class="muted">Section pas encore rédigée. Reviens plus tard.</p>
  {/if}

  {#if activeSection.intro}
    <p class="intro">{activeSection.intro}</p>
  {/if}

  {#if activeSection.steps && activeSection.steps.length > 0}
    <h3>Ordre des étapes</h3>
    <ol class="steps">
      {#each activeSection.steps as step}
        <li>{step}</li>
      {/each}
    </ol>
  {/if}

  {#if activeSection.key_points && activeSection.key_points.length > 0}
    <h3>Points clés</h3>
    <ul class="points">
      {#each activeSection.key_points as p}
        <li><span class="mark">✓</span>{p}</li>
      {/each}
    </ul>
  {/if}

  {#if activeSection.pitfalls && activeSection.pitfalls.length > 0}
    <h3>Pièges</h3>
    <ul class="pitfalls">
      {#each activeSection.pitfalls as p}
        <li><span class="mark warn">⚠</span>{p}</li>
      {/each}
    </ul>
  {/if}

  {#if activeSection.entries && activeSection.entries.length > 0}
    <ul class="kw-list">
      {#each activeSection.entries as e}
        <li>
          <div class="kw-name"><KeywordChip text={e.name} /></div>
          <p>{e.description}</p>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  h1 {
    margin-bottom: 4px;
  }
  .sub {
    font-family: var(--font-arcade);
    font-size: 10px;
    color: var(--magenta);
    text-shadow: var(--glow-magenta);
    letter-spacing: 2px;
    margin: 0 0 18px;
  }
  .tabs {
    display: flex;
    overflow-x: auto;
    gap: 6px;
    margin-bottom: 14px;
    padding-bottom: 4px;
    scrollbar-width: thin;
  }
  .tabs::-webkit-scrollbar {
    height: 4px;
  }
  .tabs button {
    flex: 0 0 auto;
    padding: 8px 12px;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 72px;
    white-space: nowrap;
  }
  .tabs button.active {
    color: var(--bg);
    background: var(--ork);
    box-shadow: var(--glow-ork);
  }
  .tabs button.empty {
    opacity: 0.45;
  }
  .icon {
    font-size: 16px;
  }
  .lbl {
    font-size: 9px;
    letter-spacing: 0.5px;
  }
  .content {
    margin-bottom: 60px;
  }
  .content h2 {
    margin: 0 0 12px;
    font-size: 18px;
  }
  .content h3 {
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 13px;
  }
  .intro {
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 8px;
  }
  .steps {
    padding-left: 22px;
    margin: 0;
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
  }
  .steps li {
    margin-bottom: 6px;
  }
  .points,
  .pitfalls {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .points li,
  .pitfalls li {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    color: var(--text);
    font-size: 14px;
    line-height: 1.45;
  }
  .mark {
    color: var(--ork);
    font-weight: 700;
    flex: 0 0 16px;
  }
  .mark.warn {
    color: var(--yellow);
    text-shadow: var(--glow-yellow);
  }
  .kw-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .kw-list li {
    border-left: 2px solid var(--border-strong);
    padding-left: 10px;
  }
  .kw-name {
    font-family: var(--font-title);
    font-size: 14px;
    margin-bottom: 4px;
  }
  .kw-list p {
    margin: 0;
    color: var(--text-dim);
    font-size: 13px;
    line-height: 1.5;
  }
</style>
