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
            {{
              materialType.parentId ? parentNames[materialType.parentId] : ""
            }}
          </td>
        </tr>
        <tr v-if="!types || !('length' in types) || types.length === 0">
          <td colspan="2" class="text-center italic">Geen types gevonden</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Alert v-else type="error" content="Materiaal types ophalen mislukt" />
  <LazyPageMaterialTypesCreate
    :parents="types || []"
    @refresh-types="refresh"
  />
</template>

<script lang="ts" setup>
import { MaterialType } from ".prisma/client";

const {
  data: types,
  error,
  refresh,
} = await useFetch<MaterialType[]>("/api/material/type");

const parentNames = computed(() => {
  const kv = types.value?.map((type) => [type.id, type.name]) || [];
  return Object.fromEntries(kv);
});
</script>
