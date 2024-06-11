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
    setShowLoading(true);
    const result = await autoPopulateProfile(email);

    if (!result.data.results) {
      toast.error("Medico no encontrado!");
    } else {
      const contact = result.data.contacts[0] || null;

      const {
        nombre = "",
        apellidoPaterno = "",
        apellidoMaterno = "",
      } = contact.datosGenerales || {};

      const user = {
        name: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        email: contact.listaCorreoElectronico[0].correroElectronico,
      };
      setValue("name", user.name);
      setValue("email", user.email);
      reset();
    }

    setShowLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <Card className="w-full max-w-md sm:max-w-4xl">
          <CardHeader>
            <CardTitle>Buscar usuario</CardTitle>
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
