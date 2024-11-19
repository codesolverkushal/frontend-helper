import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/useUserStore";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {

    const [otp,setOtp] = useState<string[]>(["","","","","",""]);
    const inputRef = useRef<any>([]);
    const {loading,verifyEmail} = useUserStore();
    const navigate = useNavigate();
    const handleChange = (index:number,value:string)=>{
        if(/^[a-zA-Z0-9]$/.test(value) || value === ""){
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
        // Move to the next input field
        if(value && index < 5){
            inputRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index:number,e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Backspace' && !otp[index] && index > 0){
            inputRef.current[index-1]?.focus();
        }
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const otpCode = otp.join("");
        
        try {
            await verifyEmail(otpCode);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="flex items-center justify-center h-screen w-full">
        <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border-gray-700">
            <div className="text-center">
                 <h1 className="font-bold text-xl">Verify your email</h1>
                 <p className="text-sm text-gray-600">Enter the 6 digit code sent to your email!</p>
            </div>

            <form onSubmit={submitHandler}>
                <div className="flex gap-2 items-center justify-center">
                  {
                    otp.map((letter:string,index:number)=>(
                        <Input
                         key={index}
                         ref={(element)=>(inputRef.current[index] = element)}
                         type="text"
                         value={letter}
                         onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleChange(index,e.target.value)}
                         onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index,e)}
                         className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))
                  }
                </div>
                {
                    loading ? (
                        <Button className=" hover:bg-amber-800
                 mt-6 w-full">Verifying</Button>
                    ): (
                        <Button className="bg-amber-600 hover:bg-amber-800
                 mt-6 w-full">Verify</Button>
                    )
                }          

            </form>
            
        </div>
    </div>
  )
}

export default VerifyEmail