<script>
  import Home from './routes/Home.svelte';
  import Builder from './routes/Builder.svelte';
  import Play from './routes/Play.svelte';
  import UnitDetail from './routes/UnitDetail.svelte';
  import Stratagems from './routes/Stratagems.svelte';
  import Rules from './routes/Rules.svelte';
  import NavBar from './components/NavBar.svelte';
  import KeywordPopup from './components/KeywordPopup.svelte';
  import { router, match } from './router.svelte.js';

  // Résoudre la route active
  let resolved = $derived.by(() => {
    const p = router.path;
    let m;
    if ((m = match(p, '/'))) return { name: 'home' };
    if ((m = match(p, '/rules'))) return { name: 'rules' };
    if ((m = match(p, '/builder/:id'))) return { name: 'builder', params: m };
    if ((m = match(p, '/play/:id'))) return { name: 'play', params: m };
    if ((m = match(p, '/play/:id/unit/:instanceId'))) return { name: 'unit', params: m };
    if ((m = match(p, '/strats/:id'))) return { name: 'strats', params: m };
    return { name: 'notfound' };
  });

  let currentListId = $derived(
    ['builder', 'play', 'unit', 'strats'].includes(resolved.name)
      ? resolved.params?.id
      : null
  );
</script>

<NavBar listId={currentListId} />

{#if resolved.name === 'home'}
  <Home />
{:else if resolved.name === 'rules'}
  <Rules />
{:else if resolved.name === 'builder'}
  <Builder listId={resolved.params.id} />
{:else if resolved.name === 'play'}
  <Play listId={resolved.params.id} />
{:else if resolved.name === 'unit'}
  <UnitDetail listId={resolved.params.id} instanceId={resolved.params.instanceId} />
{:else if resolved.name === 'strats'}
  <Stratagems listId={resolved.params.id} />
{:else}
  <p>Route inconnue. <a href="#/">Retour à l'accueil</a></p>
{/if}

<KeywordPopup />
