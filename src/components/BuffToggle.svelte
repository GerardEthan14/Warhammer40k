<script>
  let { buff, active = false, onToggle } = $props();
</script>

<button class="toggle" class:active onclick={() => onToggle?.(buff.id)} type="button">
  <span class="dot" class:on={active}></span>
  <span class="name">{buff.name}</span>
</button>

<style>
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-family: var(--font-title);
    font-size: 12px;
    background: var(--bg-elev-1);
    color: var(--text-dim);
    border: 1px solid var(--border);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .toggle.active {
    color: var(--magenta);
    border-color: var(--magenta);
    box-shadow: var(--glow-magenta);
    background: rgba(255, 43, 214, 0.1);
  }
  .toggle:hover {
    background: var(--bg-elev-2);
    color: var(--text);
  }
  .toggle.active:hover {
    background: var(--magenta);
    color: var(--bg);
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-mute);
    border: 1px solid currentColor;
  }
  .dot.on {
    background: var(--magenta);
    box-shadow: var(--glow-magenta);
  }
  .name {
    white-space: nowrap;
  }
</style>
