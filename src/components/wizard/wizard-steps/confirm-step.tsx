"use client";

import { motion } from "framer-motion";
import { CardContent } from "../../ui/card";
import { CheckCircle2 } from "lucide-react";

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
          <p className="text-gray-500 text-center mt-2">
            Por favor revisa toda la información y confirma que es correcta.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
          <p className="text-blue-800 text-sm">
            Al enviar este formulario, confirmas que toda la información
            proporcionada es correcta y completa según tu conocimiento.
          </p>
        </motion.div>
      </motion.div>
    </CardContent>
  );
}
