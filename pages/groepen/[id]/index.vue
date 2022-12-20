<template>
  <div v-if="group" class="overflow-x-auto shadow">
    <table class="table w-full">
      <tbody>
        <tr>
          <td>ID</td>
          <td>{{ group.id }}</td>
        </tr>
        <tr>
          <td>Naam</td>
          <td>{{ group.name }}</td>
        </tr>
        <tr>
          <td>Beschrijving</td>
          <td>{{ group.description }}</td>
        </tr>
        <tr>
          <td>Sinds</td>
          <td>{{ ISOToString(group.startDate) }}</td>
        </tr>
        <tr>
          <td>Tot</td>
          <td>{{ ISOToString(group.stopDate) }}</td>
        </tr>
        <tr
          v-if="group.parentId"
          class="hover cursor-pointer"
          @click="navigateTo(`/groepen/${group.parentId}/overzicht`)"
        >
          <td>Onderdeel van</td>
          <td>{{ group.parentId }}</td>
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
  </div>

  <h2 v-if="group?.members" class="my-4 text-3xl text-primary font-bold mb-4">
    Leden
  </h2>
  <div v-if="group?.members" class="overflow-x-auto shadow">
    <table class="table w-full">
      <thead>
        <tr>
          <td>ID</td>
          <td>Functie</td>
          <td>Sinds</td>
          <td>Lid type</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in group.members.filter((m) => !m.stopDate)"
          :key="member.id"
        >
          <td>{{ member.id }}</td>
          <td>{{ member.function }}</td>
          <td>{{ ISOToString(member.startDate) }}</td>
          <td>{{ member.isAdmin ? "Beheerder" : "Lid" }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 v-if="group?.children" class="my-4 text-3xl text-primary font-bold mb-4">
    Subgroepen
  </h2>
  <div v-if="group?.children" class="overflow-x-auto shadow">
    <table class="table w-full">
      <thead>
        <tr>
          <td>Naam</td>
          <td>Beschrijving</td>
          <td>Sinds</td>
          <td>Tot</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="child in group.children"
          :key="child.id"
          class="hover cursor-pointer"
          @click="navigateTo(`/groepen/${child.id}/overzicht`)"
        >
          <td>{{ child.name }}</td>
          <td>{{ child.description }}</td>
          <td>{{ ISOToString(child.startDate) }}</td>
          <td>{{ ISOToString(child.stopDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Group } from "~/server/types";

const { ISOToString } = useDateFormatter();

defineProps<{
  group: Group;
}>();
</script>
