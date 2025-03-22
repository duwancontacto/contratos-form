import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { CardContent } from "../../ui/card";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSearch } from "../../../utils/FormHelper";
import {
  autoPopulateProfile,
  individualAutoPopulateProfile,
} from "../../../services/search";
import toast from "react-hot-toast";
import { containerVariants, itemVariants } from "../../../lib/motionVariants";
import ErrorLabel from "../../ErrorLabel";
import { PatientFormData } from "../../../types/form";

interface SearchStepProps {
  setValue?: UseFormSetValue<PatientFormData>;
  setData?: (data: Record<string, unknown>) => void;
  externalReset?: () => void;
  nextStep?: (skipStep: boolean) => void;
}

export default function SearchStep({
  setValue,
  setData,
  externalReset,
  nextStep,
}: SearchStepProps) {
  const [showLoading, setShowLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [showContactMessage, setShowContactMessage] = useState(false);
  const [foundEmail, setFoundEmail] = useState("");

  const {
    register,
    handleSubmit,
    setValue: setValueForm,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSearch),
  });

  const onSubmit = async ({
    email,
    tarjeta,
  }: {
    email: string;
    tarjeta: string;
  }) => {
    try {
      setShowLoading(true);

      const resultIndividual = await individualAutoPopulateProfile(
        email,
        tarjeta
      );

      let result = resultIndividual[0];

      if (!result.data.results) {
        result = resultIndividual[1];
      }
      console.log("result", resultIndividual);

      if (!result.data.results) {
        toast("Prosiga a ingresar sus datos.", {
          icon: "👨‍⚕️",
        });
        externalReset?.();
        setData?.({});
        nextStep?.(false);
        setValue?.("email", email);
        setValue?.("tarjeta", tarjeta);
        document.getElementById("first_name")?.focus();
      } else {
        const contact = result.data.contacts[0] || null;
        const registeredEmails =
          contact?.listaCorreoElectronico?.map(
            (email: any) => email.correroElectronico
          ) || [];

        setData?.(contact);

        const {
          nombre = "",
          apellidoPaterno = "",
          apellidoMaterno = "",
          idExterno,
          sexo,
          tipo,
        } = contact.datosGenerales || {};

        const user = {
          first_name: nombre,
          last_name1: apellidoPaterno,
          last_name2: apellidoMaterno,
          email:
            (contact?.listaCorreoElectronico &&
              contact?.listaCorreoElectronico[0]?.correroElectronico) ||
            "",
          phone:
            (contact?.listaTelefonos &&
              contact?.listaTelefonos[0]?.telefono?.NumeroTelefonico) ||
            "",
          phoneId:
            (contact?.listaTelefonos &&
              contact?.listaTelefonos[0]?.telefono?.IDExterno) ||
            "",
          direccion:
            (contact?.listaDireccion &&
              contact?.listaDireccion[0]?.direccion) ||
            {},
        };

        externalReset?.();
        setValue?.("first_name", user.first_name);
        setValue?.("last_name1", user.last_name1);
        setValue?.("last_name2", user.last_name2);
        setValue?.("type", tipo);
        setValue?.("gender", sexo === "Masculino" ? "M" : "F");
        setValue?.("email", user.email);
        setValue?.("card_new", tarjeta);
        setValue?.("phone", user.phone);
        setValue?.("id_phone", user.phoneId);
        setValue?.("idCX", idExterno);

        if (user.direccion.estado === "ESTADO DE MEXICO") {
          setValue?.("state", "MEXICO");
        } else {
          setValue?.("state", user.direccion.estado);
        }
        setValue?.("street", user.direccion.calle);
        setValue?.("ext_num", user.direccion.numeroExterior);
        setValue?.("int_num", user.direccion.numeroInterior);
        setValue?.("colony", user.direccion.colonia);
        setValue?.("cp", user.direccion.codigoPostal);
        setValue?.("municipe", user.direccion.delgacionMunicipio);
        setValue?.("city", user.direccion.ciudad);
        setValue?.("street_distance", user.direccion.referncias);
        setValue?.("addressOption", user.direccion.id_externo);
        setValue?.("lat", user.direccion.latitud);
        setValue?.("lng", user.direccion.longitud);

        if (!registeredEmails.includes(email)) {
          setFoundEmail(registeredEmails[0]);
          setValue?.("email", registeredEmails[0]);
          setShowEmailConfirmation(true);
        } else {
          nextStep?.(true);
        }

        toast.success("Paciente encontrado!");
        reset();
      }

      setShowLoading(false);
    } catch (error) {
      toast("Prosiga a ingresar sus datos.", {
        icon: "👨‍⚕️",
      });
      document.getElementById("first_name")?.focus();
      externalReset?.();
      setData?.({});
      setShowLoading(false);
    }
  };

  const handleEmailChoice = (useRegistered: boolean) => {
    if (useRegistered) {
      nextStep?.(true);
    } else {
      setShowEmailConfirmation(false);
      setShowContactMessage(true);
    }
  };

  return (
    <CardContent className="space-y-6 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h3 className="text-lg font-medium pt-5">
          Ingresa tu tarjeta y correo registrados
        </h3>

        {showContactMessage ? (
          <motion.div variants={containerVariants} className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-800">
                Para modificar su información, favor de ponerse en contacto con
                correo@fanasa.com
              </p>
            </div>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setShowContactMessage(false)}
            >
              Cerrar
            </Button>
          </motion.div>
        ) : showEmailConfirmation ? (
          <motion.div variants={containerVariants} className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-yellow-800">
                Ya tiene un correo asociado a esta tarjeta. ¿Desea continuar con
                el correo registrado?
              </p>
              <p className="font-medium mt-2">{foundEmail}</p>
            </div>
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={(e) => {
                  e.preventDefault();
                  handleEmailChoice(false);
                }}
              >
                No, modificarlo
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleEmailChoice(true);
                }}
              >
                Sí, continuar
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={itemVariants}
              className="p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <p className="text-blue-800">
                Si ya estás afiliado con nosotros ingresa tu correo y presiona
                buscar
              </p>
            </motion.div>
            <form className="space-y-3">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="tarjeta">
                  Número de tarjeta
                  <ErrorLabel name="tarjeta" errors={errors} />
                </Label>
                <Input
                  id="tarjeta"
                  maxLength={13}
                  type="number"
                  {...register("tarjeta")}
                  onChange={(event) => {
                    let value = event.target.value;
                    if (value.length > 13) {
                      value = value.slice(0, 13);
                    }
                    setValueForm("tarjeta", value, {
                      shouldValidate: true,
                    });
                  }}
                  placeholder="Ingresa tu número de tarjeta"
                  className={errors.tarjeta ? "border-red-500" : ""}
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">
                  Correo electrónico <span className="text-red-500">*</span>
                  <ErrorLabel name="email" errors={errors} />
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Ejemplo: juan@dominio.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  type="submit"
                  disabled={showLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }}
                >
                  {showLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    "Buscar"
                  )}
                </Button>
              </motion.div>
            </form>
          </>
        )}
      </motion.div>
    </CardContent>
  );
}
