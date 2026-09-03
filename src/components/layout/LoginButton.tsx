import styles from './LoginButton.module.css'

interface LoginButtonProps {
  onClick?: () => void
}

export function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button className={styles.link} type="button" onClick={onClick}>
      Login
    </button>
  )
}
