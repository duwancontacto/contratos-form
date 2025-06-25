"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ChevronRight, Loader2 } from "lucide-react";
import StepIndicator from "./wizard-navigation";
import SearchStep from "./wizard-steps/search-step";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plan, Product } from "../../interfaces/products";
import { UserDataStep } from "./wizard-steps/user-data-step";
import { AddressStep } from "./wizard-steps/address-step";
import { MedicalProductStep } from "./wizard-steps/medical-product-step";
import ConfirmationForm from "./wizard-steps/confirm-step";
import { BankingStep } from "./wizard-steps/banking-step";
import { bankingStepSchema } from "../../utils/FormHelper";
import {
  addressStepSchema,
  medicalProductStepSchema,
  searchStepSchema,
  userDataStepSchema,
} from "../../utils/FormHelper";
import { PatientFormData } from "../../types/form";
import { AddressData } from "../../types/form";
import toast from "react-hot-toast";

// Define schemas for each step

// Function to get schema based on current step
const getValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return searchStepSchema;
    case 2:
      return userDataStepSchema;
    case 3:
      return addressStepSchema;
    case 4:
      return medicalProductStepSchema;
    case 5:
      return bankingStepSchema;
    default:
      return yup.object().shape({});
  }
};

export default function PatientRegistrationForm({
  products,
  onSubmit,
}: {
  products: Product[];
  onSubmit: (data: PatientFormData) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: yupResolver(getValidationSchema(currentStep)) as any,
    mode: "onChange",
    defaultValues: {
      delivery: false,
    },
  });

  console.log(errors);

  const [data, setData] = useState<AddressData>({ listaDireccion: [] });

  const watchProduct = watch("product_id");
  const idCx = watch("idCX");

  const selectedProduct = products.find(
    (product: Product) => product.id.toString() === watchProduct
  );

  // Función para registrar campos con conversión automática a mayúsculas
  const registerWithUpperCase = (name: string) => {
    const keysToExclude = [
      "product_id",
      "plan_id",
      "idCX",
      "email",
      "cp",
      "phone",
      "digits",
      "card_new",
    ];
    const field = register(name);

    return {
      ...field,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
          !keysToExclude.includes(name) &&
          typeof e.target.value === "string"
        ) {
          e.target.value = e.target.value.toUpperCase();
        }
        field.onChange(e);
      },
    };
  };

  const handleSend = async (data: PatientFormData) => {
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

  const totalSteps = 6;

  const nextStep = async (skipStep: boolean) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor, corrige los errores antes de continuar");
      return;
    }
    const isValid = await trigger();

    if (!isValid) {
      toast.error("Por favor, corrige los errores antes de continuar");
      return;
    }

    if (currentStep === 1 && !skipStep) {
      reset();
    }
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === totalSteps) {
      handleSubmit(handleSend)();
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    reset();
    setCurrentStep(1);
  };

  const handlePrevStepWithDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    clearErrors();
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowDialog(true);
    }
  };

  const setCustomValue = (key: string, value: string) => {
    const keysToExclude = ["product_id", "plan_id", "idCX", "email"];

    if (!keysToExclude.includes(key) && typeof value === "string") {
      setValue(key, value.toUpperCase());
    } else {
      setValue(key, value);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SearchStep
            setValue={setCustomValue}
            setData={setData as any}
            externalReset={reset}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <UserDataStep
            register={registerWithUpperCase}
            errors={errors}
            watch={watch}
            setValue={setCustomValue}
            idCx={idCx}
          />
        );
      case 3:
        return (
          <AddressStep
            register={registerWithUpperCase}
            errors={errors}
            watch={watch}
            setValue={setCustomValue}
            idCx={idCx}
            data={data}
            setError={setError}
            clearErrors={clearErrors}
            setIsLoading={setIsLoading}
          />
        );
      case 4:
        return (
          <MedicalProductStep
            register={registerWithUpperCase}
            errors={errors}
            watch={watch}
            setValue={setCustomValue}
            products={products}
            clearErrors={clearErrors}
            selectedProduct={selectedProduct}
          />
        );
      case 5:
        return (
          <BankingStep
            register={registerWithUpperCase}
            errors={errors}
            watch={watch}
            clearErrors={clearErrors}
            setValue={setCustomValue}
          />
        );
      case 6:
        return <ConfirmationForm />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white py-12 pt-0 px-4">
      <form onSubmit={handleSubmit(handleSend)} className="max-w-3xl mx-auto">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <Card className="mt-8 shadow-lg border border-gray-100 overflow-hidden bg-white">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-center text-gray-800">
              Paso {currentStep} de {totalSteps}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1 && "Verificación de cuenta"}
              {currentStep === 2 && "Datos personales"}
              {currentStep === 3 && "Domicilio"}
              {currentStep === 4 && "Médico y Producto"}
              {currentStep === 5 && "Datos bancarios"}
              {currentStep === 6 && "Confirmación y envío"}
            </CardDescription>
          </CardHeader>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <CardFooter className="flex justify-between p-6 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={handlePrevStepWithDialog}
              disabled={currentStep === 1 || isLoading}
            >
              Anterior
            </Button>
            {currentStep !== 1 && (
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  nextStep(false);
                }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    {currentStep === totalSteps
                      ? "Enviar"
                      : currentStep === 1
                      ? "Soy Nuevo Usuario"
                      : "Siguiente"}
                    {currentStep !== totalSteps && (
                      <ChevronRight className="ml-2 h-4 w-4" />
                    )}{" "}
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmación</DialogTitle>
          </DialogHeader>
          <p>
            Si vuelves al paso 1, perderás toda la información ingresada. ¿Estás
            seguro?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Cancelar
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleDialogConfirm}
            >
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
