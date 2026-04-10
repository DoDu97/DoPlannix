'use client'

import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Product } from './data'

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number
  img: string
  qty: number
}

interface CartState {
  items: Record<number, CartItem>
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items[action.product.id]
      return {
        ...state,
        isOpen: true,
        items: {
          ...state.items,
          [action.product.id]: existing
            ? { ...existing, qty: existing.qty + 1 }
            : {
                id: action.product.id,
                name: action.product.name,
                price: action.product.price,
                originalPrice: action.product.originalPrice,
                img: action.product.img,
                qty: 1,
              },
        },
      }
    }
    case 'REMOVE': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.id]: _removed, ...rest } = state.items
      return { ...state, items: rest }
    }
    case 'INCREMENT': {
      const item = state.items[action.id]
      if (!item) return state
      return {
        ...state,
        items: { ...state.items, [action.id]: { ...item, qty: item.qty + 1 } },
      }
    }
    case 'DECREMENT': {
      const item = state.items[action.id]
      if (!item) return state
      if (item.qty <= 1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [action.id]: _removed, ...rest } = state.items
        return { ...state, items: rest }
      }
      return {
        ...state,
        items: { ...state.items, [action.id]: { ...item, qty: item.qty - 1 } },
      }
    }
    case 'OPEN':
      return { ...state, isOpen: true }
    case 'CLOSE':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {}, isOpen: false })
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function useCartCount() {
  const { state } = useCart()
  return Object.values(state.items).reduce((sum, item) => sum + item.qty, 0)
}

export function useCartTotal() {
  const { state } = useCart()
  return Object.values(state.items).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )
}
