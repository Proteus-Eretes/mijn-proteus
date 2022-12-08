<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ me.firstName }} {{ me.insertion }} {{ me.lastName }}
  </h1>
  <div class="overflow-x-auto shadow"></div>
  <table class="table w-full">
    <tbody>
      <tr>
        <td>ID</td>
        <td>{{ me.id }}</td>
      </tr>
      <tr>
        <td>Initialen</td>
        <td>{{ me.initials }}</td>
      </tr>
      <tr>
        <td>Naam</td>
        <td>{{ me.firstName }} {{ me.insertion }} {{ me.lastName }}</td>
      </tr>
      <tr>
        <td>Geboortedatum</td>
        <td>{{ dateFormatter(me.dateOfBirth) }}</td>
      </tr>
      <tr>
        <td>Geslacht</td>
        <td>{{ me.sex }}</td>
      </tr>
      <tr>
        <td>Adres</td>
        <td>{{ me.street }} {{ me.number }} {{ me.city }}</td>
      </tr>
      <tr>
        <td>Postcode</td>
        <td>{{ me.zipcode }}</td>
      </tr>
      <tr>
        <td>Land</td>
        <td>{{ me.country }}</td>
      </tr>
      <tr>
        <td>Contactinformatie</td>
        <td>{{ me.contacts }}</td>
      </tr>
      <tr>
        <td>Studies</td>
        <td>{{ me.studies }}</td>
      </tr>
      <tr>
        <td>Groepen</td>
        <td>{{ me.memberships }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const dateFormatter = useDateFormatter();

const { data: me } = await useFetch<
  Awaited<
    ReturnType<typeof import("~~/server/api/members/[id]/index.get").default>
  >
>("/api/members/8e4d3d50-f056-46d3-9b8b-c33db0fd7248");
</script>
