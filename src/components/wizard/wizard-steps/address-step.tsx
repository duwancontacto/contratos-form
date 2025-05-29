import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { CardContent, CardTitle } from "../../ui/card";
import ErrorLabel from "../../ErrorLabel";
import { LocationGps } from "../../LocationGps";
import MexicoState from "../../../lib/mexicoStates.json";
import { useState } from "react";
import { motion } from "framer-motion";
import AddressModal from "../../AddressModal";
import { itemVariants, containerVariants } from "../../../lib/motionVariants";

interface AddressStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  idCx: any;
  data: any;
}

export function AddressStep({
  register,
  errors,
  watch,
  setValue,
  idCx,
  data,
}: AddressStepProps) {
  const watchDelivery = watch("delivery");

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <CardContent className="space-y-6 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 "
      >
        <AddressModal
          addressOption={watch("addressOption") || ""}
          data={data}
          setExternalValue={setValue}
          open={openDialog}
          setOpen={setOpenDialog}
        />
        <div className="w-full pt-5">
          {data.listaDireccion?.length > 1 && (
            <div className="flex justify-between items-center mb-4">
              <Button
                className="bg-fanafesa"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog(true);
                }}
              >
                Consultar direcciones registradas
              </Button>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="street">
                Calle * <ErrorLabel name="street" errors={errors} />
              </Label>
              <Input
                type="text"
                id="street"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: Calle 123"
                {...register("street")}
                className={errors.street ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="ext_num">
                Número Ext * <ErrorLabel name="ext_num" errors={errors} />
              </Label>
              <Input
                type="text"
                id="ext_num"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: 123"
                {...register("ext_num")}
                className={errors.ext_num ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="int_num">
                Número Int <ErrorLabel name="int_num" errors={errors} />
              </Label>
              <Input
                type="text"
                id="int_num"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: 123"
                {...register("int_num")}
                className={errors.int_num ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="colony">
                Colonia * <ErrorLabel name="colony" errors={errors} />
              </Label>
              <Input
                type="text"
                id="colony"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: Colonia Centro"
                {...register("colony")}
                className={errors.colony ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="cp">
                C.P * <ErrorLabel name="cp" errors={errors} />
              </Label>
              <Input
                maxLength={5}
                type="number"
                id="cp"
                disabled={idCx ? true : false}
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
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="municipe">
                Alcaldía / Municipio *
                <ErrorLabel name="municipe" errors={errors} />
              </Label>
              <Input
                type="text"
                id="municipe"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: Cuauhtémoc"
                {...register("municipe")}
                className={errors.municipe ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="state">
                Estado *
                <ErrorLabel name="state" errors={errors} />
              </Label>

              <Select
                value={watch("state")}
                disabled={idCx ? true : false}
                onValueChange={(value) =>
                  setValue("state", value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                  <SelectValue id="state" placeholder="Selecciona el estado" />
                </SelectTrigger>
                <SelectContent>
                  {MexicoState.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="city">
                Ciudad *
                <ErrorLabel name="city" errors={errors} />
              </Label>
              <Input
                type="text"
                id="city"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: Ciudad de México"
                {...register("city")}
                className={errors.city ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="street_distance">
                Entre calle (1)
                <ErrorLabel name="street_distance" errors={errors} />
              </Label>
              <Input
                type="text"
                id="street_distance"
                disabled={idCx ? true : false}
                placeholder="Ejemplo: Calle 123"
                {...register("street_distance")}
                className={errors.street_distance ? "border-red-500" : ""}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
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
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
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
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-2">
              <Label className="" htmlFor="person_delivery">
                Geolocalización *
                <ErrorLabel name="lat" errors={errors} />
              </Label>
              <LocationGps
                idCx={idCx}
                onLocationSelect={(e) => {
                  setValue("lat", e.lat, {
                    shouldValidate: true,
                  });
                  setValue("lng", e.lng, {
                    shouldValidate: true,
                  });
                }}
                initialLocation={{
                  lat: Number(watch("lat")) || 0,
                  lng: Number(watch("lng")) || 0,
                }}
                initialAddress={`${watch("street") || ""} ${
                  watch("ext_num") || ""
                } ${watch("int_num") || ""} ${watch("colony") || ""} ${
                  watch("cp") || ""
                } ${watch("municipe") || ""} ${watch("state") || ""} ${
                  watch("city") || ""
                }`}
              />
            </motion.div>
          </div>

          {watch("addressOption") && (
            <motion.div
              variants={itemVariants}
              className="flex items-center mt-4"
            >
              <Checkbox
                id="delivery"
                {...register("delivery")}
                checked={watch("delivery") === true ? true : false}
                value={watch("delivery")}
                onCheckedChange={(e: boolean) => {
                  console.log("e", e);
                  setValue("delivery", e, {
                    shouldValidate: true,
                  });
                }}
              />
              <Label htmlFor="delivery" className="ps-2">
                ¿Desea que la entrega sea en otro domicilio?
              </Label>
            </motion.div>
          )}

          {watchDelivery === true && watch("addressOption") && (
            <div className="mt-6">
              <CardTitle className="mb-4">Domicilio de entrega</CardTitle>
              <div className="grid lg:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="grid gap-2">
                  <Label className="" htmlFor="street_delivery">
                    Calle <ErrorLabel name="street_delivery" errors={errors} />
                  </Label>
                  <Input
                    type="text"
                    id="street_delivery"
                    placeholder="Ejemplo: Calle 123"
                    {...register("street_delivery")}
                    className={errors.street_delivery ? "border-red-500" : ""}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
                  <Label className="" htmlFor="ext_num_delivery">
                    Número Ext{" "}
                    <ErrorLabel name="ext_num_delivery" errors={errors} />
                  </Label>
                  <Input
                    type="text"
                    id="ext_num_delivery"
                    placeholder="Ejemplo: 123"
                    {...register("ext_num_delivery")}
                    className={errors.ext_num_delivery ? "border-red-500" : ""}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
                  <Label className="" htmlFor="int_num_delivery">
                    Número Int{" "}
                    <ErrorLabel name="int_num_delivery" errors={errors} />
                  </Label>
                  <Input
                    type="text"
                    id="int_num_delivery"
                    placeholder="Ejemplo: 123"
                    {...register("int_num_delivery")}
                    className={errors.int_num_delivery ? "border-red-500" : ""}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
                  <Label className="" htmlFor="municipe_delivery">
                    Alcaldía / Municipio{" "}
                    <ErrorLabel name="municipe_delivery" errors={errors} />
                  </Label>
                  <Input
                    type="text"
                    id="municipe_delivery"
                    placeholder="Ejemplo: Cuauhtémoc"
                    {...register("municipe_delivery")}
                    className={errors.municipe_delivery ? "border-red-500" : ""}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                      className={errors.state_delivery ? "border-red-500" : ""}
                    >
                      <SelectValue
                        id="state_delivery"
                        placeholder="Selecciona el estado"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {MexicoState.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
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
                </motion.div>
                <motion.div variants={itemVariants} className="grid gap-2">
                  <Label className="" htmlFor="person_delivery">
                    Geolocalización
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
                    initialAddress={`${watch("street_delivery") || ""} ${
                      watch("ext_num_delivery") || ""
                    } ${watch("int_num_delivery") || ""} ${
                      watch("colony_delivery") || ""
                    } ${watch("cp_delivery") || ""} ${
                      watch("municipe_delivery") || ""
                    } ${watch("state_delivery") || ""} ${
                      watch("city_delivery") || ""
                    }`}
                  />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </CardContent>
  );
}
