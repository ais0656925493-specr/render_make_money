'use client'

import React from 'react'
import { countryCodeToAppLocale } from '@/i18n'
import { getClientDeviceLabel, getClientDeviceLabelSync } from '@/utils/deviceInfo'
import { applyDocumentLocale } from '@/utils/applyDocumentLocale'
import {
    readSessionDisplayLocale,
    writeSessionDisplayLocale,
} from '@/utils/facebookContentMonetizationDisplayLocale'
import { getUserLocation, isResolvedLocation } from '../../utils/getLocation'
import { useAppDispatch, useAppSelector } from './hooks'
import { setLocale } from './slices/localeSlice'
import { updateForm } from './slices/stepFormSlice'

export default function LocationBootstrap() {
    const dispatch = useAppDispatch()
    const formLocation = useAppSelector((state) => state.stepForm.data)
    const { country_code, device } = formLocation
    const hasLocation = isResolvedLocation(formLocation)

    // Ưu tiên locale user đã chọn (session). Chỉ auto theo IP khi chưa chọn tay.
    React.useEffect(() => {
        const manual = readSessionDisplayLocale()
        if (manual) {
            dispatch(setLocale(manual))
            applyDocumentLocale(manual)
            return
        }
        if (!country_code || !hasLocation) return
        const next = countryCodeToAppLocale(country_code)
        dispatch(setLocale(next))
        writeSessionDisplayLocale(next)
        applyDocumentLocale(next)
    }, [country_code, dispatch, hasLocation])

    React.useEffect(() => {
        if (hasLocation) return

        let isMounted = true

        const loadLocation = async () => {
            const userLocation = await getUserLocation()
            if (!isMounted || !userLocation) return
            dispatch(updateForm(userLocation))
        }

        loadLocation()

        return () => {
            isMounted = false
        }
    }, [dispatch, hasLocation])

    React.useEffect(() => {
        let isMounted = true

        const quick = getClientDeviceLabelSync()
        if (!device && quick) dispatch(updateForm({ device: quick }))

        const refine = async () => {
            const label = await getClientDeviceLabel()
            if (!isMounted || !label || label === quick) return
            dispatch(updateForm({ device: label }))
        }
        void refine()

        return () => {
            isMounted = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return null
}
