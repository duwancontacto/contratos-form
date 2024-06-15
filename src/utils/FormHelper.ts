import * as yup from "yup";

export type FormData = {
  name: string;
  curp: string;
  email: string;
  phone: number;
  address: string;
  street: string;
  ext_num: string;
  int_num: string;
  colony: string;
  cp: string;
  municipe: string;
  city: string;
  street_distance: string;
  person: string;
  institution: string;
  card_type: string;
  digits: string;
  card_physical_or_digital: string;
};

export const schema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  curp: yup.string().required("CURP es requerido"),
  email: yup
    .string()
    .email("Correo electrónico no es válido")
    .required("Correo electrónico es requerido"),
  phone: yup
    .number()
    .typeError("Debe ser un número")
    .required("Télefono es requerido"),

  street: yup.string().required("Calle es requerido"),
  ext_num: yup.string().required("Número Ext es requerido"),
  int_num: yup.string().required("Número Int es requerido"),
  colony: yup.string().required("Colonia es requerido"),
  cp: yup.string().required("C.P es requerido"),
  municipe: yup.string().required("Alcaldia / Municipio es requerido"),
  city: yup.string().required("Estado / Ciudad es requerido"),
  street_distance: yup.string().required("Entre que calles es requerido"),

  person_delivery: yup.string().optional(),
  delivery: yup.boolean().optional(),

  street_delivery: yup.string().optional(),
  ext_num_delivery: yup.string().optional(),
  int_num_delivery: yup.string().optional(),
  colony_delivery: yup.string().optional(),
  cp_delivery: yup.string().optional(),
  municipe_delivery: yup.string().optional(),
  city_delivery: yup.string().optional(),
  street_distance_delivery: yup.string().optional(),
  institution: yup.string().required("Institución Financiera es requerido"),
  card_type: yup.string().required("Tipo de tarjeta es requerido"),
  full_name: yup.string().required("Nombre completo es requerido"),
  max_amount: yup.string().required("Monto máximo es requerido"),
  product: yup.string().required("Producto es requerido"),
  product_duration: yup.string().required("Duración del producto es requerido"),
  digits: yup
    .string()
    .required("Últimos 5 dígitos de la tarjeta es requerido")
    .length(5, "Debe ser de 5 dígitos"),
  card_physical_or_digital: yup
    .string()
    .required("Tarjeta física o digital es requerido"),
});

export const schemaSearch = yup.object().shape({
  email: yup
    .string()
    .email("Correo electrónico no es válido")
    .required("Correo electrónico es requerido"),
});
