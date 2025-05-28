import { SettingsFormData, settingsSchema } from '@/lib/schemas';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from './ui/form';


const SettingsForm = (
    {
    initialData,
    onSubmit,
    userType

    }: SettingsFormProps) => {
        const [editMode, setEditMode] = useState(false);
        const form = useForm <SettingsFormData> ({
            resolver: zodResolver(settingsSchema),
            defaultValues: initialData

        })

        const toogleEditMode = () => {
            setEditMode(!editMode);
            if (editMode) {
                form.reset(initialData);
            }
        }
 
    
const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit (data);
    setEditMode(false);
}     


  return (
    <div className="pt-8 pb-5 px-8">
        <div className="mb-5">
            <h1 className="text-xl font-semibold">
                {'${userType.charAt(0).toUpperCase() + userType.slice(1)} Settings'}

            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Quản lý Sở thích với thông tin cá nhân
            </p>
        </div>
        <div className="bg-white rounded-xl p-6">
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6">
                </form>
            </Form>
        </div>
    </div>
  )
}

export default SettingsForm