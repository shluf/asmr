import InputError from '@/Components/InputError';
import { AlertWrapper, showAlert } from '@/Components/partials/Alert';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const recaptchaRef = useRef();

    const submit = async (e) => {
        e.preventDefault();

        const recaptchaValue = recaptchaRef.current.getValue();
        if (!recaptchaValue) {
            showAlert({
                title: "Gagal Reset Password",
                desc: "Captcha belum terselesaikan",
                message: "Silakan selesaikan CAPTCHA",
                succes: false,
                color: "red",
              });
            return;
        }

        const formData = {
            ...data,
            recaptcha: recaptchaValue,
        };

        try {
            await axios.post(route('password.email'), formData);
            showAlert({
                title: "Berhasil",
                desc: "Link untuk mereset password telah terkirim",
                message: "Silakan cek email anda untuk melanjutkan",
                color: "green",
            });
        } catch (error) {
            showAlert({
                title: "Gagal",
                desc: "Gagal mengirim link reset password",
                message: "Silakan coba lagi",
                succes: false,
                color: "red",
            });
        }
    };

    return (
        <>
        <AlertWrapper />
        <GuestLayout button={'all'} title={'Lupa Password'}>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Lupa kata sandi Anda? Tidak masalah. Cukup beri tahu kami email Anda
                Anda dan kami akan mengirimi Anda tautan pengaturan ulang kata sandi melalui email 
                yang akan memungkinkan Anda memilih kata sandi yang baru.

            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className='flex flex-col justify-center items-center'>
                <TextInput
                    color="green"
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={siteKey}
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing} color={'green'}>
                        Email Link Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    </>
    );
}
