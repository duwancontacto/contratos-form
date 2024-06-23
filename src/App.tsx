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
import { Toaster } from "react-hot-toast";
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

import { schema } from "./utils/FormHelper";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import ErrorLabel from "./components/ErrorLabel";
import { Search } from "./components/Search";
import { Checkbox } from "./components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { getProducts, sendContract } from "./services/search";

const products2 = [
  {
    id: "1",
    name: "Producto 1",
    description: "Descripción del producto 1",
    price: "100",
    price_6: "90",
    price_12: "80",
  },
  {
    id: "2",
    name: "Producto 2",
    description: "Descripción del producto 2",
    price: "200",
    price_6: "180",
    price_12: "160",
  },
  {
    id: "3",
    name: "Producto 3",
    description: "Descripción del producto 3",
    price: "300",
    price_6: "270",
    price_12: "240",
  },
  {
    id: "4",
    name: "Producto 4",
    description: "Descripción del producto 4",
    price: "400",
    price_6: "360",
    price_12: "320",
  },
  {
    id: "5",
    name: "Producto 5",
    description: "Descripción del producto 5",
    price: "500",
    price_6: "450",
    price_12: "400",
  },
];

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFalse, setShowFalse] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [products, setProducts] = useState(products2);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  //eslint-disable-next-line
  const onSubmit = async (data: any) => {
    try {
      setShowLoading(true);

      const result = await sendContract(data);
      console.log("result", result);

      console.log(data);
      setShowSuccess(true);
      setShowLoading(false);
    } catch (error) {
      console.log("first", error);
      setShowFalse(true);
      setShowLoading(false);
    }
  };

  const watchDelivery = watch("delivery");
  const watchProduct = watch("product");
  const watchProductDuration = watch("product_duration");

  const handleReset = () => {
    setShowSuccess(false);
    setShowFalse(false);
    reset();
  };

  const selectedProduct = products.find(
    (product) => product.id === watchProduct
  );

  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <a className="flex items-center gap-2" href="#">
          <span className="text-lg font-bold">Farmacias especializadas</span>
        </a>
      </header>
      <Toaster />

      {showSuccess && <Success handleReset={handleReset} />}
      {showFalse && <Error handleReset={handleReset} />}

      {showLoading && <Loading />}

      {!showLoading && !showFalse && !showSuccess && (
        <div className="py-12 md:py-12 lg:py-22">
          <div className="container">
            <div className="grid gap-6 md:gap-8 lg:gap-12">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Registro de Pacientes
                </h1>
                <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 pt-3">
                  Completa este formulario para registrar tu contrato.
                </p>
              </div>
              <Search setValue={setValue} />

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
                    </CardContent>
                  </Card>
                </div>
                <div className="flex justify-center mt-5">
                  <Card className="w-full max-w-md sm:max-w-4xl">
                    <CardHeader>
                      <CardTitle>Domicilio </CardTitle>
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

                      <div className="flex ">
                        <Checkbox
                          id="delivery"
                          {...register("delivery")}
                          onCheckedChange={(e: boolean) => {
                            setValue("delivery", e, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <Label htmlFor="delivery" className="ps-2">
                          ¿Desea que la entrega sea en otro domicilio?
                        </Label>
                      </div>

                      {watchDelivery === true && (
                        <>
                          <div></div>
                          <CardTitle className="w-full my-5">
                            Domicilio de entrega
                          </CardTitle>
                          <div></div>
                          <div className="grid gap-2">
                            <Label htmlFor="street">
                              Calle{" "}
                              <ErrorLabel
                                name="street_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="street_delivery"
                              placeholder="Ejemplo: Calle 123"
                              {...register("street_delivery")}
                              className={
                                errors.street_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="ext_num_delivery">
                              Número Ext{" "}
                              <ErrorLabel
                                name="ext_num_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="ext_num_delivery"
                              placeholder="Ejemplo: 123"
                              {...register("ext_num_delivery")}
                              className={
                                errors.ext_num_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="int_num_delivery">
                              Número Int{" "}
                              <ErrorLabel
                                name="int_num_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="int_num_delivery"
                              placeholder="Ejemplo: 123"
                              {...register("int_num_delivery")}
                              className={
                                errors.int_num_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="colony_delivery">
                              Colonia{" "}
                              <ErrorLabel
                                name="colony_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="colony_delivery"
                              placeholder="Ejemplo: Colonia Centro"
                              {...register("colony_delivery")}
                              className={
                                errors.colony_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cp_delivery">
                              C.P{" "}
                              <ErrorLabel name="cp_delivery" errors={errors} />
                            </Label>
                            <Input
                              type="text"
                              id="cp_delivery"
                              placeholder="Ejemplo: 12345"
                              {...register("cp_delivery")}
                              className={
                                errors.cp_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="municipe_delivery">
                              Alcaldía / Municipio{" "}
                              <ErrorLabel
                                name="municipe_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="municipe_delivery"
                              placeholder="Ejemplo: Cuauhtémoc"
                              {...register("municipe_delivery")}
                              className={
                                errors.municipe_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="city_delivery">
                              Estado / Ciudad{" "}
                              <ErrorLabel
                                name="city_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="city_delivery"
                              placeholder="Ejemplo: Ciudad de México"
                              {...register("city_delivery")}
                              className={
                                errors.city_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="street_distance_delivery">
                              Entre qué calles{" "}
                              <ErrorLabel
                                name="street_distance_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="street_distance_delivery"
                              placeholder="Ejemplo: Calle 123 y Calle 124"
                              {...register("street_distance_delivery")}
                              className={
                                errors.street_distance_delivery
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="person_delivery">
                              Persona adicional autorizada para recibir
                              medicamento
                              <ErrorLabel
                                name="person_delivery"
                                errors={errors}
                              />
                            </Label>
                            <Input
                              type="text"
                              id="person_delivery"
                              placeholder="Ejemplo: Juan Pérez"
                              {...register("person_delivery")}
                              className={
                                errors.person_delivery ? "border-red-500" : ""
                              }
                            />
                          </div>{" "}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center mt-5">
                  <Card className="w-full max-w-md sm:max-w-4xl">
                    <CardHeader>
                      <CardTitle>Producto</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="product">
                          Selecciona un Producto{" "}
                          <ErrorLabel name="product" errors={errors} />
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setValue("product", value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger
                            className={errors.product ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Selecciona un producto" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {watchProduct && (
                        <>
                          {" "}
                          <div className="grid gap-2">
                            <Label>
                              Selecciona la Duración{" "}
                              <ErrorLabel
                                name="product_duration"
                                errors={errors}
                              />
                            </Label>
                            <div className="flex items-center gap-4">
                              <Label
                                htmlFor="product_duration-6"
                                className="flex items-center gap-2 cursor-pointer "
                              >
                                <RadioGroup
                                  className="flex items-center"
                                  onValueChange={(value) =>
                                    setValue("product_duration", value, {
                                      shouldValidate: true,
                                    })
                                  }
                                >
                                  <div className="flex items-center">
                                    <RadioGroupItem
                                      id="product_duration-6"
                                      value="6"
                                      className={
                                        errors.product_duration
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                    <label
                                      htmlFor="product_duration-6"
                                      className={
                                        errors.product_duration
                                          ? "text-red-500 ps-2"
                                          : "ps-2"
                                      }
                                    >
                                      6 meses - $ {selectedProduct?.price_6}
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <RadioGroupItem
                                      id="product_duration-12"
                                      value="12"
                                      className={
                                        errors.product_duration
                                          ? "border-red-500"
                                          : ""
                                      }
                                    />
                                    <label
                                      htmlFor="product_duration-12"
                                      className={
                                        errors.product_duration
                                          ? "text-red-500 ps-2"
                                          : "ps-2"
                                      }
                                    >
                                      12 meses - $ {selectedProduct?.price_12}
                                    </label>
                                  </div>
                                </RadioGroup>
                              </Label>
                            </div>
                          </div>
                          {selectedProduct && watchProductDuration && (
                            <div className=" ">
                              <div className="text-2xl font-bold">
                                {selectedProduct.name}
                              </div>
                              <div className="text-gray-500">
                                {selectedProduct.description}
                              </div>
                              <Label>Precio</Label>
                              <div className="flex flex-col items-start justify-start">
                                <div className="text-sm font-bold line-through text-gray-500">
                                  {"$"}
                                  {selectedProduct.price}
                                </div>
                                <div className="text-3xl font-bold">
                                  {"$"}
                                  {watchProductDuration === "6"
                                    ? selectedProduct.price_6
                                    : selectedProduct.price_12}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
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
                                errors.card_type ? "border-red-500" : ""
                              }
                            >
                              <SelectValue
                                id="card_type"
                                placeholder="Selecciona el tipo de tarjeta"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Crédito">Crédito</SelectItem>
                              <SelectItem value="Débito">Débito</SelectItem>
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
                          <Label htmlFor="full_name">
                            Nombre completo del Titular
                            <ErrorLabel name="full_name" errors={errors} />
                          </Label>
                          <Input
                            id="full_name"
                            placeholder="Ejemplo: Juan Manuel Pérez García"
                            {...register("full_name")}
                            className={errors.full_name ? "border-red-500" : ""}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="digits">
                            Últimos 5 dígitos de la tarjeta
                            <ErrorLabel name="digits" errors={errors} />
                          </Label>
                          <Input
                            maxLength={5}
                            id="digits"
                            type="number"
                            placeholder="Ejemplo: 12345"
                            {...register("digits")}
                            className={errors.digits ? "border-red-500" : ""}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="max_amount">
                            Monto máximo fijo dle cargo autorizado
                            <ErrorLabel name="max_amount" errors={errors} />
                          </Label>
                          <Input
                            maxLength={5}
                            id="max_amount"
                            type="number"
                            placeholder="Ejemplo: 10000"
                            {...register("max_amount")}
                            className={
                              errors.max_amount ? "border-red-500" : ""
                            }
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
