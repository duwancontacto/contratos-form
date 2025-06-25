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
import { itemVariants, containerVariants } from "../../../lib/motionVariants";
import { CardContent } from "../../ui/card";
import { motion } from "framer-motion";
interface BankingStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  clearErrors: any;
}

export function BankingStep({
  register,
  errors,
  watch,
  setValue,
  clearErrors,
}: BankingStepProps) {
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
            <Label className="" htmlFor="card_type">
              Tipo de tarjeta *
              <ErrorLabel name="card_type" errors={errors} />
            </Label>
            <Select
              value={watch("card_type")}
              onValueChange={(value) => {
                setValue("card_type", value, {
                  shouldValidate: true,
                });
                clearErrors("card_type");
              }}
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
            <Label className="" htmlFor="card_physical_or_digital">
              Tarjeta física o digital *
              <ErrorLabel name="card_physical_or_digital" errors={errors} />
            </Label>
            <Select
              value={watch("card_physical_or_digital")}
              onValueChange={(value) => {
                setValue("card_physical_or_digital", value, {
                  shouldValidate: true,
                });
                clearErrors("card_physical_or_digital");
              }}
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
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
                clearErrors("digits");
              }}
              className={errors.digits ? "border-red-500" : ""}
            />
          </motion.div>
        </div>
      </motion.div>
    </CardContent>
  );
}
