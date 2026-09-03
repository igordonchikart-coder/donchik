import { Children, isValidElement, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { SelectDropdown } from './SelectDropdown'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  hideLabel?: boolean
  children: ReactNode
}

export function Field({ label, htmlFor, error, hideLabel = false, children }: FieldProps) {
  return (
    <div className="field">
      {hideLabel ? null : (
        <label className="fieldLabel" htmlFor={htmlFor} id={`${htmlFor}-label`}>
          {label}
        </label>
      )}
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

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  label: string
  error?: string
  hideLabel?: boolean
  onChange?: (event: { target: { name?: string; value: string } }) => void
}

function optionsFromChildren(children: ReactNode) {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child) || child.type !== 'option') {
      return []
    }

    const props = child.props as { value?: string | number; children?: ReactNode; disabled?: boolean }

    return [
      {
        value: String(props.value ?? ''),
        label: Children.toArray(props.children).join(''),
        disabled: Boolean(props.disabled),
      },
    ]
  })
}

export function SelectField({
  label,
  error,
  id,
  children,
  hideLabel = false,
  onChange,
  ...props
}: SelectFieldProps) {
  const fieldId = id ?? props.name
  if (!fieldId) {
    throw new Error('SelectField requires id or name')
  }

  return (
    <Field label={label} htmlFor={fieldId} error={error} hideLabel={hideLabel}>
      <SelectDropdown
        id={fieldId}
        name={props.name}
        value={String(props.value ?? '')}
        options={optionsFromChildren(children)}
        disabled={props.disabled}
        required={props.required}
        compact={hideLabel}
        labelledBy={hideLabel ? undefined : `${fieldId}-label`}
        ariaLabel={hideLabel ? label : undefined}
        onChange={(value) => onChange?.({ target: { name: props.name, value } })}
      />
    </Field>
  )
}
