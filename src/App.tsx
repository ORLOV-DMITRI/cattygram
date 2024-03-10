import './globals.css'
import {Route, Routes} from "react-router-dom";
import SignInForm from "./_auth/form/sign-in-form.tsx";
import SignUpForm from "./_auth/form/sign-up-form.tsx";
import AuthLayout from "./_auth/auth-layout.tsx";
import RootLayout from "./_root/root-layout.tsx";
import {Home} from "@/_root/pages";

export default function App() {
    return (
        <main className={'flex h-screen'}>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path={'/sign-in'} element={<SignInForm/>}/>
                    <Route path={'/sign-up'} element={<SignUpForm/>}/>
                </Route>
                <Route element={<RootLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </main>
    );
};