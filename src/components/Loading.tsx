export function Loading() {
  return (
    <>
      <div className="py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="grid gap-6 md:gap-8 lg:gap-12 items-center justify-center">
            <div className="text-center">
              <div className="relative mx-auto mb-5 w-20 h-20 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Cargando...
              </h1>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Espera mientras verificamos la informacion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
