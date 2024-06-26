import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ErrorLabel from "./ErrorLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSearch } from "../utils/FormHelper";
import { Button } from "./ui/button";
import { useState } from "react";
import { autoPopulateProfile } from "../services/search";
import toast from "react-hot-toast";
import AddressModal from "./AddressModal";

interface SearchProps {
  //eslint-disable-next-line
  setValue: any;
  openDialog: boolean;
  //eslint-disable-next-line
  setOpenDialog: any;
  //eslint-disable-next-line
  data: any;
  //eslint-disable-next-line
  setData: any;
  addressOption: string;
}
//eslint-disable-next-line
export function Search({
  setValue,
  openDialog,
  setOpenDialog,
  data,
  setData,
  addressOption,
}: SearchProps) {
  const [showLoading, setShowLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSearch),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      setShowLoading(true);
      const result = await autoPopulateProfile(email);

      if (!result.data.results) {
        toast.error("Prosiga a ingresar sus datos.");
      } else {
        const contact = result.data.contacts[0] || null;

        setData(contact);

        const {
          nombre = "",
          apellidoPaterno = "",
          apellidoMaterno = "",
          idExterno,
          sexo,
        } = contact.datosGenerales || {};

        const user = {
          first_name: nombre,
          last_name1: apellidoPaterno,
          last_name2: apellidoMaterno,
          email:
            (contact?.listaCorreoElectronico &&
              contact?.listaCorreoElectronico[0]?.correroElectronico) ||
            "",
          phone:
            (contact?.listaTelefonos &&
              contact?.listaTelefonos[0]?.telefono?.NumeroTelefonico) ||
            "",
          direccion:
            (contact?.listaDireccion &&
              contact?.listaDireccion[0]?.direccion) ||
            {},
        };
        setValue("first_name", user.first_name);
        setValue("last_name1", user.last_name1);
        setValue("last_name2", user.last_name2);
        setValue("gender", sexo === "Masculino" ? "M" : "F");

        setValue("email", user.email);
        setValue("phone", user.phone);
        setValue("idCX", idExterno);
        setValue("street", user.direccion.calle);
        setValue("state", user.direccion.estado);
        setValue("ext_num", user.direccion.numeroExterior);
        setValue("int_num", user.direccion.numeroInterior);
        setValue("colony", user.direccion.colonia);
        setValue("cp", user.direccion.codigoPostal);
        setValue("municipe", user.direccion.delgacionMunicipio);
        setValue("city", user.direccion.ciudad);
        setValue("street_distance", user.direccion.referncias);
        toast.success("Paciente encontrado!");
        reset();
      }

      setShowLoading(false);
    } catch (error) {
      toast.error("Prosiga a ingresar sus datos.");
      setShowLoading(false);
    }
  };

  return (
    <>
      <AddressModal
        addressOption={addressOption}
        data={data}
        setExternalValue={setValue}
        open={openDialog}
        setOpen={setOpenDialog}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <Card className="w-full max-w-md sm:max-w-4xl">
            <CardHeader>
              <CardTitle>Buscar paciente</CardTitle>
            </CardHeader>
            <CardContent className="grid  gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Correo electrónico
                  <ErrorLabel name="email" errors={errors} />
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Ejemplo: Juan@dominio.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={showLoading}
                className="w-full bg-fanafesa"
                type="submit"
              >
                Buscar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}
