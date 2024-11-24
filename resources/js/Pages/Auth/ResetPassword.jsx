import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { AlertWrapper, showAlert } from '@/Components/partials/Alert';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });


    const submit = async (e) => {
        e.preventDefault();

        console.log(data);

        try {
            await axios.post(route('password.store'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });

            showAlert({
                title: "Berhasil",
                desc: "Akun Anda telah berhasil terdaftar",
                message: "Mohon tunggu hingga admin memverifikasi data Anda",
                success: true,
                color: "green",
            });
        } catch (error) {
            showAlert({
                title: "Gagal",
                desc: "Gagal melakukan registrasi",
                message: "Silakan coba lagi",
                succes: false,
                color: "red",
            });
        }
    };

    return (
        <>
        <AlertWrapper />
        <GuestLayout button={'all'} title={'Reset Password'}>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        color="green"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing} color={'green'}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
        </>
    );
}
