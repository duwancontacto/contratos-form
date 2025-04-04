export function Error({
  handleReset,
  showFalse,
}: {
  handleReset: () => void;
  showFalse: boolean;
}) {
  return (
    <>
      <div className="py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="grid gap-6 md:gap-8 lg:gap-12 items-center justify-center">
            <div className="text-center">
              <CircleAlertIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Error en el Registro
              </h1>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {typeof showFalse === "string"
                  ? showFalse
                  : "Lo sentimos, ha ocurrido un error al procesar tu registro. Por favor, inténtalo de nuevo más tarde."}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <HomeIcon className="w-5 h-5" />
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CircleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
