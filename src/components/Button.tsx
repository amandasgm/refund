const bgStyles = {
  with: "bg-green-100 text-white hover:bg-green-200 transition easy-linear disabled:opacity-50 disabled:cursor-progress",
  without: "bg-transparent text-gray-100 hover:text-green-100 transition-colors duration-300",
};

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  bg?: keyof typeof bgStyles;
};

export function Button({
  type = "button",
  isLoading,
  bg = "with",
  children,
  ...rest
}: Props) {
  return (
    <div>
      <button
        type={type}
        disabled={isLoading}
        className={`${bgStyles[bg]} flex items-center justify-center w-full h-12 rounded-lg cursor-pointer`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
