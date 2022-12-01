<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Materiaal Types</h1>
  <div v-if="!error" class="overflow-x-auto shadow">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Super Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="materialType in types" :key="materialType.id">
          <td>{{ materialType.name }}</td>
          <td>
            {{ materialType.parent?.name || "-" }}
          </td>
        </tr>
        <tr v-if="pending">
          <td colspan="2" class="text-center italic">Types laden..</td>
        </tr>
        <tr v-else-if="!types || !('length' in types) || types.length === 0">
          <td colspan="2" class="text-center italic">Geen types gevonden</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Alert v-else type="error" content="Materiaal types ophalen mislukt" />
  <LazyPageMaterialTypesCreate
    :parents="types || []"
    @refresh-types="() => execute()"
  />
</template>

<script lang="ts" setup>
const {
  data: types,
  error,
  pending,
  execute,
} = await useLazyApiFetch<
  Awaited<
    ReturnType<typeof import("~~/server/api/material/type/index.get").default>
  >
>("/api/material/type", () => true);
</script>
