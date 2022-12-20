<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
  <div class="overflow-x-auto shadow p-5">
    <form @submit.prevent="send">
      <Alert type="error" :content="error?.global" />
      <InputText
        v-model="name"
        type="text"
        title="Naam"
        placeholder="Boeing AH-64 Apache"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="description"
        type="text"
        title="Beschrijving"
        placeholder="An American twin-turboshaft attack helicopter with a tailwheel-type landing gear"
        :error="error?.description"
        :disabled="requesting"
        bordered
      />
      <InputText
        v-model="startDate"
        type="date"
        title="Sinds"
        :disabled="requesting"
        bordered
      />
      <InputText
        v-model="stopDate"
        type="date"
        title="Tot"
        :disabled="requesting"
        bordered
      />
      <InputSelect
        v-model="parentId"
        title="Onderdeel van"
        :disabled="requesting"
        bordered
        class="mb-4"
      >
        <option selected value="">-- Losstaande groep --</option>
        <option
          v-for="parentGroup in parents"
          :key="parentGroup.id"
          :value="parentGroup.id"
        >
          {{ parentGroup.name }}
        </option>
      </InputSelect>
      <Button
        type="submit"
        title="Maak groep aan"
        color="primary"
        :loading="requesting"
      >
        Maak Aan
      </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Groups } from "~/server/types";

const { breadCrumbs } = useBreadcrumbs();

const name = ref<string>("");
const description = ref<string>("");
const parentId = ref<string>("");
const startDate = ref<string>("");
const stopDate = ref<string>("");

const { error, requesting, send, data } = useRequest<
  Awaited<ReturnType<typeof import("~~/server/api/groups/index.post").default>>
>("/api/groups", apiErrorHandler([]), {
  method: "post",
  body: {
    name,
    description,
    parentId,
    startDate: ref(startDate.value || undefined),
    stopDate: ref(stopDate.value || undefined),
  },
  async onSuccess() {
    await navigateTo(`/groepen/${data.value?.id}`);
  },
});

const { data: parents } = await useFetch<Groups>("/api/groups");
</script>
