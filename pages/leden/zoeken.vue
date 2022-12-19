<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Leden Zoeken</h1>
  <div class="overflow-x-auto shadow">
    <input
      type="search"
      placeholder="Zoeken…"
      class="input input-bordered w-full"
      @input="
        filter = ($event.target as HTMLTextAreaElement).value.toLowerCase()
      "
    />
    <table class="table w-full">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Geboortedatum</th>
          <th>Adres</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in filteredMembers"
          :key="member.id"
          class="hover"
          @click="navigateTo(`/leden/${member.id}/profiel`)"
        >
          <td>
            {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
          </td>
          <td>{{ ISOToString(member.dateOfBirth) }}</td>
          <td>{{ member.street }} {{ member.number }} {{ member.city }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { ISOToString } = useDateFormatter();

const filter = ref("");
const filteredMembers = computed(() => {
  if (!members.value) return [];
  return members.value.filter(
    (m) =>
      m.firstName.toLowerCase().includes(filter.value) ||
      m.insertion.toLowerCase().includes(filter.value) ||
      m.lastName.toLowerCase().includes(filter.value),
  );
});

const { data: members } = await useFetch<
  Awaited<ReturnType<typeof import("~~/server/api/members/index.get").default>>
>("/api/members");
</script>
