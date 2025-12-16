<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { fade, scale } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import CloseIcon from '$lib/icons/CloseIcon.svelte';
  
    const { project, onClose } = $props<{
      project: {
        title: string;
        description: string;
        tags: string[];
        link: string;
        images: { src: string; description: string }[];
      };
      onClose: () => void;
    }>();
  
    let visible = $state(true);
    let currentSlide = $state(0);
  
    const close = () => {
      visible = false;
      onClose();
    };
  
    const onCloseHandler = (event: MouseEvent) => {
      event.stopPropagation();
      close();
    };
  
    const onEscapeHandler = () => {
      close();
    };
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % project.images.length;
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + project.images.length) % project.images.length;
    }
  
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') close();
    }
  
    onMount(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    });
  </script>
  
  {#if visible}
    <div
      class="fixed inset-0 z-40 backdrop-blur-sm bg-black/80"
      out:fade={{ duration: 200 }}
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalContent"
      tabindex="-1"
      onkeydown={handleKeydown}
    >
      <div
        transition:scale={{ delay: 25, duration: 150, easing: quintOut }}
        class="relative z-50 p-4 mx-auto w-full max-w-6xl sm:p-6"
      >
        <div
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col h-[80vh]"
          data-modal-content
        >
          <!-- Header -->
          <div class="flex-none px-6 py-4 border-b border-gray-200 dark:border-gray-700 sm:px-8 sm:py-6">
            <div class="flex justify-between items-center">
              <h3 id="modalTitle" class="text-2xl font-semibold text-gray-800 dark:text-white">
                {project.title}
              </h3>
              <button
                onclick={close}
                class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close modal"
              >
                <CloseIcon className="w-6 h-6" fill="currentColor" />
              </button>
            </div>
          </div>
  
          <!-- Content Area -->
          <div id="modalContent" class="flex overflow-hidden flex-col flex-1 md:flex-row">
            <!-- Slideshow -->
            <div class="overflow-hidden relative w-full bg-gray-100 md:w-2/3 dark:bg-gray-700">
              {#each project.images as image, i}
                <div
                  class="flex absolute inset-0 justify-center items-center p-4 transition-opacity duration-300"
                  class:opacity-100={i === currentSlide}
                  class:opacity-0={i !== currentSlide}
                  class:pointer-events-none={i !== currentSlide}
                >
                  <img
                    src={`${base}${image.src}`}
                    alt={`${project.title} screenshot ${i + 1}`}
                    class="object-contain max-w-full max-h-full"
                  />
                </div>
              {/each}
  
              <!-- Navigation Arrows -->
              <button
                onclick={prevSlide}
                class="absolute left-4 top-1/2 p-2 rounded-full backdrop-blur-sm transition-colors -translate-y-1/2 bg-white/30 dark:bg-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-600/50"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onclick={nextSlide}
                class="absolute right-4 top-1/2 p-2 rounded-full backdrop-blur-sm transition-colors -translate-y-1/2 bg-white/30 dark:bg-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-600/50"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
  
              <!-- Slide Indicators -->
              <div class="flex absolute right-0 left-0 bottom-4 justify-center space-x-2">
                {#each project.images as _, i}
                  <button
                    onclick={() => currentSlide = i}
                    class="w-3 h-3 rounded-full transition-colors {i === currentSlide ? 'bg-blue-600' : 'bg-slate-300/50 dark:bg-slate-500/50'}"
                    aria-label={`Go to slide ${i + 1}`}
                  ></button>
                {/each}
              </div>
            </div>
  
            <!-- Description Panel -->
            <div class="overflow-y-auto p-6 w-full border-t border-gray-200 md:w-1/3 md:border-t-0 md:border-l dark:border-gray-700">
              {#if currentSlide === 0}
                <div class="space-y-4">
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-white">Project Overview</h4>
                  <p class="text-gray-600 dark:text-gray-300">{project.description}</p>
                  
                  <div class="pt-4">
                    <h5 class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Technologies Used</h5>
                    <div class="flex flex-wrap gap-2">
                      {#each project.tags as tag}
                        <span class="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </div>
                </div>
              {:else}
                <div class="space-y-4">
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-white">Feature Details</h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    {project.images[currentSlide].description}
                  </p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}