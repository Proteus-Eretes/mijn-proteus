<template>
  <form @submit.prevent="createType">
    <Card title="Materiaaltype Toevoegen" class="my-4">
      <Alert type="error" :content="globalError" />
      <InputText
        v-model="name"
        title="Naam Materiaaltype"
        placeholder="Helicopter"
        :error="nameError"
        :disabled="loading"
        required
        bordered
      />
      <InputSelect
        v-model="parent"
        title="Supertype"
        :disabled="loading"
        bordered
      >
        <option selected value="">-- Geen supertype --</option>
        <option
          v-for="parentType in parents"
          :key="parentType.id"
          :value="parentType.id"
        >
          {{ parentType.name }}
        </option>
      </InputSelect>
      <template #actions>
        <Button
          type="submit"
          title="Maak materiaal aan"
          color="primary"
          :loading="loading"
        >
          Maak Aan
        </Button>
      </template>
    </Card>
  </form>
</template>

<script lang="ts" setup>
import { MaterialType } from "@prisma/client";
import { ErrorCode } from "~~/server/error";

interface Props {
  parents: MaterialType[];
}
defineProps<Props>();

interface Emits {
  (eventName: "refreshTypes", value: void): void;
}
const emit = defineEmits<Emits>();

const name = ref<string>("");
const parent = ref<string>("");
const loading = ref<boolean>(false);

const nameError = ref<string | undefined>(undefined);
const globalError = ref<string | undefined>(undefined);

const createType = async () => {
  loading.value = true;
  const { error } = await sendApiReq("/api/material/type", "post", {
    name: name.value,
    parentId: parent.value || undefined,
  });
  loading.value = false;

  nameError.value = undefined;
  globalError.value = undefined;

  if (error) {
    return errorHandler(error);
  }

  name.value = "";
  parent.value = "";
  emit("refreshTypes");
};

const errorHandler = apiErrorHandler([
  errHandler(ErrorCode.ValidationFailed, (e) => {
    // Only handles invalid names.
    if (e.context.key !== "name") {
      return false;
    }

    if (e.context.refinement === "size") {
      nameError.value = "De lengte van de naam is ongeldig.";
      return;
    }

    nameError.value = `Ongeldige naam (${
      e.context.refinement || e.context.expected
    })`;
  }),
  errHandler(ErrorCode.Exists, (e) => {
    // Handles the case where a type with the same name already exists.
    if (e.context.field !== "name") {
      return false;
    }

    nameError.value = "Een type met deze naam bestaat al.";
  }),
  (e) => {
    // Catch all, show generic error.
    globalError.value = `Onverwachte fout (${e.code}).`;
  },
]);
</script>
