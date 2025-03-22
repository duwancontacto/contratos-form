"use client";

import { motion } from "framer-motion";
import { CardContent } from "../../ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ConfirmationForm() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <CardContent className="space-y-6 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-6"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-center">¡Casi listo!</h3>
          <p className="text-gray-500 text-center mt-2 max-w-md">
            Estás a punto de completar el proceso. Antes de enviar, puedes
            revisar tu información.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>
            Si necesitas modificar algún dato, puedes volver a los pasos
            anteriores con el botón "Anterior".
          </span>
        </motion.div>
      </motion.div>
    </CardContent>
  );
}
