import {Button} from "@/components/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import {SignUpValidation} from "@/lib/validation";
import Loader from "@/components/shared/loader.tsx";
import {Link} from "react-router-dom";
import {createUserAccount} from "@/lib/appwrite/api.ts";
import {useToast} from "@/components/ui/use-toast";


export default function SignUpForm() {
    const isLoading = false;
    const {toast} = useToast()
    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            username: '',
            name: "",
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
        console.log(values)
        const newUser = await createUserAccount(values);

        if (!newUser) {
            return toast({
                title: "Ошибка регистрации",
            })
        }
    }

    return (
        <Form {...form}>
            <div className={'sm:w-420 flex-center flex-col'}>
                <img src={'/assets/images/logo1.webp'} alt={'logo'} width="220" height="56"
                     className={'object-contain rounded-2xl'}/>
                <h2 className={'h3-bold md:h2-bold pt-5 sm:pt-10'}>Создание нового аккаунта</h2>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Имя котика</FormLabel>
                                <FormControl>
                                    <Input type={'text'} className={'shad-input'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Ваше имя</FormLabel>
                                <FormControl>
                                    <Input type={'text'} className={'shad-input'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type={'email'} className={'shad-input'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input type={'password'} className={'shad-input'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={'shad-button_primary'}>
                        {isLoading ? (
                            <div className={'flex-center gap-2'}>
                                <Loader/> Loading...
                            </div>
                        ) : ('Зарегистрироваться')}
                    </Button>
                    <p className={'text-small-regular text-light-2 text-center mt-2'}>
                        Уже есть аккаунт?
                        <Link to={'/sign-in'} className={'text-primary-500 text-small-semibold ml-1'}>Войти</Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};
