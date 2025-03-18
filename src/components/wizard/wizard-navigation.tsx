"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="relative max-w-3xl mx-auto px-4 ">
      {/* Línea de progreso base */}
      <div className="hidden md:block absolute top-[24px] left-0 right-0 h-1 bg-gray-200 z-0 mx-20 " />

      {/* Línea de progreso activa */}
      <motion.div
        className="hidden md:block absolute top-[24px] left-0 right-0 h-1 bg-orange-500 z-0 mx-20  "
        initial={{ width: "0%" }}
        animate={{
          width: `${(currentStep - 1) * 120}px`,
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className=" hidden md:block absolute top-[24px] left-0 h-1 bg-green-500 z-0 mx-20"
        initial={{ width: "0%" }}
        animate={{
          width: `${(currentStep - 2) * 120}px`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Indicadores de pasos */}
      <div className="relative flex flex-wrap justify-between md:grid grid-cols-6 ">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className="flex flex-col items-center m-5 md:m-0"
            >
              <motion.div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                } shadow-md transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </motion.div>
              <motion.span
                className={`mt-2 text-xs font-medium text-center ${
                  isActive
                    ? "text-orange-500"
                    : isCompleted
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {stepNumber === 1 && "Verificación"}
                {stepNumber === 2 && "Datos personales"}
                {stepNumber === 3 && "Domicilio"}
                {stepNumber === 4 && "Médico y Producto"}
                {stepNumber === 5 && "Datos bancarios"}
                {stepNumber === 6 && "Confirmación"}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
