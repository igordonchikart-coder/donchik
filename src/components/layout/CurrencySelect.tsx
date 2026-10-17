import { DISPLAY_CURRENCY_OPTIONS } from '@/utils/displayCurrency'
import { useDisplayCurrency } from '@/hooks/useDisplayCurrency'
import styles from './CurrencySelect.module.css'

interface CurrencySelectProps {
  className?: string
  id?: string
}

export function CurrencySelect({ className = '', id = 'currency-select' }: CurrencySelectProps) {
  const { currency, setCurrency } = useDisplayCurrency()

  return (
    <label className={`${styles.wrap} ${className}`.trim()} htmlFor={id}>
      <span className={styles.srOnly}>Currency</span>
      <select
        id={id}
        className={styles.select}
        value={currency}
        aria-label="Display currency"
        onChange={(event) => setCurrency(event.target.value as typeof currency)}
      >
        {DISPLAY_CURRENCY_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
