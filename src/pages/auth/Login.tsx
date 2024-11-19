import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { Separator } from "@radix-ui/react-separator";
import { Link, useNavigate } from "react-router-dom";
import { useState,ChangeEvent, FormEvent } from "react";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import useUserStore from "@/store/useUserStore";

// Typescript me type define krne ka 2 tarika 

const Login = () => {

    const [input,setInput] = useState<LoginInputState>({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    

    const [errors,setErrors] = useState<Partial<LoginInputState>>({});

    const {loading,login} = useUserStore();
    console.log(loading);

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
          
        const {name,value} = e.target;
        

        setInput({...input,[name]:value});
    }

    const loginHandler = async (e:FormEvent)=>{
        e.preventDefault();
        const result = userLoginSchema.safeParse(input);

        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>);
            return;
        }
        try {
            await login(input);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
 

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={loginHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border border-gray-200 mx-4">
                <div className="mb-4 text-center">
                    <h1 className="font-bold text-2xl">Kp-Hotel's</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red-500">{errors.email}</span>
                        }
                    </div>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red-500">{errors.password}</span>
                        }
                    </div>
                </div>

                <div className="mb-10">
                    {
                        loading ? (
                            <Button disabled className="w-full bg-orange hover:bg-hoverOrange flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
                                Login
                            </Button>
                        )
                    }

                <div className="mt-4 text-center">
                <Link to="/forgot-password" className="text-violet-500">Forgot Password</Link>
                </div>

                </div>
              
                <Separator orientation="horizontal" decorative style={{ margin: '10px 0', backgroundColor: '#ddd', height: '1px' }} />
              <p className="mt-2 text-center">
                Don't have an account?{"  "}
                <Link to="/signup" className="text-violet-500">SignUp</Link>
              </p>
                
            </form>
        </div>
    )
}


export default Login