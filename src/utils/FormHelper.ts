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
  first_name: yup.string().required("Nombre es requerido"),
  card_new: yup.string().required("Nueva tarjeta es requerido"),
  last_name1: yup.string().required("Apellido paterno es requerido"),
  last_name2: yup.string().required("Apellido materno es requerido"),
  curp: yup.string().required("CURP es requerido"),
  specialty: yup.string().required("Especialidad Médica es requerida"),
  gender: yup.string().required("Genero es requerido"),
  idCX: yup.string().optional(),

  email: yup
    .string()
    .email("Correo electrónico no es válido")
    .required("Correo electrónico es requerido"),
  phone: yup
    .string()
    .typeError("Debe ser un número")
    .required("Télefono es requerido")
    .length(10, "Debe ser de 10 dígitos"),

  street: yup.string().required("Calle es requerido"),
  ext_num: yup.string().required("Número Ext es requerido"),
  int_num: yup.string().optional(),
  colony: yup.string().required("Colonia es requerido"),
  person: yup.string().optional(),

  cp: yup
    .string()
    .required("C.P es requerido")
    .length(5, "Debe ser de 5 dígitos"),
  municipe: yup.string().required("Alcaldia / Municipio es requerido"),
  state: yup.string().required("Estado es requerido"),
  city: yup.string().required("Ciudad es requerido"),
  street_distance: yup.string().optional(),
  street_distance1: yup.string().optional(),
  delivery: yup.boolean().optional(),

  person_delivery: yup.string().optional(),
  street_delivery: yup.string().optional(),
  ext_num_delivery: yup.string().optional(),
  int_num_delivery: yup.string().optional(),
  colony_delivery: yup.string().optional(),
  cp_delivery: yup.string().optional(),
  municipe_delivery: yup.string().optional(),
  city_delivery: yup.string().optional(),
  state_delivery: yup.string().optional(),
  street_distance_delivery: yup.string().optional(),
  street_distance1_delivery: yup.string().optional(),

  institution: yup.string().required("Institución Financiera es requerido"),
  card_type: yup.string().required("Tipo de tarjeta es requerido"),
  full_name: yup.string().required("Nombre completo es requerido"),
  max_amount: yup.string().required("Monto máximo es requerido"),
  product_id: yup.string().required("Producto es requerido"),
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
