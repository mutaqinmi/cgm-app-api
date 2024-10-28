import PhoneNumberInput from "@/components/phone-number-input";
import Form from "next/form";

export default function Page(){
    return <div className="h-screen w-screen flex justify-center items-center">
        <div className="md:p-4 w-4/5 md:shadow-md md:rounded-md">
            <div>
                <h1 className="text-3xl font-semibold">Masuk</h1>
                <span className="text-sm">Masuk untuk melanjutkan.</span>
            </div>
            <Form action={""} formMethod="POST">
                <PhoneNumberInput className="mt-12"/>
            </Form>
        </div>
    </div>
}