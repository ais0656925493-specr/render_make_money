'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { useAppStrings } from '@/hooks/useAppStrings'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    allowToggle?: boolean
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, allowToggle = true, onChange, onKeyDown, ...props }, ref) => {
        const t = useAppStrings()
        const [show, setShow] = useState(false)
        const [allowEdit, setAllowEdit] = useState(false)

        const stripSpaces = (value: string) => value.replace(/\s/g, '')

        return (
            <div className={`relative mb-2.5 flex h-11 w-full items-center rounded-xl border border-[#ccd0d5] bg-white px-3.5 text-[14px] text-[#1c1e21] transition duration-150 focus-within:border-[#1877f2] focus-within:ring-2 focus-within:ring-[#1877f2]/20 ${className}`}>
                <input
                    type={show ? 'text' : 'password'}
                    ref={ref}
                    className={'hide-password-toggle h-full w-full bg-transparent outline-none'}
                    readOnly={!allowEdit}
                    onFocus={() => setAllowEdit(true)}
                    autoCorrect='off'
                    autoCapitalize='none'
                    spellCheck={false}
                    {...props}
                    autoComplete='off'
                    autoSave='off'
                    data-lpignore='true'
                    data-1p-ignore='true'
                    data-bwignore='true'
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.code === 'Space') {
                            e.preventDefault()
                        }
                        onKeyDown?.(e)
                    }}
                    onChange={(e) => {
                        const cleaned = stripSpaces(e.target.value)
                        onChange?.({
                            ...e,
                            target: { ...e.target, value: cleaned },
                            currentTarget: { ...e.currentTarget, value: cleaned },
                        } as React.ChangeEvent<HTMLInputElement>)
                    }}
                />
                <button
                    type="button"
                    onClick={allowToggle ? () => setShow((prev) => !prev) : undefined}
                    className={`absolute inset-y-0 right-0 flex items-center px-3 ${allowToggle ? 'text-gray-600 cursor-pointer' : 'text-gray-400 cursor-default'}`}
                    tabIndex={-1}
                    aria-label={show ? t.password.toggleHide : t.password.toggleShow}
                >
                    {allowToggle ? (show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />) : <EyeOff className="w-4 h-4" />}
                </button>

                <style>
                    {`
                        .hide-password-toggle::-ms-reveal,
                        .hide-password-toggle::-ms-clear {
                            display: none;
                        }
                    `}
                </style>
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
