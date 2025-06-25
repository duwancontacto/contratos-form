import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import ErrorLabel from "../../ErrorLabel";
import { CardContent } from "../../ui/card";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "../../../lib/motionVariants";
interface UserDataStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  idCx: any;
}

export function UserDataStep({
  register,
  errors,
  watch,
  setValue,
  idCx,
}: UserDataStepProps) {
  const watchCurrentPhones = watch("currentPhones");

  return (
    <CardContent className="space-y-6 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 "
      >
        <div className="grid lg:grid-cols-2 gap-4 pt-5">
          <motion.div variants={itemVariants} className="grid gap-2">
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-2">
            <Label className="" htmlFor="email">
              Correo electrónico *
              <ErrorLabel name="email" errors={errors} />
            </Label>
            <Input
              disabled={true}
              id="email"
              type="text"
              placeholder="Ejemplo: Juan@dominio.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
                if (watchCurrentPhones.length > 0) {
                  const phoneFound = watchCurrentPhones.find(
                    (phone: any) => phone?.telefono?.NumeroTelefonico === value
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue id="gender" placeholder="Selecciona el género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
            <Label className="" htmlFor="card_new">
              Número de tarjeta Nuevo Yo *
              <ErrorLabel name="card_new" errors={errors} />
            </Label>
            <Input
              maxLength={13}
              type="number"
              id="card_new"
              disabled={true}
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
          </motion.div>
        </div>
      </motion.div>
    </CardContent>
  );
}
