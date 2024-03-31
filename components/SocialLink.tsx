import Link, { LinkProps } from "next/link";

export function SocialLink({
  icon: Icon,
  ...props
}: {
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  target?: string;
} & LinkProps) {
  return (
    <Link className="p-1 -m-1 group" {...props}>
      <Icon className="w-6 h-6 transition fill-gray-600 group-hover:fill-gray-800" />
    </Link>
  );
}
