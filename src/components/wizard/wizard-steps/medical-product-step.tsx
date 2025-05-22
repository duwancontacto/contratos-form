import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import ErrorLabel from "../../ErrorLabel";
import { Plan, Product } from "../../../interfaces/products";
import { CardContent } from "../../ui/card";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "../../../lib/motionVariants";
import toast from "react-hot-toast";

interface MedicalProductStepProps {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  products: Product[];
  selectedProduct: Product | undefined;
}

export function MedicalProductStep({
  register,
  errors,
  watch,
  setValue,
  products,
  selectedProduct,
}: MedicalProductStepProps) {
  const currentContracts = watch("currentContracts");
  return (
    <CardContent className="space-y-6 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 "
      >
        <div className="grid gap-4  pt-5">
          <motion.div variants={itemVariants} className="grid gap-2">
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
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-2">
            <Label className="" htmlFor="product">
              Selecciona el Producto a domiciliar *
              <ErrorLabel name="product_id" errors={errors} />
            </Label>
            <Select
              value={watch("product_id")}
              onValueChange={(value) => {
                const findProduct = products.find(
                  (product: Product) =>
                    product.id.toString() === value.toString()
                );
                const contract = currentContracts?.find(
                  (contract: any) =>
                    contract.contrato.Producto === findProduct?.pdv
                );

                if (contract) {
                  toast.error(
                    "Ya tienes un contrato vigente activo con este producto. Por favor selecciona un producto diferente."
                  );
                  return;
                }
                setValue("product_id", value, {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger
                className={errors.product_id ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecciona un producto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {watch("product_id") && (
            <>
              <motion.div variants={itemVariants} className="grid gap-2">
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
                      value={watch("plan_id")}
                      onValueChange={(value) => {
                        setValue("plan_id", value, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      {selectedProduct?.plans.map((plan: Plan) => (
                        <div key={plan.id} className="flex items-center">
                          <RadioGroupItem
                            id={`plan_id-${plan.id}`}
                            value={plan.id}
                            className={errors.plan_id ? "border-red-500" : ""}
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
              </motion.div>
              {selectedProduct && (
                <motion.div variants={itemVariants} className="mt-4">
                  <div className="text-2xl font-bold">
                    {selectedProduct.description}
                  </div>
                  <div className="text-gray-500">{selectedProduct.varcode}</div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </CardContent>
  );
}
