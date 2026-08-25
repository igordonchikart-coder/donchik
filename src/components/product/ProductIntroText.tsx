import styles from './ProductIntroText.module.css'

interface ProductIntroTextProps {
  text: string
  trustpilotLabel: string | null
}

export function ProductIntroText({ text, trustpilotLabel }: ProductIntroTextProps) {
  if (!trustpilotLabel || !text.includes(trustpilotLabel)) {
    return <p className={styles.intro}>{text}</p>
  }

  const [before, after] = text.split(trustpilotLabel)

  return (
    <p className={styles.intro}>
      {before}
      <a className={styles.trustpilot} href="https://www.trustpilot.com" target="_blank" rel="noreferrer">
        {trustpilotLabel}
      </a>
      {after}
    </p>
  )
}
