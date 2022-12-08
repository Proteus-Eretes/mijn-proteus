<template>
  <h1 class="text-4xl text-primary font-bold mb-4">{{ group.name }}</h1>
  <div class="overflow-x-auto shadow"></div>
  <table class="table w-full">
    <tbody>
      <tr>
        <td>ID</td>
        <td>{{ group.id }}</td>
      </tr>
      <tr>
        <td>Beschrijving</td>
        <td>{{ group.description }}</td>
      </tr>
      <tr>
        <td>Sinds</td>
        <td>{{ dateFormatter(group.startDate) }}</td>
      </tr>
      <tr>
        <td>Tot</td>
        <td>{{ dateFormatter(group.stopDate) }}</td>
      </tr>
      <tr>
        <td>Parent Group</td>
        <td>{{ group.parentId ?? "Geen" }}</td>
      </tr>
      <tr>
        <td>Contactinformatie</td>
        <td>{{ group.contacts }}</td>
      </tr>
      <tr>
        <td>Permissions</td>
        <td>{{ group.permissions }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const dateFormatter = useDateFormatter();
const route = useRoute();

const { data: group } = await useFetch<
  Awaited<
    ReturnType<typeof import("~~/server/api/groups/[id]/index.get").default>
  >
>("/api/groups/" + route.params.id);
</script>
