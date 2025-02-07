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
  plan_id: string;
};

export const schema = yup.object().shape({
  plan_id: yup.string().required("Plan requerido"),
  addressOption: yup.string().optional(),
  first_name: yup.string().required("Nombre requerido"),
  card_new: yup
    .string()
    .required("Nueva tarjeta requerida")
    .length(13, "Debe tener 13 dígitos"),
  last_name1: yup.string().required("Apellido paterno requerido"),
  last_name2: yup.string().required("Apellido materno requerido"),
  curp: yup
    .string()
    .required("CURP requerido")
    .length(18, "Debe tener 18 dígitos"),
  specialty: yup.string().required("Especialidad Médica requerida"),
  gender: yup.string().required("Genero requerido"),
  idCX: yup.string().optional(),

  email: yup
    .string()
    .email("Correo electrónico no válido")
    .required("Correo electrónico requerido"),
  phone: yup
    .string()
    .typeError("Debe ser un número")
    .required("Télefono requerido")
    .length(10, "Debe tener 10 dígitos"),

  street: yup.string().required("Calle requerida"),
  ext_num: yup.string().required("Número Ext requerido"),
  int_num: yup.string().optional(),
  colony: yup.string().required("Colonia requerida"),
  person: yup.string().optional(),
  id_phone: yup.string().optional(),
  cp: yup.string().required("C.P requerido").length(5, "Debe tener 5 dígitos"),
  municipe: yup.string().required("Alcaldia / Municipio requerido"),
  state: yup.string().required("Estado requerido"),
  city: yup.string().required("Ciudad requerida"),
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

  institution: yup.string().required("Institución Financiera requerida"),
  card_type: yup.string().required("Tipo de tarjeta requerido"),
  full_name: yup.string().required("Nombre completo requerido"),
  max_amount: yup.string().optional(),
  product_id: yup.string().required("Producto requerido"),
  digits: yup
    .string()
    .required("Últimos 4 dígitos de la tarjeta requeridos")
    .length(4, "Debe ser de 4 dígitos"),
  card_physical_or_digital: yup
    .string()
    .required("Tarjeta física o digital requerida"),
});

export const schemaSearch = yup.object().shape({
  email: yup.string().required("Correo electrónico requerido"),
});
export const schemaAddress = yup.object().shape({
  option: yup.string().required("Direccion requerida"),
});
