<template>
  <div class="overflow-x-auto shadow">
    <table class="table w-full">
      <thead>
        <tr>
          <td>Naam</td>
          <td>Functie</td>
          <td>Sinds</td>
          <td>Tot</td>
          <td>Lid Type</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in group.members" :key="member.id">
          <td>{{ member.id }}</td>
          <td>{{ member.function }}</td>
          <td>{{ member.startDate }}</td>
          <td>{{ member.stopDate }}</td>
          <td>{{ member.isAdmin ? "Beheerder" : "Lid" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Group } from "~/server/types";

defineProps<{
  group: Group;
}>();
</script>
