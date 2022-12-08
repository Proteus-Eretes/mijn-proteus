<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Groepen</h1>
  <div class="overflow-x-auto shadow">
    <div class="p-2 text-center border-2 border-red-300">
      ---=== Nieuwe endpoint voor mijn-groepen moet nog gemaakt worden ===---
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
          v-for="group in groups"
          :key="group.id"
          class="hover"
          @click="navigateTo(`/groepen/${group.id}`)"
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

const { data: groups } = await useFetch<
  Awaited<ReturnType<typeof import("~~/server/api/groups/index.get").default>>
>("/api/groups");
</script>
