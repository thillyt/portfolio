<script lang="ts">
    import { projects } from '$lib/data/projects';
  </script>
  
  <section class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold mb-6">Projects</h2>
    <div class="grid gap-6 md:grid-cols-2">
      {#each projects as project}
        <div class="bg-white rounded-lg shadow p-4">
          <img src={project.image} alt={project.title} class="w-full h-48 object-cover rounded" />
          <h3 class="text-xl font-semibold mt-4">{project.title}</h3>
          <p class="text-gray-700">{project.description}</p>
          <div class="mt-4 flex gap-4">
            <a href={project.link} class="text-blue-500 underline">Live</a>
            <a href={project.github} class="text-gray-700 underline">Code</a>
          </div>
        </div>
      {/each}
    </div>
  </section>