import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface SharedProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    to?: undefined
  }

type ButtonAsLink = SharedProps & {
  to: string
  disabled?: boolean
  onClick?: () => void
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'button',
  secondary: 'button buttonSecondary',
  danger: 'button buttonDanger',
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonAsButton | ButtonAsLink) {
  const classes = [variantClass[variant], className].filter(Boolean).join(' ')

  if ('to' in props && props.to) {
    return (
      <Link className={classes} to={props.to} onClick={props.onClick} aria-disabled={props.disabled}>
        {children}
      </Link>
    )
  }

  const { type, ...buttonProps } = props as ButtonAsButton
  return (
    <button className={classes} type={type ?? 'button'} {...buttonProps}>
      {children}
    </button>
  )
}
