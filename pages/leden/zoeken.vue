<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Leden</h1>
  <div class="overflow-x-auto shadow">
    <!--    <SearchBox index-name="members">-->
    <!--      <template #default="{ items, sendEvent }">-->
    <!--        <div class="flex flex-wrap gap-5">-->
    <!--          <NuxtLink-->
    <!--            v-for="item in items"-->
    <!--            :key="item.id"-->
    <!--            :to="`/member/${item.id}`"-->
    <!--            class="card w-96 bg-base-100 shadow-xl"-->
    <!--            @click="sendEvent('click', item, 'Op lid geklikt')"-->
    <!--          >-->
    <!--            <figure>-->
    <!--              <img src="https://placeimg.com/400/225/people" alt="Shoes" />-->
    <!--            </figure>-->
    <!--            <div class="card-body">-->
    <!--              <h2 class="card-title">-->
    <!--                {{ item.firstName }} {{ item.insertion }} {{ item.lastName }}-->
    <!--                <div class="badge badge-secondary">Jaarlaag hiero</div>-->
    <!--              </h2>-->
    <!--              <p>Geboortedatum: {{ dateFormatter(item.dateOfBirth) }}</p>-->
    <!--              <p>Adres: {{ item.street }} {{ item.number }} {{ item.city }}</p>-->
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
          <th>Geboortedatum</th>
          <th>Adres</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in members"
          :key="member.id"
          class="hover"
          @click="navigateTo(`/leden/${member.id}`)"
        >
          <td>
            {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
          </td>
          <td>{{ dateFormatter(member.dateOfBirth) }}</td>
          <td>{{ member.street }} {{ member.number }} {{ member.city }}</td>
          <td>{{ member.contacts }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const dateFormatter = useDateFormatter();

const { data: members } = await useFetch<
  Awaited<ReturnType<typeof import("~~/server/api/members/index.get").default>>
>("/api/members");
</script>
