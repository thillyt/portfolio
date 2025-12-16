<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/NavBar.svelte';
  
	let { children } = $props();
</script>
  
<div class="flex flex-col min-h-screen bg-[#1F2937]">
  
	<main>
	  	{@render children()}
	</main>
  
</div>