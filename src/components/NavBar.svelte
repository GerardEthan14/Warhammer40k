<script>
  import { router } from '../router.svelte.js';

  let { listId = null } = $props();

  const items = $derived(
    listId
      ? [
          { path: '/', label: 'Home' },
          { path: `/builder/${listId}`, label: 'Build' },
          { path: `/play/${listId}`, label: 'Play' },
          { path: `/strats/${listId}`, label: 'Strats' },
          { path: '/rules', label: 'Règles' },
        ]
      : [
          { path: '/', label: 'Home' },
          { path: '/rules', label: 'Règles' },
        ]
  );
</script>

<nav>
  {#each items as it}
    <button
      class:active={router.path === it.path}
      onclick={() => router.go(it.path)}
    >
      {it.label}
    </button>
  {/each}
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    gap: 4px;
    padding: 10px 0;
    background: linear-gradient(to bottom, var(--bg) 70%, rgba(10, 10, 10, 0));
    margin-bottom: 12px;
  }
  nav button {
    flex: 1;
    padding: 8px 4px;
    font-size: 11px;
  }
  nav button.active {
    color: var(--bg);
    background: var(--ork);
    box-shadow: var(--glow-ork);
  }
</style>
