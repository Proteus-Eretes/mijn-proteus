<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
  <div class="overflow-x-auto shadow">
    <input
      type="search"
      placeholder="Zoeken…"
      class="input input-bordered w-full"
      @input="
        filter = ($event.target as HTMLTextAreaElement).value.toLowerCase()
      "
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
          @click="navigateTo(`/groepen/${group.id}`)"
        >
          <td>{{ group.name }}</td>
          <td>{{ group.description }}</td>
          <td>{{ ISOToString(group.startDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Groups } from "~/server/types";

const { ISOToString } = useDateFormatter();
const { breadCrumbs } = useBreadcrumbs();

const filter = ref("");
const filteredGroups = computed(() => {
  if (!groups.value) return [];
  return groups.value.filter(
    (g) =>
      g.name.toLowerCase().includes(filter.value) ||
      g.description.toLowerCase().includes(filter.value),
  );
});

const { data: groups } = await useFetch<Groups>("/api/groups");
</script>
