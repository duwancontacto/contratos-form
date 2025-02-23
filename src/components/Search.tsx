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
  externalReset: () => void;
}
//eslint-disable-next-line
export function Search({
  setValue,
  openDialog,
  setOpenDialog,
  data,
  setData,
  externalReset,
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
        toast("Prosiga a ingresar sus datos.", {
          icon: "👨‍⚕️",
        });
        externalReset();
        setData({});
        setValue("email", email);
        document.getElementById("first_name")?.focus();
      } else {
        const contact = result.data.contacts[0] || null;

        setData(contact);

        const {
          nombre = "",
          apellidoPaterno = "",
          apellidoMaterno = "",
          idExterno,
          sexo,
          tipo,
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
          phoneId:
            (contact?.listaTelefonos &&
              contact?.listaTelefonos[0]?.telefono?.IDExterno) ||
            "",
          direccion:
            (contact?.listaDireccion &&
              contact?.listaDireccion[0]?.direccion) ||
            {},
        };
        externalReset();
        setValue("first_name", user.first_name);
        setValue("last_name1", user.last_name1);
        setValue("email", user.email);
        setValue("last_name2", user.last_name2);
        setValue("phone", user.phone);
        setValue("gender", sexo === "Masculino" ? "M" : "F");
        setValue("type", tipo);
        setValue("id_phone", user.phoneId);
        setValue("idCX", idExterno);
        setValue("street", user.direccion.calle);
        if (user.direccion.estado === "ESTADO DE MEXICO") {
          setValue("state", "MEXICO");
        } else {
          setValue("state", user.direccion.estado);
        }
        setValue("ext_num", user.direccion.numeroExterior);
        setValue("int_num", user.direccion.numeroInterior);
        setValue("colony", user.direccion.colonia);
        setValue("cp", user.direccion.codigoPostal);
        setValue("municipe", user.direccion.delgacionMunicipio);
        setValue("city", user.direccion.ciudad);
        setValue("street_distance", user.direccion.referncias);
        setValue("addressOption", user.direccion.id_externo);
        toast.success("Paciente encontrado!");
        reset();
      }

      setShowLoading(false);
    } catch (error) {
      toast("Prosiga a ingresar sus datos.", {
        icon: "👨‍⚕️",
      });
      document.getElementById("first_name")?.focus();
      externalReset();
      setData({});
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
              <CardTitle>
                Si ya estás afiliado con nosotros ingresa tu correo y presiona
                buscar
              </CardTitle>
            </CardHeader>
            <CardContent className="grid  gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Correo electrónico *
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
