import * as date from '@/lib/date';
import TextButton from './text-button';

export default function IuranNotSet(props: {date: string; setShowModal: (showModal: boolean) => void}){
    return <div className='flex flex-col justify-center items-center my-6'>
        <span className='text-sm'>Iuran bulan {date.toString(props.date)} belum Anda atur.</span>
        <TextButton title='Atur Iuran' onClick={() => props.setShowModal(true)}/>
    </div>
}