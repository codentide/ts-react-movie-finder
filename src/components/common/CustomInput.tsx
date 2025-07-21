interface Props extends React.ComponentPropsWithoutRef<'input'> {
  onInputChange?: (value: string) => void
  value?: string
}

export const CustomInput = ({
  placeholder,
  onInputChange,
  value,
  type,
  ...rest
}: Props) => {
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (onInputChange) onInputChange(value)
  }

  return (
    <input
      type={type || 'text'}
      placeholder={placeholder && placeholder}
      onChange={handleInputChange}
      value={value}
      {...rest}
    />
  )
}
