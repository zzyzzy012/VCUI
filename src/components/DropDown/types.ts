import type { TooltipProps } from '../Tooltip/types'
import type { VNode } from 'vue'

export interface DropDownProps extends TooltipProps {
  menuOptions: MenuOption[]
  hideAfterClick?: boolean
}

export interface MenuOption {
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}

export interface DropDownEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'select', value: MenuOption): void
}

export interface DropDownInstance {
  show: () => void
  hide: () => void
}
