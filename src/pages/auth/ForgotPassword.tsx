import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const loading = false
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form className="flex flex-col gap-5 md:border sm:border md:p-8 w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-bold text-xl mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-700">Enter your email address to reset your password!</p>
                </div>
                <div className="relative w-full">
                    <Input
                        type="text"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Enter your email!"
                        className="pl-10"
                    />
                    <Mail className="absolute inset-y-2 left-2 text-gray-700 pointer-none" />
                </div>
                {
                    loading ? (
                        <Button disabled className="bg-amber-700 hover:bg-amber-900 hover:text-lg"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Keep Patience</Button>
                    ) : (
                        <Button className="bg-amber-700 hover:bg-amber-900 hover:text-lg">Send Reset Link</Button>
                    )
                }

                <Separator orientation="horizontal" decorative style={{ margin: '10px 0', backgroundColor: '#ddd', height: '1px' }} />
                <span className="text-center">
                    Yaad aa gya{" "}
                    <Link to="/login" className="text-violet-500">Login</Link>
                </span>
            </form>
        </div>
    )
}

export default ForgotPassword