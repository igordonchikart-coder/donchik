import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="field">
      <label className="fieldLabel" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="fieldError" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function TextField({ label, error, id, ...props }: TextFieldProps) {
  const fieldId = id ?? props.name
  if (!fieldId) {
    throw new Error('TextField requires id or name')
  }

  return (
    <Field label={label} htmlFor={fieldId} error={error}>
      <input className="fieldControl" id={fieldId} {...props} />
    </Field>
  )
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function TextAreaField({ label, error, id, ...props }: TextAreaFieldProps) {
  const fieldId = id ?? props.name
  if (!fieldId) {
    throw new Error('TextAreaField requires id or name')
  }

  return (
    <Field label={label} htmlFor={fieldId} error={error}>
      <textarea className="fieldTextarea" id={fieldId} {...props} />
    </Field>
  )
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
}

export function SelectField({ label, error, id, children, ...props }: SelectFieldProps) {
  const fieldId = id ?? props.name
  if (!fieldId) {
    throw new Error('SelectField requires id or name')
  }

  return (
    <Field label={label} htmlFor={fieldId} error={error}>
      <select className="fieldSelect" id={fieldId} {...props}>
        {children}
      </select>
    </Field>
  )
}
