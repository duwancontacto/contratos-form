export interface PatientFormData {
  product_id: string;
  currentPhones: any[];
  idCX: string;
  plan_id: string;
  delivery: boolean;
  email: string;
  first_name: string;
  last_name1: string;
  last_name2: string;
  type: string;
  gender: string;
  phone: string;
  id_phone: string;
  street: string;
  state: string;
  ext_num: string;
  int_num: string;
  colony: string;
  cp: string;
  municipe: string;
  city: string;
  street_distance: string;
  addressOption: string;
  lat: string;
  lng: string;
  [key: string]: any;
}

export interface AddressData {
  listaDireccion: {
    direccion: {
      estado: string;
      ciudad: string;
      numeroExterior: string;
      numeroInterior: string;
      colonia: string;
      codigoPostal: string;
      delgacionMunicipio: string;
      referncias: string;
      calle: string;
      id_externo: string;
      latitud: string;
      longitud: string;
    };
  }[];
}
