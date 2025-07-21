export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type AlertProps = {
  title: string
  mode?: 'light' | 'dark'
  type?: AlertType
  disabled: boolean
}

export interface AlertEmits {
  (e: 'close'): void
}
