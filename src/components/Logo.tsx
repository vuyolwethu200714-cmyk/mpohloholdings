type LogoProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  return (
    <img
      src="/mpohlo-holdings-logo.png"
      alt="Mpohlo Holdings"
      className={`${className} object-contain`}
      style={{ background: 'transparent' }}
    />
  );
}
