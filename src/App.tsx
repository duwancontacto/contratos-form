import toast, { Toaster } from "react-hot-toast";

import { Success } from "./components/Success";
import { Error } from "./components/Error";

import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";

import {
  getProducts,
  getSign,
  sendContract,
  sendDocumentCompleted,
  sendEmail,
  sendLog,
} from "./services/search";
import { motion } from "framer-motion";
import { Product } from "./interfaces/products";
import PatientRegistrationForm from "./components/wizard/wizard-form";

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFalse, setShowFalse] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  //eslint-disable-next-line
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((response) => {
      response.data.length && setProducts(response.data);
    });

    const sdkUrl =
      import.meta.env.VITE_LEGALARIO_ENVIRONMENT === "SANDBOX"
        ? "https://sdk.legalario.com/3.4/sdk-dev.js"
        : "https://sdk.legalario.com/3.4/sdk-dist.js";

    const script = document.createElement("script");
    script.src = sdkUrl;
    script.type = "module";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //eslint-disable-next-line
  function signatureFinish(data: any, document_id: string, payload: any) {
    try {
      console.log("Payload", data);

      sendDocumentCompleted(document_id, payload);
      sendLog(document_id, data);
      setShowSuccess(true);
      setShowLoading(false);
      sendEmail(document_id);
    } catch (error) {
      setShowFalse(true);
      console.log("error", error);
    }
  }

  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.httpEquiv = "Cache-Control";
    metaTag.content = "no-store, no-cache, must-revalidate";
    document.head.appendChild(metaTag);

    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  const performSignature = (signerId: string, id: string, allData: object) => {
    //eslint-disable-next-line
    const legalario = new (window as any).LegalarioSDK({
      organizationId: import.meta.env.VITE_LEGALARIO_ORGANIZATION_ID,
      apiKey: import.meta.env.VITE_LEGALARIO_KEY,
      env: import.meta.env.VITE_LEGALARIO_ENVIRONMENT,
    });

    legalario
      .signature(
        {
          signerId: signerId,
          modules: ["documents", "signature"],
          send_invite: false,
          authType: "NONE",
          callbacks: {
            //eslint-disable-next-line
            onFinish: (data: any) => signatureFinish(data, id, allData),
          },
        },
        1000
      )
      .catch(() => {
        toast.error("Ha ocurrido un error durante el proceso de firma.");
      });
  };

  //eslint-disable-next-line
  const onSubmit = async (data: any) => {
    try {
      setShowLoading(true);

      if (data.delivery) {
        const deliveryKeys = [
          "person_delivery",
          "street_delivery",
          "ext_num_delivery",
          "int_num_delivery",
          "colony_delivery",
          "cp_delivery",
          "municipe_delivery",
          "city_delivery",
          "state_delivery",
          "street_distance_delivery",
          "street_distance1_delivery",
          "lat_delivery",
          "lng_delivery",
        ];

        deliveryKeys.forEach((key) => {
          const newKey = key.replace("_delivery", "");
          data[newKey] = data[key];
          data[key] = "";
        });

        data.delivery = false;

        delete data.addressOption;
      }

      const result = await sendContract(data);

      const resultSign = await getSign(result.data.id);
      setShowLoading(false);
      performSignature(
        resultSign.data.body.data.signers[0].id,
        result.data.id,
        data
      );
    } catch (error) {
      console.log("error", error);
      if ((error as any)?.response?.data) {
        const { error: responseError, body } = (error as any).response.data;
        setShowFalse(
          body?.message ||
            body ||
            responseError ||
            "Error, no se pudo procesar el registro"
        );
      } else {
        setShowFalse(true);
      }
      setShowLoading(false);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setShowFalse(false);
  };

  return (
    <div>
      <header className="flex items-center justify-center px-4 py-3 bg-fanafesa text-white">
        <a className="flex items-center gap-2" href="#">
          <span className="text-lg font-bold text-center">
            FARMACIAS ESPECIALIZADAS
          </span>
        </a>
      </header>
      <Toaster />

      {showSuccess && <Success handleReset={handleReset} />}
      {showFalse && <Error handleReset={handleReset} showFalse={showFalse} />}

      {showLoading && <Loading />}

      {!showLoading && !showFalse && !showSuccess && (
        <div className="pt-12 md:pt-12 lg:pt-22">
          <div className="container">
            <div className="grid gap-6 md:gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-3xl font-bold  tracking-tighter sm:text-4xl md:text-5xl">
                  Registro de Pacientes
                </h1>
                <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 pt-3">
                  Completa este formulario para registrar tu contrato.
                </p>
                <span className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400 pt-3">
                  Los campos marcados con (*) son obligatorios
                </span>
              </motion.div>

              <PatientRegistrationForm
                products={products}
                onSubmit={onSubmit}
              />

              {/*  <Form products={products} onSubmit={onSubmit} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
