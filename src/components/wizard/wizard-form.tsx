"use client";

import { useState, useEffect } from "react";
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
  const [isLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: yupResolver(getValidationSchema(currentStep)) as any,
    mode: "onChange",
    defaultValues: {
      delivery: false,
    },
  });

  const [data, setData] = useState<Record<string, unknown>>({});

  const watchAllFields = watch();
  const watchProduct = watch("product_id");
  const idCx = watch("idCX");

  useEffect(() => {
    const keysToExclude = ["product_id", "plan_id", "idCX", "email"];
    Object.keys(watchAllFields).forEach((key) => {
      if (
        !keysToExclude.includes(key) &&
        typeof watchAllFields[key] === "string"
      ) {
        setValue(key, (watchAllFields[key] as string).toUpperCase());
      }
    });
  }, [watchAllFields, setValue]);

  const selectedProduct = products.find(
    (product: Product) => product.id.toString() === watchProduct
  );

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
    const isValid = await trigger();

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
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowDialog(true);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SearchStep
            setValue={setValue}
            setData={setData}
            externalReset={reset}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <UserDataStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            idCx={idCx}
          />
        );
      case 3:
        return (
          <AddressStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            idCx={idCx}
            data={data}
          />
        );
      case 4:
        return (
          <MedicalProductStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            products={products}
            selectedProduct={selectedProduct}
          />
        );
      case 5:
        return (
          <BankingStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
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
                  )}
                </>
              )}
            </Button>
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
