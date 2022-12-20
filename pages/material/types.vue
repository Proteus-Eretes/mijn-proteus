<template>
  <Breadcrumbs :crumbs="breadCrumbs.value" />
  <Alert v-if="error" type="error" content="Materiaal types ophalen mislukt" />
  <div class="overflow-x-auto shadow">
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
        <tr v-else-if="!types || types.length === 0">
          <td colspan="2" class="text-center italic">Geen types gevonden</td>
        </tr>
      </tbody>
    </table>
  </div>
  <LazyPageMaterialTypesCreate
    :parents="types || []"
    @refresh-types="() => refresh()"
  />
</template>

<script lang="ts" setup>
const {
  data: types,
  error,
  pending,
  refresh,
} = await useLazyFetch<
  Awaited<
    ReturnType<typeof import("~~/server/api/material/type/index.get").default>
  >
>("/api/material/type");

const { breadCrumbs } = useBreadcrumbs();
</script>
