interface LogoProps {
  size?: number
}

export default function MoonLogo({ size = 50 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" fill="#d4d4d4" />
      <circle cx="50" cy="50" r="35" fill="#3a3a3a" />
      <circle cx="45" cy="45" r="20" fill="#d4d4d4" />
      <circle cx="38" cy="42" r="3" fill="#3a3a3a" />
      <circle cx="42" cy="48" r="2" fill="#3a3a3a" />
      <circle cx="48" cy="50" r="2" fill="#3a3a3a" />
    </svg>
  )
}
