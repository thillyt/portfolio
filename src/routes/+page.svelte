<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { projects } from '$lib/data/projects';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import ProjectModal from '$lib/components/ProjectModal.svelte';

  function preload(src: string) {
    const img = new Image();
    img.src = `${base}${src}`;
  }

  let formData = {
    name: '',
    email: '',
    message: ''
  };
  
  let formErrors = {
    name: '',
    email: '',
    message: ''
  };
  
  let isSubmitting = false;
  let submitSuccess = false;
  
  // Modal state
  let showModal = false;
  let selectedProject: typeof projects[0] | null = null;
  
  // Smooth scroll to sections
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  

  // Skills data
  const skills = {
    frontend: ["JavaScript", "TypeScript", "Svelte", "React", "Next.js", "HTML/CSS"],
    design: ["Tailwind", "Figma", "Axure RP", "CSS Animations", "Responsive Design"],
    tools: ["Git", "Power BI", "SQL", "Vercel", "Firebase", "Node.js"]
  };

  // Form validation
  function validateForm() {
    let isValid = true;
    formErrors = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      formErrors.message = 'Message is required';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      submitSuccess = true;
      formData = { name: '', email: '', message: '' };
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        submitSuccess = false;
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  // Open project modal
  function openProjectModal(project: typeof projects[0]) {
    selectedProject = project;
    showModal = true;
  }

  onMount(() => {

    projects.forEach((p) => preload(p.image));
    projects.forEach((p) => p.images?.[0] && preload(p.images[0].src));
});
</script>

<svelte:head>
  <link rel="preload" as="image" href={`${base}/thilly.jpg`} />
  <link rel="preload" as="image" href={`${base}/TT_logo.png`} />
</svelte:head>

<div class="min-h-screen transition-colors duration-300 bg-slate-900">
<!-- Navigation -->
<NavBar />

<!-- Hero Section -->
<section class="overflow-hidden relative px-6 pb-20 md:px-12 lg:px-20 pt-18">
  <div class="absolute inset-0 pointer-events-none select-none" aria-hidden="true" style="z-index:0;">
    <div class="w-full h-full bg-gradient-to-br to-transparent from-indigo-500/10"></div>
  </div>
  <div class="flex relative z-10 flex-col gap-12 items-center md:flex-row">
    <div class="md:w-1/2">
      <h1 class="mb-6 text-5xl font-bold text-white md:text-6xl animate-fade-in">
        Hello, I'm <span class="text-indigo-500">Thilly Thana</span>
      </h1>
      <h2 class="mb-8 text-2xl font-normal md:text-3xl text-slate-300">
        Frontend and BI Developer building modern dashboards, web and app experiences
      </h2>
      <p class="mb-8 text-lg text-slate-300">Passionate about crafting delightful, performant, and accessible user interfaces.</p>
      <div class="flex flex-col gap-4 sm:flex-row">
        <button 
          onclick={() => scrollTo('projects')} 
          class="px-6 py-3 font-medium text-white bg-indigo-500 rounded-lg shadow-md transition hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          View My Work
        </button>
        <button 
          onclick={() => scrollTo('contact')} 
          class="px-6 py-3 font-medium text-white rounded-lg border-2 border-white transition hover:border-indigo-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Contact Me
        </button>
      </div>
      <div class="flex gap-4 mt-8">
        <a href="https://github.com/thillyt" target="_blank" rel="noopener noreferrer" class="text-white transition-colors hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="GitHub profile">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
          </svg>
        </a>
        <a href="https://linkedin.com/in/thillyt" target="_blank" rel="noopener noreferrer" class="text-white transition-colors hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="LinkedIn profile">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="flex justify-center items-center md:w-1/2">
      <div class="inline-block relative transform rotate-3">
        <img src="thilly.jpg" alt="Thilly Thana" class="object-cover rounded-xl border-4 border-indigo-500 shadow-2xl w-84 h-84" />
        <div class="absolute -inset-2 rounded-xl border-4 border-indigo-300 z-[-1]"></div>
      </div>
    </div>
  </div>
</section>

<!-- Add extra space below hero -->
<div class="h-12 md:h-20"></div>

<!-- Projects Section -->
<section id="projects" class="py-24 md:py-32 bg-slate-900">
  <div class="px-6 mx-auto md:px-12 lg:px-20">
    <h2 class="mb-16 text-3xl font-bold text-center text-white md:mb-20">
      My <span class="text-indigo-500">Projects</span>
    </h2>
    
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
      {#each projects as project, i}
        <button 
          class="flex overflow-hidden flex-col h-full text-left rounded-xl shadow-lg transition-shadow duration-300 cursor-pointer group hover:shadow-xl bg-slate-800"
          in:fade={{ delay: i * 100 }}
          onclick={() => openProjectModal(project)}
        >
          <div class="flex justify-center items-center h-48 bg-slate-900">
            <img 
              src={`${base}${project.image}`} 
              alt={project.title} 
              class="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col flex-1 p-6 md:p-8">
            <h3 class="mb-3 text-xl font-bold text-white">{project.title}</h3>
            <p class="flex-1 mb-4 text-slate-300">{project.description}</p>
            <div class="flex flex-wrap gap-2 mt-auto">
              {#each project.tags as tag}
                <span class="px-3 py-1 text-sm text-indigo-500 rounded-full bg-indigo-500/10">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Skills Section -->
<section class="py-24 md:py-32 bg-slate-900">
  <div class="px-6 mx-auto md:px-12 lg:px-20">
    <h2 class="mb-16 text-3xl font-bold text-center text-white md:mb-20">
      My <span class="text-indigo-500">Skills</span>
    </h2>
    
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
      {#each Object.entries(skills) as [category, items]}
        <div class="p-6 rounded-xl shadow-md bg-slate-800 md:p-8" in:fade={{ delay: 200 }}>
          <h3 class="mb-6 text-xl font-bold text-white capitalize">{category}</h3>
          <ul class="space-y-3">
            {#each items as item}
              <li class="flex items-center">
                <svg class="mr-3 w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-white">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-24 md:py-32 bg-slate-800">
  <div class="px-6 mx-auto md:px-12 lg:px-20">
    <h2 class="mb-16 text-3xl font-bold text-center text-white md:mb-20">
      Get In <span class="text-indigo-500">Touch</span>
    </h2>
    
    <div class="overflow-hidden p-6 mx-auto max-w-2xl rounded-xl shadow-md bg-slate-900 md:p-8">
      {#if submitSuccess}
        <div class="px-4 py-3 mb-6 text-indigo-500 rounded border border-indigo-500 bg-indigo-500/10">
          Thank you for your message! I'll get back to you soon.
        </div>
      {/if}
      
      <form class="space-y-6" onsubmit={handleSubmit}>
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-white">Name</label>
          <input 
            type="text" 
            id="name" 
            bind:value={formData.name}
            class="w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-900 text-white {formErrors.name ? 'border-red-500' : ''}"
            placeholder="Your name"
          />
          {#if formErrors.name}
            <p class="mt-1 text-sm text-red-500">{formErrors.name}</p>
          {/if}
        </div>
        
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={formData.email}
            class="w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-900 text-white {formErrors.email ? 'border-red-500' : ''}"
            placeholder="your@email.com"
          />
          {#if formErrors.email}
            <p class="mt-1 text-sm text-red-500">{formErrors.email}</p>
          {/if}
        </div>
        
        <div>
          <label for="message" class="block mb-2 text-sm font-medium text-white">Message</label>
          <textarea 
            id="message" 
            rows="4" 
            bind:value={formData.message}
            class="w-full px-4 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-900 text-white {formErrors.message ? 'border-red-500' : ''}"
            placeholder="Your message..."
          ></textarea>
          {#if formErrors.message}
            <p class="mt-1 text-sm text-red-500">{formErrors.message}</p>
          {/if}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          class="px-6 py-3 w-full font-medium text-white bg-indigo-500 rounded-lg transition-colors hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      <div class="pt-8 mt-8 border-t border-slate-700">
        <h3 class="mb-4 text-lg font-medium text-white">Or connect directly</h3>
        <div class="flex space-x-4">
          <a href="https://github.com/thillyt" target="_blank" rel="noopener noreferrer" class="text-white transition-colors hover:text-indigo-500" aria-label="GitHub profile">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="https://linkedin.com/in/thillyt" target="_blank" rel="noopener noreferrer" class="text-white transition-colors hover:text-indigo-500" aria-label="LinkedIn profile">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="mailto:thilly@example.com" class="text-white transition-colors hover:text-indigo-500" aria-label="Send email">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="py-12 border-t bg-slate-900 border-slate-800">
  <div class="px-6 mx-auto text-center md:px-12 lg:px-20">
    <p class="text-slate-300">
      © {new Date().getFullYear()} Thilly Thana. All rights reserved.
    </p>
  </div>
</footer>

<!-- Project Modal -->
{#if showModal && selectedProject}
  <ProjectModal 
    project={selectedProject} 
    onClose={() => showModal = false} 
  />
{/if}
</div>