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
  id_phone: yup.string().optional(),


  street: yup.string().required("Calle requerida"),
  ext_num: yup.string().required("Número Ext requerido"),
  int_num: yup.string().optional(),
  colony: yup.string().required("Colonia requerida"),
  person: yup.string().optional(),
  cp: yup.string().required("C.P requerido").length(5, "Debe tener 5 dígitos"),
  municipe: yup.string().required("Alcaldia / Municipio requerido"),
  state: yup.string().required("Estado requerido"),
  city: yup.string().required("Ciudad requerida"),
  street_distance: yup.string().optional(),
  street_distance1: yup.string().optional(),
  lat: yup.number().required("Latitud y Longitud requeridas"),
  lng: yup.number().required("Latitud y Longitud requeridas"),

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
  lat_delivery: yup.number().required("Latitud y Longitud requeridas"),
  lng_delivery: yup.number().required("Latitud y Longitud requeridas"),

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
  tarjeta: yup.string().required("Número de tarjeta requerido").length(13, "Debe tener 13 dígitos"),
});
export const schemaAddress = yup.object().shape({
  option: yup.string().required("Direccion requerida"),
});

 export const searchStepSchema = yup.object().shape({
  idCX: yup.string(),
  id_card: yup.string(),
  addressOption: yup.string(),
});

export const userDataStepSchema = yup.object().shape({
  first_name: yup.string().required("El nombre es requerido"),
  last_name1: yup.string().required("El apellido paterno es requerido"),
  last_name2: yup.string().required("El apellido materno es requerido"),
  curp: yup.string().required("El CURP es requerido").length(18, "Debe tener 18 dígitos"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
  phone: yup.string().required("El teléfono es requerido").length(10, "Debe tener 10 dígitos"),
  gender: yup.string().required("El género es requerido"),
  card_new: yup.string().required("La tarjeta es requerido").length(13, "Debe tener 13 dígitos"),
});

export const addressStepSchema = yup.object().shape({
  street: yup.string().required("Calle requerida"),
  ext_num: yup.string().required("Número Ext requerido"),
  int_num: yup.string().optional(),
  colony: yup.string().required("Colonia requerida"),
  person: yup.string().optional(),
  cp: yup.string().required("C.P requerido").length(5, "Debe tener 5 dígitos"),
  municipe: yup.string().required("Alcaldia / Municipio requerido"),
  state: yup.string().required("Estado requerido"),
  city: yup.string().required("Ciudad requerida"),
  street_distance: yup.string().optional(),
  street_distance1: yup.string().optional(),
  lat: yup.number().required("Latitud y Longitud requeridas"),
  lng: yup.number().required("Latitud y Longitud requeridas"),

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
  lat_delivery: yup.number().optional(),
  lng_delivery: yup.number().optional(),
});

export const medicalProductStepSchema = yup.object().shape({
  specialty: yup.string().required("La especialidad es requerida"),
  product_id: yup.string().required("El producto es requerido"),
  plan_id: yup.string().required("El plan es requerido"),
});

export const bankingStepSchema = yup.object().shape({
  institution: yup.string().required("La institución es requerida"),
  card_type: yup.string().required("El tipo de tarjeta es requerido"),
  card_physical_or_digital: yup
    .string()
    .required("El tipo de tarjeta física/digital es requerido"),
  full_name: yup.string().required("El nombre completo es requerido"),
  digits: yup.string().required("Los últimos 4 dígitos son requeridos").length(4, "Debe ser de 4 dígitos"),
});
