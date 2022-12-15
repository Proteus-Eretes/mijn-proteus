<template>
  <h1 class="text-4xl text-primary font-bold mb-4">Nieuwe Groep Maken</h1>
  <div class="overflow-x-auto shadow p-5">
    <form @submit.prevent="send">
      <Alert type="error" :content="error?.global" />
      <InputText
        v-model="name"
        title="Naam"
        placeholder="Boeing AH-64 Apache"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="description"
        title="Beschrijving"
        placeholder="An American twin-turboshaft attack helicopter with a tailwheel-type landing gear"
        :error="error?.description"
        :disabled="requesting"
        bordered
      />
      <InputDate
        v-model="startDate"
        title="Sinds"
        :disabled="requesting"
        bordered
      />
      <InputDate
        v-model="stopDate"
        title="Tot"
        :disabled="requesting"
        bordered
      />
      <InputSelect
        v-model="parentId"
        title="Onderdeel van"
        :disabled="requesting"
        bordered
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
    await navigateTo(`/groep/${data.value?.id}/overzicht`);
  },
});

const { data: parents } = await useFetch<
  Awaited<ReturnType<typeof import("~~/server/api/groups/index.get").default>>
>("/api/groups");
</script>
