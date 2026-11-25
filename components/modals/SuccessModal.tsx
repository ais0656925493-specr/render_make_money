'use client'

import React from 'react'

import { useAppStrings } from '@/hooks/useAppStrings'
import {
  modalFooterLogoClass,
  modalLeadClass,
  modalMediaClass,
  modalPrimaryBtnClass,
} from '#components/modals/modalStyles'

import Modal from './Modal'

interface SuccessModalProps {
  isOpend: boolean
  onToggleSuccess: (value: boolean) => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpend, onToggleSuccess }) => {
  const t = useAppStrings()
  const [isOpen, setIsOpen] = React.useState(isOpend)

  React.useEffect(() => {
    setIsOpen(isOpend)
  }, [isOpend])

  const handleClose = () => {
    setIsOpen(false)
    onToggleSuccess(false)
  }

  return (
    <Modal isOpen={isOpen} title={t.success.title} onClose={handleClose} compact>
      <div className="flex min-h-full w-full min-w-0 flex-col">
        <div className={modalMediaClass}>
          <img src="/images/meta/succes.jpg" width="100%" alt="" />
        </div>

        <p className={modalLeadClass}>{t.success.p1}</p>
        <p className={`${modalLeadClass} mt-3`}>{t.success.p2}</p>

        <a className={`${modalPrimaryBtnClass} mt-6 no-underline`} href="https://www.facebook.com">
          {t.success.cta}
        </a>

        <div className={`${modalFooterLogoClass} mt-8`}>
          <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="" />
        </div>
      </div>
    </Modal>
  )
}

export default SuccessModal
