<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Groepen</h1>
  <div class="overflow-x-auto shadow">
    <div class="input-group p-2">
      <input
        type="search"
        placeholder="Search…"
        class="input input-bordered"
        @input="filter = $event.target.value.toLowerCase()"
      />
      <button class="btn btn-square">
        <Icon name="ic:search" size="20px" />
      </button>
    </div>
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
          v-for="group in groups.filter((g) =>
            g.name.toLowerCase().includes(filter),
          )"
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

const { data: groups } = await useFetch<
  Awaited<ReturnType<typeof import("~~/server/api/groups/index.get").default>>
>("/api/groups");
</script>
