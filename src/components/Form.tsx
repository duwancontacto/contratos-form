import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "./ui/card";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "./ui/select";
import { Button } from "./ui/button";
import ErrorLabel from "./ErrorLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/FormHelper";

import MexicoState from "../lib/mexicoStates.json";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Plan, Product } from "../interfaces/products";
import { Search } from "./Search";
import { useState } from "react";
import { LocationGps } from "./LocationGps";

interface Props {
  //eslint-disable-next-line
  onSubmit: any;
  products: Product[];
}
export function Form({ onSubmit, products }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      delivery: false,
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  //eslint-disable-next-line
  const [data, setData] = useState<any>({});
  const watchDelivery = watch("delivery");

  const watchProduct = watch("product_id");
  const watchCurrentPhones = watch("currentPhones");

  const idCx = watch("idCX");

  const selectedProduct = products.find(
    (product: Product) => product.id.toString() === watchProduct
  );

  //eslint-disable-next-line
  const handleSend = async (data: any) => {
    try {
      const plan = selectedProduct?.plans.find(
        (plan: Plan) => plan.id.toString() === data.plan_id.toString()
      );
      await onSubmit({ ...data, product_duration: plan?.duration });
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Search
        addressOption={watch("addressOption") || ""}
        data={data}
        setData={setData}
        externalReset={reset}
        setValue={setValue}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

      <form onSubmit={handleSubmit(handleSend)}>
        <div className="flex justify-center">
          <Card className="w-full max-w-md sm:max-w-4xl">
            <CardHeader>
              <CardTitle>Datos del usuario</CardTitle>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="" htmlFor="first_name">
                  Nombre *
                  <ErrorLabel name="first_name" errors={errors} />
                </Label>
                <Input
                  type="text"
                  id="first_name"
                  disabled={idCx ? true : false}
                  placeholder="Ejemplo: Juan Miguel"
                  {...register("first_name")}
                  onChange={(e) => {
                    //all in mayuscules
                    e.target.value = e.target.value.toUpperCase();
                    setValue("first_name", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  className={errors.first_name ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="last_name1">
                  Apellido Paterno *
                  <ErrorLabel name="last_name1" errors={errors} />
                </Label>
                <Input
                  disabled={idCx ? true : false}
                  type="text"
                  id="last_name1"
                  placeholder="Ejemplo: Pérez"
                  {...register("last_name1")}
                  className={errors.last_name1 ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="last_name2">
                  Apellido Materno *
                  <ErrorLabel name="last_name2" errors={errors} />
                </Label>
                <Input
                  disabled={idCx ? true : false}
                  type="text"
                  id="last_name2"
                  placeholder="Ejemplo: Fernandez"
                  {...register("last_name2")}
                  className={errors.last_name2 ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="curp">
                  CURP *
                  <ErrorLabel name="curp" errors={errors} />
                </Label>
                <Input
                  maxLength={18}
                  type="text"
                  id="curp"
                  placeholder="Ejemplo: PEGJ850315HJCRRN07"
                  {...register("curp")}
                  className={errors.curp ? "border-red-500" : ""}
                />
              </div>

              <div className="grid gap-2">
                <Label className="" htmlFor="email">
                  Correo electrónico *
                  <ErrorLabel name="email" errors={errors} />
                </Label>
                <Input
                  disabled={idCx ? true : false}
                  id="email"
                  type="text"
                  placeholder="Ejemplo: Juan@dominio.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="phone">
                  Teléfono *
                  <ErrorLabel name="phone" errors={errors} />
                </Label>
                <Input
                  id="phone"
                  maxLength={13}
                  placeholder="Ingresa tu número de teléfono"
                  type="number"
                  {...register("phone")}
                  onChange={(event) => {
                    let value = event.target.value;
                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }
                    setValue("phone", value, {
                      shouldValidate: true,
                    });
                    if (watchCurrentPhones && watchCurrentPhones.length > 0) {
                      const phoneFound = watchCurrentPhones.find(
                        (phone: any) =>
                          phone?.telefono?.NumeroTelefonico === value
                      );

                      if (phoneFound) {
                        setValue("id_phone", phoneFound.telefono.IDExterno, {
                          shouldValidate: true,
                        });
                      } else {
                        setValue("id_phone", "", {
                          shouldValidate: true,
                        });
                      }
                    }
                  }}
                  className={errors.phone ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="gender">
                  Género *
                  <ErrorLabel name="gender" errors={errors} />
                </Label>
                <Select
                  disabled={idCx ? true : false}
                  value={watch("gender")}
                  onValueChange={(value) =>
                    setValue("gender", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    className={errors.gender ? "border-red-500" : ""}
                  >
                    <SelectValue
                      id="gender"
                      placeholder="Selecciona el género"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="card_new">
                  Número de tarjeta Nuevo Yo *
                  <ErrorLabel name="card_new" errors={errors} />
                </Label>
                <Input
                  maxLength={13}
                  type="number"
                  id="card_new"
                  placeholder="Ejemplo: 4259452994"
                  {...register("card_new")}
                  onChange={(event) => {
                    let value = event.target.value;
                    if (value.length > 13) {
                      value = value.slice(0, 13);
                    }
                    setValue("card_new", value, {
                      shouldValidate: true,
                    });
                  }}
                  className={errors.card_new ? "border-red-500" : ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-5">
          <Card className="w-full max-w-md sm:max-w-4xl">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span> Domicilio</span>
                {data.listaDireccion?.length > 1 && (
                  <Button
                    className=" bg-fanafesa"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDialog(true);
                    }}
                  >
                    Consultar direcciones registradas
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-2  gap-4">
              <div className="grid gap-2">
                <Label className="" htmlFor="street">
                  Calle * <ErrorLabel name="street" errors={errors} />
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
                <Label className="" htmlFor="ext_num">
                  Número Ext * <ErrorLabel name="ext_num" errors={errors} />
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
                <Label className="" htmlFor="int_num">
                  Número Int <ErrorLabel name="int_num" errors={errors} />
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
                <Label className="" htmlFor="colony">
                  Colonia * <ErrorLabel name="colony" errors={errors} />
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
                <Label className="" htmlFor="cp">
                  C.P * <ErrorLabel name="cp" errors={errors} />
                </Label>
                <Input
                  maxLength={5}
                  type="number"
                  id="cp"
                  placeholder="Ejemplo: 12345"
                  {...register("cp")}
                  onChange={(event) => {
                    let value = event.target.value;
                    if (value.length > 5) {
                      value = value.slice(0, 5);
                    }
                    setValue("cp", value, {
                      shouldValidate: true,
                    });
                  }}
                  className={errors.cp ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="municipe">
                  Alcaldía / Municipio *
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
                <Label className="" htmlFor="state">
                  Estado *
                  <ErrorLabel name="state" errors={errors} />
                </Label>

                <Select
                  value={watch("state")}
                  onValueChange={(value) =>
                    setValue("state", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    className={errors.state ? "border-red-500" : ""}
                  >
                    <SelectValue
                      id="state"
                      placeholder="Selecciona el estado"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {MexicoState.map((state) => (
                      <SelectItem value={state.value}>{state.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="city">
                  Ciudad *
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
                <Label className="" htmlFor="street_distance">
                  Entre calle (1)
                  <ErrorLabel name="street_distance" errors={errors} />
                </Label>
                <Input
                  type="text"
                  id="street_distance"
                  placeholder="Ejemplo: Calle 123"
                  {...register("street_distance")}
                  className={errors.street_distance ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="street_distance1">
                  Entre calle (2)
                  <ErrorLabel name="street_distance1" errors={errors} />
                </Label>
                <Input
                  type="text"
                  id="street_distance1"
                  placeholder="Ejemplo: Calle 124"
                  {...register("street_distance1")}
                  className={errors.street_distance1 ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="person">
                  Persona autorizada para recibir medicamento
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

              <div className="grid gap-2">
                <Label className="" htmlFor="person_delivery">
                  Locacion via GPS
                  <ErrorLabel name="lat" errors={errors} />
                </Label>
                <LocationGps
                  onLocationSelect={(e) => {
                    setValue("lat", e.lat, {
                      shouldValidate: true,
                    });
                    setValue("lng", e.lng, {
                      shouldValidate: true,
                    });
                  }}
                  initialLocation={{
                    lat: watch("lat") || 0,
                    lng: watch("lng") || 0,
                  }}
                />
              </div>

              {watch("addressOption") && (
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
              )}

              {watchDelivery === true && watch("addressOption") && (
                <>
                  <div></div>
                  <CardTitle className="w-full my-5">
                    Domicilio de entrega
                  </CardTitle>
                  <div></div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="street">
                      Calle{" "}
                      <ErrorLabel name="street_delivery" errors={errors} />
                    </Label>
                    <Input
                      type="text"
                      id="street_delivery"
                      placeholder="Ejemplo: Calle 123"
                      {...register("street_delivery")}
                      className={errors.street_delivery ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="ext_num_delivery">
                      Número Ext{" "}
                      <ErrorLabel name="ext_num_delivery" errors={errors} />
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
                    <Label className="" htmlFor="int_num_delivery">
                      Número Int{" "}
                      <ErrorLabel name="int_num_delivery" errors={errors} />
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
                    <Label className="" htmlFor="colony_delivery">
                      Colonia{" "}
                      <ErrorLabel name="colony_delivery" errors={errors} />
                    </Label>
                    <Input
                      type="text"
                      id="colony_delivery"
                      placeholder="Ejemplo: Colonia Centro"
                      {...register("colony_delivery")}
                      className={errors.colony_delivery ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="cp_delivery">
                      C.P <ErrorLabel name="cp_delivery" errors={errors} />
                    </Label>
                    <Input
                      type="text"
                      id="cp_delivery"
                      placeholder="Ejemplo: 12345"
                      {...register("cp_delivery")}
                      className={errors.cp_delivery ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="municipe_delivery">
                      Alcaldía / Municipio{" "}
                      <ErrorLabel name="municipe_delivery" errors={errors} />
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
                    <Label className="" htmlFor="state_delivery">
                      Estado
                      <ErrorLabel name="state_delivery" errors={errors} />
                    </Label>
                    <Select
                      value={watch("state_delivery")}
                      onValueChange={(value) =>
                        setValue("state_delivery", value, {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger
                        className={
                          errors.state_delivery ? "border-red-500" : ""
                        }
                      >
                        <SelectValue
                          id="state_delivery"
                          placeholder="Selecciona el estado"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {MexicoState.map((state) => (
                          <SelectItem value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="city_delivery">
                      Ciudad <ErrorLabel name="city_delivery" errors={errors} />
                    </Label>
                    <Input
                      type="text"
                      id="city_delivery"
                      placeholder="Ejemplo: Ciudad de México"
                      {...register("city_delivery")}
                      className={errors.city_delivery ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="street_distance_delivery">
                      Entre calle (1)
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
                        errors.street_distance_delivery ? "border-red-500" : ""
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="street_distance1_delivery">
                      Entre calle (2)
                      <ErrorLabel
                        name="street_distance1_delivery"
                        errors={errors}
                      />
                    </Label>
                    <Input
                      type="text"
                      id="street_distance1_delivery"
                      placeholder="Ejemplo: Calle 124"
                      {...register("street_distance1_delivery")}
                      className={
                        errors.street_distance1_delivery ? "border-red-500" : ""
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="" htmlFor="person_delivery">
                      Persona adicional autorizada para recibir medicamento
                      <ErrorLabel name="person_delivery" errors={errors} />
                    </Label>
                    <Input
                      type="text"
                      id="person_delivery"
                      placeholder="Ejemplo: Juan Pérez"
                      {...register("person_delivery")}
                      className={errors.person_delivery ? "border-red-500" : ""}
                    />
                  </div>{" "}
                  <div className="grid gap-2">
                    <Label className="" htmlFor="person_delivery">
                      Locacion via GPS
                      <ErrorLabel name="lat_delivery" errors={errors} />
                    </Label>
                    <LocationGps
                      onLocationSelect={(e) => {
                        setValue("lat_delivery", e.lat, {
                          shouldValidate: true,
                        });
                        setValue("lng_delivery", e.lng, {
                          shouldValidate: true,
                        });
                      }}
                      initialLocation={{
                        lat: watch("lat_delivery") || 0,
                        lng: watch("lng_delivery") || 0,
                      }}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-5">
          <Card className="w-full max-w-md sm:max-w-4xl">
            <CardHeader>
              <CardTitle>Médico-Producto</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label className="" htmlFor="specialty">
                  Especialidad del Médico *
                  <ErrorLabel name="specialty" errors={errors} />
                </Label>
                <Input
                  type="text"
                  id="specialty"
                  placeholder="Ejemplo: Cardiología"
                  {...register("specialty")}
                  className={errors.specialty ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label className="" htmlFor="product">
                  Selecciona el Producto a domiciliar *
                  <ErrorLabel name="product_id" errors={errors} />
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("product_id", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    className={errors.product_id ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem value={product.id.toString()}>
                        {product.description}
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
                      Selecciona el tipo de membresía *
                      <ErrorLabel name="plan_id" errors={errors} />
                    </Label>
                    <div className="flex items-center gap-4">
                      <Label
                        htmlFor="plan_id-6"
                        className="flex items-center gap-2 cursor-pointer "
                      >
                        <RadioGroup
                          className="flex items-center"
                          onValueChange={(value) =>
                            setValue("plan_id", value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          {selectedProduct?.plans.map((plan: Plan) => (
                            <div className="flex items-center">
                              <RadioGroupItem
                                id={`plan_id-${plan.id}`}
                                value={plan.id}
                                className={
                                  errors.plan_id ? "border-red-500" : ""
                                }
                              />
                              <label
                                htmlFor={`plan_id-${plan.id}`}
                                className={
                                  errors.plan_id ? "text-red-500 ps-2" : "ps-2"
                                }
                              >
                                {plan.name}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </Label>
                    </div>
                  </div>
                  {selectedProduct && (
                    <div className=" ">
                      <div className="text-2xl font-bold">
                        {selectedProduct.description}
                      </div>
                      <div className="text-gray-500">
                        {selectedProduct.varcode}
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
                  <Label className="" htmlFor="institution">
                    Institución Financiera *
                    <ErrorLabel name="institution" errors={errors} />
                  </Label>
                  <Input
                    id="institution"
                    placeholder="Ejemplo: BBVA Bancomer"
                    {...register("institution")}
                    className={errors.institution ? "border-red-500" : ""}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="" htmlFor="card_type">
                    Tipo de tarjeta *
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
                      className={errors.card_type ? "border-red-500" : ""}
                    >
                      <SelectValue
                        id="card_type"
                        placeholder="Selecciona el tipo de tarjeta"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Crédito</SelectItem>
                      <SelectItem value="1">Débito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="" htmlFor="card_physical_or_digital">
                    Tarjeta física o digital *
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
                        errors.card_physical_or_digital ? "border-red-500" : ""
                      }
                    >
                      <SelectValue
                        id="card_physical_or_digital"
                        placeholder="Selecciona el tipo de tarjeta"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Física</SelectItem>
                      <SelectItem value="1">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="" htmlFor="full_name">
                    Nombre completo del Titular *
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
                  <Label className="" htmlFor="digits">
                    Últimos 4 dígitos de la tarjeta *
                    <ErrorLabel name="digits" errors={errors} />
                  </Label>
                  <Input
                    maxLength={4}
                    id="digits"
                    type="number"
                    placeholder="Ejemplo: 1234"
                    {...register("digits")}
                    onChange={(event) => {
                      let value = event.target.value;
                      if (value.length > 4) {
                        value = value.slice(0, 4);
                      }
                      setValue("digits", value, {
                        shouldValidate: true,
                      });
                    }}
                    className={errors.digits ? "border-red-500" : ""}
                  />
                </div>
                {/* <div className="grid gap-2">
                  <Label className="" htmlFor="max_amount">
                    Monto máximo fijo del cargo autorizado
                    <ErrorLabel name="max_amount" errors={errors} />
                  </Label>
                  <Input
                    maxLength={5}
                    id="max_amount"
                    type="stirng"
                    placeholder="Ejemplo: 10000"
                     {...register("max_amount")} 
                    disabled
                    value={
                      watchProductDuration === "0"
                        ? formatPrice(selectedProduct?.price_membership_6 || "")
                        : formatPrice(
                            selectedProduct?.price_membership_12 || ""
                          )
                    }
                    className={errors.max_amount ? "border-red-500" : ""}
                  />
                </div> */}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-fanafesa" type="submit">
                Registro
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}
