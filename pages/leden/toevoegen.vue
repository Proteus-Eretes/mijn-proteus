<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    Leden
    <Icon name="ic:chevron-right" />
    Toevoegen
  </h1>
  <div class="overflow-x-auto shadow p-5">
    <form @submit.prevent="send">
      <Alert type="error" :content="error?.global" />
      <InputText
        v-model="initials"
        type="text"
        title="Initialen"
        placeholder="A.B.C."
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="firstName"
        type="text"
        title="Voornaam"
        placeholder="Jan"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="insertion"
        type="text"
        title="Tussenvoegsel"
        placeholder="van"
        :error="error?.name"
        :disabled="requesting"
        bordered
      />
      <InputText
        v-model="lastName"
        type="text"
        title="Achternaam"
        placeholder="Jansen"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="dateOfBirth"
        type="date"
        title="Geboortedatum"
        :disabled="requesting"
        bordered
      />
      <InputSelect
        v-model="sex"
        title="Geslacht"
        :disabled="requesting"
        bordered
      >
        <option selected disabled value="">-- Selecteer --</option>
        <option value="MALE">Man</option>
        <option value="FEMALE">Vrouw</option>
      </InputSelect>
      <InputText
        v-model="street"
        type="text"
        title="Straat"
        placeholder="Rotterdamseweg"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="number"
        type="text"
        title="Huisnummer"
        placeholder="362a"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="zipcode"
        type="text"
        title="Postcode"
        placeholder="2628AT"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="city"
        type="text"
        title="Plaats"
        placeholder="Delft"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="country"
        type="text"
        title="Land"
        placeholder="Nederland"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
        class="mb-4"
      />
      <Button
        type="submit"
        title="Voeg persoon toe"
        color="primary"
        :loading="requesting"
      >
        Toevoegen
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
const initials = ref<string>("");
const firstName = ref<string>("");
const insertion = ref<string>("");
const lastName = ref<string>("");
const dateOfBirth = ref<string>("");
const sex = ref<"MALE" | "FEMALE" | "">("");
const street = ref<string>("");
const number = ref<string>("");
const city = ref<string>("");
const zipcode = ref<string>("");
const country = ref<string>("");

const { error, requesting, send, data } = useRequest<
  Awaited<ReturnType<typeof import("~~/server/api/members/index.post").default>>
>("/api/members", apiErrorHandler([]), {
  method: "post",
  body: {
    initials,
    firstName,
    insertion,
    lastName,
    dateOfBirth,
    sex,
    street,
    number,
    city,
    zipcode,
    country,
  },
  async onSuccess() {
    await navigateTo(`/members/${data.value?.id}/profiel`);
  },
});
</script>
