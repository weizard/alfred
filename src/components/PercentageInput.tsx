function PercentageInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <label className="flex items-center gap-2">
      <input
        {...props}
        type="number"
        className={`input mt-1 block w-full shadow-sm sm:text-sm rounded-md py-3 px-4 ${
          error
            ? "input-bordered input-error"
            : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
        }`}
      />
      %
    </label>
  );
}

export default PercentageInput;
