<template>
  <form @submit.prevent="execute">
    <Card title="Materiaaltype Toevoegen" class="my-4">
      <Alert type="error" :content="error?.global" />
      <InputText
        v-model="name"
        title="Naam Materiaaltype"
        placeholder="Helicopter"
        :error="error?.name"
        :disabled="pending"
        required
        bordered
      />
      <InputSelect
        v-model="parent"
        title="Supertype"
        :disabled="pending"
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
          :loading="pending"
        >
          Maak Aan
        </Button>
      </template>
    </Card>
  </form>
</template>

<script lang="ts" setup>
import { MaterialType } from "@prisma/client";

import { ErrorCode } from "~~/utils/error";

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

const errorHandler = apiErrorHandler<CreateErrors>([
  errHandler(ErrorCode.ValidationFailed, (e) => {
    // Only handles invalid names.
    if (e.context.key !== "name") {
      return false;
    }

    if (e.context.refinement === "size") {
      return {
        name: "De lengte van de naam is ongeldig.",
      };
    }

    return {
      name: `Ongeldige naam (${e.context.refinement || e.context.expected})`,
    };
  }),
  errHandler(ErrorCode.Exists, (e) => {
    // Handles the case where a type with the same name already exists.
    if (e.context.field !== "name") {
      return false;
    }

    return { name: "Een type met deze naam bestaat al." };
  }),
  (e) => {
    // Catch all, show generic error.
    return { global: `Onverwachte fout (${e.code}).` };
  },
]);

const { error, pending, execute } = await useApiRequest(
  "/api/material/type",
  errorHandler,
  {
    method: "post",
    body: {
      name,
      parentId: parent,
    },
    onSuccess: () => emit("refreshTypes"),
  },
);

interface CreateErrors {
  name?: string;
  global?: string;
}
</script>
