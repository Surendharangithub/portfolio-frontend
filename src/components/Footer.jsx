
const SocialIcons = [
  {
    label: 'Github',
    href: 'https://github.com/Surendharangithub'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/surendharan'
  }
]

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-surface-dim border-t border-outline-var/25 py-2">
      <div className="container-wide flex flex-wrap justify-between items-center gap-4">
        <div className="font-sans font-extrabold text-sm tracking-tightest text-on-surface">
          {/* ARCHITECT.IO */}
          <img src="./assets/logo.svg" alt="logo" className="w-36" />
        </div>
        <p className="text-sm text-on-surface-var">
          © {date} Surencodes.com — Built with precision.
        </p>
        <div className="flex gap-7">
          {SocialIcons?.map((l, index) => (
            <a
              key={index} 
              href={l.href}
              target="_blank"
              className="text-sm text-on-surface-var no-underline
                         transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
