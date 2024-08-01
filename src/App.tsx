import toast, { Toaster } from "react-hot-toast";

import { Success } from "./components/Success";
import { Error } from "./components/Error";

import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";

import {
  getProducts,
  getSign,
  sendContract,
  sendEmail,
} from "./services/search";
import { Form } from "./components/Form";
import { Product } from "./interfaces/products";

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
  function signatureFinish(data: any, document_id: string) {
    if (
      data.documents[0].status === "approved" &&
      data.signer.status === "confirmed"
    ) {
      setShowSuccess(true);
      setShowLoading(false);
      sendEmail(document_id);
    } else {
      toast.error("Ha ocurrido un error durante el proceso de firma.");
    }
  }

  const performSignature = (signerId: string, id: string) => {
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
          authType: "NONE",
          callbacks: {
            //eslint-disable-next-line
            onFinish: (data: any) => signatureFinish(data, id),
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

      const result = await sendContract(data);

      const resultSign = await getSign(result.data.id);
      setShowLoading(false);
      performSignature(resultSign.data.body.data.signers[0].id, result.data.id);
    } catch (error) {
      console.log("error", error);
      setShowFalse(true);
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
      {showFalse && <Error handleReset={handleReset} />}

      {showLoading && <Loading />}

      {!showLoading && !showFalse && !showSuccess && (
        <div className="py-12 md:py-12 lg:py-22">
          <div className="container">
            <div className="grid gap-6 md:gap-8 lg:gap-12">
              <div className="text-center">
                <h1 className="text-3xl font-bold  tracking-tighter sm:text-4xl md:text-5xl">
                  Registro de Pacientes
                </h1>
                <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 pt-3">
                  Completa este formulario para registrar tu contrato.
                </p>
                <span className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400 pt-3">
                  Campos marcados con (*) son obligatorios
                </span>
              </div>

              <Form products={products} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
