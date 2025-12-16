

<nav class="sticky top-0 z-10 backdrop-blur-md bg-slate-900/90">
	<div class="flex justify-between items-center px-6 py-4 mx-auto md:px-12 lg:px-20">
	  <a href="/" class="text-2xl font-bold text-white">
		<img src="TT_logo.png" alt="TT Logo" class="w-10 h-10" />
	  </a>
	  
	  <div class="flex gap-6 items-center">
		<button 
		  onclick={() => scrollTo('projects')} 
		  class="hidden text-white transition-colors md:block hover:text-indigo-500 nav-link focus:outline-none focus:ring-2 focus:ring-indigo-500"
		>
		  Work
		</button>
		<button 
		  onclick={() => scrollTo('contact')} 
		  class="hidden text-white transition-colors md:block hover:text-indigo-500 nav-link focus:outline-none focus:ring-2 focus:ring-indigo-500"
		>
		  Contact
		</button>
	  </div>
	</div>
  </nav>

<script lang="ts">
  // Smooth scroll to sections
  export function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>