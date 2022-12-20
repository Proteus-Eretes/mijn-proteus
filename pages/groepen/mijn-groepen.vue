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
          <td>{{ membership.startDate }}</td>
          <td>{{ membership.stopDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { breadCrumbs } = useBreadcrumbs();

const filter = ref("");
const filteredMemberships = computed(() => {
  if (!memberships.value) return [];
  return memberships.value.filter((m) =>
    m.group.name.toLowerCase().includes(filter.value),
  );
});

// TODO: Fetch logged in member's memberships
const memberships = ref<
  Awaited<
    ReturnType<
      typeof import("~~/server/api/members/[id]/memberships.get").default
    >
  >
>([]);
</script>
