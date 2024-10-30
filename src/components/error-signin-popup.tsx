export default function ErrorSigninPopup(props: {message: string}) {
    return <div className="w-full p-4 bg-red-300 border border-red-700 rounded-md flex justify-center items-center text-red-700 text-sm mt-8">{props.message}</div>
}