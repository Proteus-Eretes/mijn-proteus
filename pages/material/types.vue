<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Materiaal Types</h1>
  <div v-if="error" class="alert alert-error shadow-lg">
    <div>
      <Icon name="material-symbols:cancel-outline" size="24px" />
      <span>Materiaal types ophalen mislukt</span>
    </div>
  </div>
  <div v-if="types" class="overflow-x-auto shadow">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="materialType in types" :key="materialType.id">
          <td>{{ materialType.name }}</td>
          <th>
            <button class="btn btn-square btn-outline btn-error btn-xs">
              <Icon
                name="material-symbols:delete-forever-outline"
                size="18px"
              />
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const { data: types, error } = await useFetch("/api/material/type");
</script>
