//eslint-disable-next-line
const ErrorLabel = ({ errors, name }: { errors: any; name: string }) => {
  if (!errors[name]) return null;

  const error = errors[name];
  return (
    <>
      {errors[name] && (
        <span className="text-red-500 text-sm ps-1">{error?.message}</span>
      )}
    </>
  );
};
export default ErrorLabel;
