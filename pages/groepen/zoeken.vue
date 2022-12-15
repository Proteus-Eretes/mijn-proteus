<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Zoeken</h1>
  <div class="overflow-x-auto shadow">
    <input
      type="search"
      placeholder="Search…"
      class="input input-bordered w-full"
      @input="filter = $event.target.value.toLowerCase()"
    />
    <table class="table w-full">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Beschrijving</th>
          <th>Sinds</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="group in filteredGroups"
          :key="group.id"
          class="hover"
          @click="navigateTo(`/groep/${group.id}/overzicht`)"
        >
          <td>{{ group.name }}</td>
          <td>{{ group.description }}</td>
          <td>{{ dateFormatter(group.startDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const dateFormatter = useDateFormatter();

const filter = ref("");
const filteredGroups = computed(() => {
  if (!groups.value) return [];
  return groups.value.filter((g) =>
    g.name.toLowerCase().includes(filter.value),
  );
});

const { data: groups } = await useFetch<
  Awaited<ReturnType<typeof import("~~/server/api/groups/index.get").default>>
>("/api/groups");
</script>
