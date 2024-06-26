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
//eslint-disable-next-line
export function Search({ setValue }: { setValue: any }) {
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
        toast.error("Paciente no encontrado!");
      } else {
        const contact = result.data.contacts[0] || null;

        const {
          nombre = "",
          apellidoPaterno = "",
          apellidoMaterno = "",
          idExterno,
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
        setValue("email", user.email);
        setValue("phone", user.phone);
        setValue("idCX", idExterno);
        setValue("street", user.direccion.calle);
        setValue("ext_num", user.direccion.numeroExterior);
        setValue("int_num", user.direccion.numeroInterior);
        setValue("colony", user.direccion.colonia);
        setValue("cp", user.direccion.codigoPostal);
        setValue("municipe", user.direccion.delgacionMunicipio);
        setValue(
          "city",
          user.direccion.estado && user.direccion.ciudad
            ? `${user.direccion.estado} / ${user.direccion.ciudad}`
            : ""
        );
        setValue("street_distance", user.direccion.referncias);
        toast.success("Paciente encontrado!");
        reset();
      }

      setShowLoading(false);
    } catch (error) {
      toast.error("Paciente no encontrado!");
      setShowLoading(false);
    }
  };

  return (
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
            <Button disabled={showLoading} className="w-full" type="submit">
              Buscar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
