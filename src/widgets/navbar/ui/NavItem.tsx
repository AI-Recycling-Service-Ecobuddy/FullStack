import Link from 'next/link';

export default function NavItem({
  href,
  label,
  mobile = false,
}: {
  href: string;
  label: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${mobile ? 'block py-2' : ''} font-bold text-white hover:text-emerald-200`}
    >
      {label}
    </Link>
  );
}
