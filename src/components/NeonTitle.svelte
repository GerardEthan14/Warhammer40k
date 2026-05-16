<script>
  let { text = 'WAAAGH!!', flicker = true, size = 'lg' } = $props();
</script>

<span class="waaagh size-{size}" class:flicker>{text}</span>

<style>
  .size-sm { font-size: 28px; letter-spacing: 2px; }
  .size-md { font-size: 44px; letter-spacing: 3px; }
  .size-lg { font-size: 64px; letter-spacing: 4px; }
  .size-xl { font-size: 84px; letter-spacing: 6px; }

  @media (max-width: 480px) {
    .size-lg { font-size: 48px; }
    .size-xl { font-size: 60px; }
  }
</style>
