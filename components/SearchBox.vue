<template>
  <AisInstantSearch
    :search-client="client"
    :index-name="indexName"
    :class-names="{ 'ais-InstantSearch': 'card p-5' }"
  >
    <AisSearchBox
      :placeholder="placeholder || 'Zoeken...'"
      submit-title="Zoek"
      autofocus
      class="pb-5"
    >
      <template #default="{ currentRefinement, isSearchStalled, refine }">
        <input
          type="search"
          :value="currentRefinement"
          class="input input-bordered w-full"
          @input="refine($event.currentTarget.value)"
        />
        <span :hidden="!isSearchStalled">Loading...</span>
      </template>
    </AisSearchBox>

    <AisHits>
      <template #default="{ items, sendEvent }">
        <slot :items="items" :send-event="sendEvent" />
      </template>
    </AisHits>

    <AisPagination>
      <template
        #default="{
          currentRefinement,
          nbPages,
          isFirstPage,
          isLastPage,
          refine,
        }"
      >
        <div class="btn-group w-full justify-center py-5">
          <button :disabled="isFirstPage" class="btn" @click="refine(0)">
            ‹‹
          </button>
          <button
            :disabled="isFirstPage"
            class="btn"
            @click="refine(currentRefinement - 1)"
          >
            ‹
          </button>
          <button class="btn btn-active">
            {{ currentRefinement + 1 }}
          </button>
          <button
            :disabled="isLastPage"
            class="btn"
            @click="refine(currentRefinement + 1)"
          >
            ›
          </button>
          <button :disabled="isLastPage" class="btn" @click="refine(nbPages)">
            ››
          </button>
        </div>
      </template>
    </AisPagination>

    <AisHitsPerPage :items="resultsPerPageSettings">
      <template #default="{ items, refine }">
        <select
          class="select select-bordered m-5"
          @change="refine($event.target.value)"
        >
          <option
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :selected="item.isRefined"
          >
            {{ item.label }}
          </option>
        </select>
      </template>
    </AisHitsPerPage>
  </AisInstantSearch>
</template>

<script setup lang="ts">
import {
  AisSearchBox,
  AisInstantSearch,
  AisHits,
  AisPagination,
  AisHitsPerPage,
} from "vue-instantsearch/vue3/es";
import { useMeilisearchClient } from "#imports";

const client = useMeilisearchClient();

defineProps<{
  indexName: string;
  placeholder?: string;
}>();

const resultsPerPageSettings = [
  { value: 10, label: "10", default: true },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];
</script>
