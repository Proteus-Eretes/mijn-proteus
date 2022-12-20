<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
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
          <th>Groep</th>
          <th>Functie</th>
          <th>Sinds</th>
          <th>Tot</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="membership in filteredMemberships"
          :key="membership.id"
          class="hover"
          @click="navigateTo(`/groepen/${membership.group.id}/overzicht`)"
        >
          <td>{{ membership.group.name }}</td>
          <td>{{ membership.function }}</td>
          <td>{{ ISOToString(membership.startDate) }}</td>
          <td>{{ ISOToString(membership.stopDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { ISOToString } = useDateFormatter();
const { breadCrumbs } = useBreadcrumbs();
const { data } = useSession();

const filter = ref("");
const filteredMemberships = computed(() => {
  if (!memberships.value) return [];
  return memberships.value.filter((m) =>
    m.group.name.toLowerCase().includes(filter.value),
  );
});

const { data: memberships } = await useFetch<
  Awaited<
    ReturnType<
      typeof import("~~/server/api/members/[id]/memberships.get").default
    >
  >
>(`/api/members/${data.value?.user?.proteusId}/memberships`);
</script>
