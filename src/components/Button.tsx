import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon" | "iconSmall";
};

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
    iconSmall: "h-10 w-10",
  },
};

export function Button({ type = "button", isLoading, className, variant = "base", children, ...rest }: Props) {

  
  return (
    <div>
      <button
        type={type}
        disabled={isLoading}
        className={classMerge([
          "flex items-center justify-center rounded-lg cursor-pointer bg-green-100 text-white hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-progress",
          variants.button[variant],
          className,
        ])}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
