<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Groepen</h1>
  <div class="overflow-x-auto shadow">
    <!--    <SearchBox index-name="groups">-->
    <!--      <template #default="{ items, sendEvent }">-->
    <!--        <div class="flex flex-wrap gap-5">-->
    <!--          <NuxtLink-->
    <!--            v-for="item in items"-->
    <!--            :key="item.id"-->
    <!--            :to="`/member/${item.id}`"-->
    <!--            class="card w-1/3 bg-base-100 shadow-xl"-->
    <!--            @click="sendEvent('click', item, 'Op groep geklikt')"-->
    <!--          >-->
    <!--            <figure>-->
    <!--              <img src="https://placeimg.com/400/225/tech" alt="Groep" />-->
    <!--            </figure>-->
    <!--            <div class="card-body">-->
    <!--              <h2 class="card-title">{{ item.name }}</h2>-->
    <!--              <p>Parent: {{ dateFormatter(item.dateOfBirth) }}</p>-->
    <!--              <p>Parent: {{ item.parentId }}</p>-->
    <!--              <div class="card-actions justify-end">-->
    <!--                <div class="badge badge-outline">Fashion</div>-->
    <!--                <div class="badge badge-outline">Products</div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </NuxtLink>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </SearchBox>-->
    <div class="p-2 text-center border-2 border-red-300">
      ---=== Meilisearch zoekbalk moet nog gemaakt worden ===---
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
