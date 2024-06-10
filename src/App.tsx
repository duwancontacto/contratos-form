import { useForm } from "react-hook-form";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "../src/components/ui/card";
import { Label } from "../src/components/ui/label";
import { Input } from "../src/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../src/components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../src/components/ui/button";
import { Success } from "./components/Success";
import { Error } from "./components/Error";

import { FormData, schema } from "./utils/FormHelper";
import { useState } from "react";
import { Loading } from "./components/Loading";
//eslint-disable-next-line
const ErrorLabel = ({ errors, name }: { errors: any; name: string }) => {
  if (!errors[name]) return null;

  const error = errors[name];
  return (
    <>
      {errors[name] && (
        <span className="text-red-500 text-sm ps-1">{error?.message}</span>
      )}
    </>
  );
};

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFalse, setShowFalse] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setShowLoading(true);
    setTimeout(() => {
      console.log(data);
      setShowSuccess(true);
      setShowFalse(true);
      setShowLoading(false);
    }, 4000);
  };

  const handleReset = () => {
    setShowSuccess(false);
    setShowFalse(false);
    reset();
  };

  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <a className="flex items-center gap-2" href="#">
          <span className="text-lg font-bold">Farmacias especializadas</span>
        </a>
      </header>

      {showSuccess && <Success handleReset={handleReset} />}
      {showFalse && <Error handleReset={handleReset} />}

      {showLoading && <Loading />}

      {!showLoading && !showFalse && !showSuccess && (
        <div className="py-12 md:py-12 lg:py-22">
          <div className="container">
            <div className="grid gap-6 md:gap-8 lg:gap-12">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Registro de Usuarios
                </h1>
                <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 pt-3">
                  Completa este formulario para registrar tu contrato.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <Card className="w-full max-w-md sm:max-w-4xl">
                    <CardHeader>
                      <CardTitle>Datos del usuario</CardTitle>
                    </CardHeader>
                    <CardContent className="grid lg:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">
                          Nombre
                          <ErrorLabel name="name" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Ejemplo: Juan Pérez"
                          {...register("name")}
                          className={errors.name ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="curp">
                          CURP
                          <ErrorLabel name="curp" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="curp"
                          placeholder="Ejemplo: PEGJ850315HJCRRN07"
                          {...register("curp")}
                          className={errors.curp ? "border-red-500" : ""}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">
                          Email
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
                      <div className="grid gap-2">
                        <Label htmlFor="phone">
                          Télefono
                          <ErrorLabel name="phone" errors={errors} />
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Ingresa tu número de teléfono"
                          type="number"
                          {...register("phone")}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="address">
                          Domicilio
                          <ErrorLabel name="address" errors={errors} />
                        </Label>
                        <Input
                          id="address"
                          placeholder="Ejemplo: Calle 123, Colonia Centro, Ciudad de México"
                          type="text"
                          {...register("address")}
                          className={errors.address ? "border-red-500" : ""}
                        />
                      </div>
                    </CardContent>
                    {/*                   <CardFooter>
                    <Button className="w-full" type="submit">
                      Enviar Registro
                    </Button>
                  </CardFooter> */}
                  </Card>
                </div>
                <div className="flex justify-center mt-5">
                  <Card className="w-full max-w-md sm:max-w-4xl">
                    <CardHeader>
                      <CardTitle>Domicilio de entrega</CardTitle>
                    </CardHeader>
                    <CardContent className="grid lg:grid-cols-2  gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="street">
                          Calle <ErrorLabel name="street" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="street"
                          placeholder="Ejemplo: Calle 123"
                          {...register("street")}
                          className={errors.street ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="ext_num">
                          Número Ext{" "}
                          <ErrorLabel name="ext_num" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="ext_num"
                          placeholder="Ejemplo: 123"
                          {...register("ext_num")}
                          className={errors.ext_num ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="int_num">
                          Número Int{" "}
                          <ErrorLabel name="int_num" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="int_num"
                          placeholder="Ejemplo: 123"
                          {...register("int_num")}
                          className={errors.int_num ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="colony">
                          Colonia <ErrorLabel name="colony" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="colony"
                          placeholder="Ejemplo: Colonia Centro"
                          {...register("colony")}
                          className={errors.colony ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cp">
                          C.P <ErrorLabel name="cp" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="cp"
                          placeholder="Ejemplo: 12345"
                          {...register("cp")}
                          className={errors.cp ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="municipe">
                          Alcaldía / Municipio{" "}
                          <ErrorLabel name="municipe" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="municipe"
                          placeholder="Ejemplo: Cuauhtémoc"
                          {...register("municipe")}
                          className={errors.municipe ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="city">
                          Estado / Ciudad{" "}
                          <ErrorLabel name="city" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="city"
                          placeholder="Ejemplo: Ciudad de México"
                          {...register("city")}
                          className={errors.city ? "border-red-500" : ""}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="street_distance">
                          Entre qué calles{" "}
                          <ErrorLabel name="street_distance" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="street_distance"
                          placeholder="Ejemplo: Calle 123 y Calle 124"
                          {...register("street_distance")}
                          className={
                            errors.street_distance ? "border-red-500" : ""
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="person">
                          Persona adicional autorizada para recibir medicamento
                          <ErrorLabel name="person" errors={errors} />
                        </Label>
                        <Input
                          type="text"
                          id="person"
                          placeholder="Ejemplo: Juan Pérez"
                          {...register("person")}
                          className={errors.person ? "border-red-500" : ""}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex justify-center mt-5">
                  <Card className="w-full max-w-md sm:max-w-4xl">
                    <CardHeader>
                      <CardTitle>Datos bancarios</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid  lg:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="institution">
                            Institución Financiera
                            <ErrorLabel name="institution" errors={errors} />
                          </Label>
                          <Input
                            id="institution"
                            placeholder="Ejemplo: BBVA Bancomer"
                            {...register("institution")}
                            className={
                              errors.institution ? "border-red-500" : ""
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="card_type">
                            Tipo de tarjeta
                            <ErrorLabel name="card_type" errors={errors} />
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setValue("card_type", value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger
                              className={
                                errors.card_physical_or_digital
                                  ? "border-red-500"
                                  : ""
                              }
                            >
                              <SelectValue
                                id="card_type"
                                placeholder="Selecciona el tipo de tarjeta"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Crédito">Credito</SelectItem>
                              <SelectItem value="Debito">Debito</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="card_physical_or_digital">
                            Tarjeta física o digital
                            <ErrorLabel
                              name="card_physical_or_digital"
                              errors={errors}
                            />
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setValue("card_physical_or_digital", value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger
                              className={
                                errors.card_physical_or_digital
                                  ? "border-red-500"
                                  : ""
                              }
                            >
                              <SelectValue
                                id="card_physical_or_digital"
                                placeholder="Selecciona el tipo de tarjeta"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Física">Física</SelectItem>
                              <SelectItem value="Digital">Digital</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="digits">
                            Últimos 5 dígitos de la tarjeta
                            <ErrorLabel name="digits" errors={errors} />
                          </Label>
                          <Input
                            maxLength={5}
                            id="digits"
                            placeholder="Ejemplo: 12345"
                            {...register("digits")}
                            className={errors.digits ? "border-red-500" : ""}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" type="submit">
                        Enviar Registro
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
