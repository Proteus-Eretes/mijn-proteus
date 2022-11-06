import { materialType } from "../../logic";

type types = { [superName: string]: types };

const MATERIAL_TYPES: types = {
  Boot: {
    "1x": {},
    "2-": {},
    "2x": {},
    "C4+": {},
    "4+": {},
    "4*": {},
    "8+": {},
    "4-": {},
    "C4*": {},
    "C2+": {},
    "C1x": {},
  },
  Ergometer: {
    "Wedstro": {},
    "Rowperfects wedstro": {},
    "RowPerfect": {},
    "Ouderejaars compo": {},
    "Compo": {},
  },
};

const createType = async (types: types, superId?: string) => {
  for (const name in types) {
    const type = await materialType.create(name, superId);
    console.info(`Created material type: ${type.name}.`);

    await createType(types[name], type.id);
  }
};

export default async () => {
  await createType(MATERIAL_TYPES);
};
