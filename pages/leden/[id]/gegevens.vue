<template>
  <div class="overflow-x-auto shadow p-5">
    <form @submit.prevent="send">
      <InputText
        v-model="initials"
        type="text"
        title="Initialen"
        placeholder="A.B.C."
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="firstName"
        type="text"
        title="Voornaam"
        placeholder="Jan"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="insertion"
        type="text"
        title="Tussenvoegsel"
        placeholder="van"
        :disabled="requesting"
        bordered
      />
      <InputText
        v-model="lastName"
        type="text"
        title="Achternaam"
        placeholder="Jansen"
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
        <option value="MALE">Man</option>
        <option value="FEMALE">Vrouw</option>
      </InputSelect>
      <InputText
        v-model="street"
        type="text"
        title="Straat"
        placeholder="Rotterdamseweg"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="number"
        type="text"
        title="Huisnummer"
        placeholder="362a"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="zipcode"
        type="text"
        title="Postcode"
        placeholder="2628AT"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="city"
        type="text"
        title="Plaats"
        placeholder="Delft"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="country"
        type="text"
        title="Land"
        placeholder="Nederland"
        :disabled="requesting"
        required
        bordered
        class="mb-4"
      />
      <Button
        type="submit"
        title="Gegevens Opslaan"
        color="primary"
        :loading="requesting"
      >
        Opslaan
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Member } from "~/server/types";

const props = defineProps<{
  member: Member;
}>();

const initials = ref<string>(props.member.initials);
const firstName = ref<string>(props.member.firstName);
const insertion = ref<string>(props.member.insertion);
const lastName = ref<string>(props.member.lastName);
const dateOfBirth = ref<string>(
  // According to prisma dateOfBirth is a Date, but in reality it is an ISO string
  (props.member.dateOfBirth as unknown as string).slice(0, 10),
);
const sex = ref<"MALE" | "FEMALE" | "">(props.member.sex);
const street = ref<string>(props.member.street);
const number = ref<string>(props.member.number);
const city = ref<string>(props.member.city);
const zipcode = ref<string>(props.member.zipcode);
const country = ref<string>(props.member.country);

const { requesting, send, data } = useRequest<
  Awaited<
    ReturnType<typeof import("~~/server/api/members/[id]/index.patch").default>
  >
>(`/api/members/${useRoute().params.id}`, apiErrorHandler([]), {
  method: "patch",
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
    await navigateTo(`/members/${data.value?.id}`);
  },
});
</script>
