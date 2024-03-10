import {Navigate, Outlet} from "react-router-dom";

export default function AuthLayout() {
    const isAuth = false;


    return isAuth ? (<Navigate to={'/'}/>) : (
        <>
            <section className={'flex flex-1 justify-center items-center flex-col py-10'}>
                <Outlet/>
            </section>
            <img src={'/assets/images/catty-bg1.webp'} alt={'logo'}
                 className={'hidden xl:block h-screen w-1/2 object-contain bg-no-repeat'}/>
        </>


    );
};