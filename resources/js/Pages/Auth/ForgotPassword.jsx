import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
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
            alert("Silakan selesaikan CAPTCHA");
            return;
        }

        const formData = {
            ...data,
            recaptcha: recaptchaValue,
        };

        post(route('password.email'), formData);
    };

    return (
        <GuestLayout button={'all'} title={'Lupa Password'}>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className='flex flex-col justify-center items-center'>
                <TextInput
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
    );
}
