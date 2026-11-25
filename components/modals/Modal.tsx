'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { modalShellClass, modalShellPadClass, modalTitleClass } from '#components/modals/modalStyles'

interface ModalProps {
  isOpen?: boolean
  title?: string
  children?: React.ReactNode
  onClose?: () => void
  isClosable?: boolean | false
  heightFull?: boolean | false
  wide?: boolean
  /** Modal auth (mật khẩu / 2FA) hẹp hơn form hồ sơ */
  compact?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  heightFull,
  wide = false,
  compact = false,
}) => {
  const widthClass = wide ? 'max-w-xl' : compact ? 'max-w-md' : 'max-w-lg'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/45 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'fbcm-modal-form-title' : undefined}
            className={`${modalShellClass} ${modalShellPadClass} ${widthClass} ${
              heightFull ? 'h-full max-h-none' : ''
            }`}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.16 }}
          >
            {title ? (
              <div className="mb-4 border-b border-[#eef0f3] pb-3">
                <h2 id="fbcm-modal-form-title" className={modalTitleClass}>
                  {title}
                </h2>
              </div>
            ) : null}

            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
