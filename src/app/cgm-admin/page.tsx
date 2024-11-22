'use client';
import Chart from "@/components/chart";
import { CaretRight, HandCoins, User, Users, Plus, Funnel, Pencil, Eye, EyeSlash, XCircle, Trash, CheckCircle, DotsThreeVertical, Phone, MapPin, X, List, ArrowRight  } from "@phosphor-icons/react";
import { create } from "zustand";
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from "react";
import * as convertDate from "@/lib/date-converter";
import SideBar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import Card from "@/components/card";
import RegularChoiceChip from "@/components/regular-choice-chip";
import Container from "@/components/container";
import UserListItem from "@/components/user-list-item";
import TableHead from "@/components/table-head";
import VerticalDivider from "@/components/vertical-divider";
import SearchField from "@/components/search-field";
import IconButton from "@/components/icon-button";
import PaginationWidget from "@/components/pagination";
import FeeListItem from "@/components/fee-list-item";
import UserActivityList from "@/components/user-activity-list";
import DropDown from "@/components/dropdown";
import DropDownItem from "@/components/dropdown-item";
import ChoiceChip from "@/components/choice-chip";
import UserListFeeItem from "@/components/user-list-fee-item";
import UnpaidTransaction from "@/components/unpaid-transaction";
import LongFeeChip from "@/components/long-fee-chip";
import axios, { AxiosError, AxiosResponse } from "axios";
import FilledButton from "@/components/filled-button";
import Form from "next/form";
import { useRouter } from "next/navigation";
import * as schema from "@/database/schema";
import * as dateConvert from "@/lib/date-converter";

interface ComponentState {
    navbarIndex: number,
    filterDataIndex: number,
    showContextMenu: boolean,
    selectedContext: string,
    filterStatusIndex: number,
    showNotification: boolean,
    profileSelectedIndex: number,
    selectedFeeID: number,
    selectedUserID: number,
    showSidebar: boolean,
    isLoading: boolean,
    showSetFeePopup: boolean,
    showAddUserPopup: boolean,
    setNavbarIndex: (index: number) => void,
    setFilterDataIndex: (index: number) => void,
    setShowContextMenu: (show: boolean) => void,
    setSelectedContext: (context: string) => void,
    setFilterStatusIndex: (index: number) => void,
    setShowNotification: (show: boolean) => void,
    setProfileSelectedIndex: (index: number) => void,
    setSelectedFeeID: (id: number) => void,
    setSelectedUserID: (id: number) => void,
    setShowSidebar: (show: boolean) => void,
    setIsLoading: (loading: boolean) => void,
    setShowSetFeePopup: (show: boolean) => void,
    setShowAddUserPopup: (show: boolean) => void,
}

const useComponent = create<ComponentState>((set) => {
    return {
        navbarIndex: 0,
        filterDataIndex: 0,
        showContextMenu: false,
        selectedContext: 'Semua RT',
        filterStatusIndex: 0,
        showNotification: false,
        profileSelectedIndex: 0,
        selectedFeeID: 0,
        selectedUserID: 0,
        showSidebar: false,
        isLoading: false,
        showSetFeePopup: false,
        showAddUserPopup: false,
        setNavbarIndex: (index: number) => set({navbarIndex: index}),
        setFilterDataIndex: (index: number) => set({filterDataIndex: index}),
        setShowContextMenu: (show: boolean) => set({showContextMenu: show}),
        setSelectedContext: (context: string) => set({selectedContext: context}),
        setFilterStatusIndex: (index: number) => set({filterStatusIndex: index}),
        setShowNotification: (show: boolean) => set({showNotification: show}),
        setProfileSelectedIndex: (index: number) => set({profileSelectedIndex: index}),
        setSelectedFeeID: (id: number) => set({selectedFeeID: id}),
        setSelectedUserID: (id: number) => set({selectedUserID: id}),
        setShowSidebar: (show: boolean) => set({showSidebar: show}),
        setIsLoading: (loading: boolean) => set({isLoading: loading}),
        setShowSetFeePopup: (show: boolean) => set({showSetFeePopup: show}),
        setShowAddUserPopup: (show: boolean) => set({showAddUserPopup: show}),
    }
})

// Root Component
export default function Page(){
    const route = useRouter();
    const component = useComponent();

    const setNewFee = useCallback(async (amount: number) => {
        return await axios.post(`${process.env.API_URL}/admin/fees`, { amount })
            .then((res: AxiosResponse) => {
                if(res.status === 201){
                    location.reload();
                    component.setShowSetFeePopup(false);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const createNewUser = useCallback(async (name: string, phone: string, address: string, rt: string) => {
        return await axios.post(`${process.env.API_URL}/admin/users`, { name, phone, address, rt })
            .then((res: AxiosResponse) => {
                if(res.status === 201){
                    location.reload();
                    component.setShowAddUserPopup(false);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const setNewFeeHandler = (e: React.FormEvent<HTMLFormElement>) => setNewFee(e.currentTarget.amount.value);
    const createNewUserHandler = (e: React.FormEvent<HTMLFormElement>) => createNewUser(e.currentTarget.username.value, e.currentTarget.phone.value, e.currentTarget.address.value, e.currentTarget.rt.value);

    return <>
        <SideBar sidebarState={component.showSidebar} sidebarController={component.setShowSidebar} navbarState={component.navbarIndex} navbarController={component.setNavbarIndex}/>
        <TopBar navbarState={component.navbarIndex} sidebarController={component.setShowSidebar} notificationState={component.showNotification} notificationController={component.setShowNotification}/>
        <div className="md:ml-64 mt-12 p-4 md:p-8">
            {(() => {
                if(component.navbarIndex === 0){
                    return <Dashboard/>;
                } else if (component.navbarIndex === 1){
                    return <Iuran/>;
                } else if (component.navbarIndex === 2){
                    if(component.selectedUserID !== 0){
                        return <DetailWarga/>;
                    }
                    
                    return <Warga/>;
                } else if (component.navbarIndex === 3){
                    return <Tentang/>;
                }
            })()}
        </div>
        {component.showSetFeePopup ? <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 z-50 flex justify-center items-center">
            <div className="w-4/5 md:w-80 p-4 bg-white rounded-lg">
                <div className="flex justify-between">
                    <div>
                        <span className="text-sm">Atur Iuran</span>
                        <h1 className="font-semibold text-xl">{convertDate.toString(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`)}</h1>
                    </div>
                    <X onClick={() => component.setShowSetFeePopup(false)}/>
                </div>
                <Form action={""} onSubmit={setNewFeeHandler}>
                    <div className="my-8 flex flex-col gap-2">
                        <span>Jumlah Iuran</span>
                        <div className="relative">
                            <span className="font-semibold text-gray-500 absolute top-1/2 -translate-y-1/2 left-3">Rp.</span>
                            <input type="text" name="amount" id="amount" inputMode="numeric" className="w-full py-2 pl-11 pr-3 outline-none border border-slate-500 rounded-lg font-semibold" placeholder="Masukkan Jumlah Iuran"/>
                        </div>
                    </div>
                    <FilledButton type="submit" label="Atur Iuran"/>
                </Form>
            </div>
        </div> : null}
        {component.showAddUserPopup ? <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 z-50 flex justify-center items-center">
            <div className="w-4/5 md:w-96 p-4 bg-white rounded-lg">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-xl">Tambah Warga</h1>
                    <X onClick={() => component.setShowAddUserPopup(false)}/>
                </div>
                <Form action={""} className="grid grid-cols-3 mt-8 gap-4" onSubmit={createNewUserHandler}>
                    <div className="w-full col-span-3 relative">
                        <input type="text" name="username" id="username" className="w-full px-3 py-2 border border-slate-500 rounded-lg outline-none peer" required/>
                        <label htmlFor="username" className="transition-all ease-in-out absolute bg-white px-2 top-1/2 -translate-y-1/2 left-2 peer-focus:text-xs peer-focus:top-0 peer-valid:text-xs peer-valid:top-0">Nama Warga</label>
                    </div>
                    <div className="w-full col-span-3 relative">
                        <input type="tel" name="phone" id="phone" className="w-full px-3 py-2 border border-slate-500 rounded-lg outline-none peer" required/>
                        <label htmlFor="phone" className="transition-all ease-in-out absolute bg-white px-2 top-1/2 -translate-y-1/2 left-2 peer-focus:text-xs peer-focus:top-0 peer-valid:text-xs peer-valid:top-0">No Telepon</label>
                    </div>
                    <div className="w-full col-span-2 relative">
                        <textarea rows={3} name="address" id="address" className="w-full px-3 py-2 border border-slate-500 rounded-lg outline-none peer" required></textarea>
                        <label htmlFor="address" className="transition-all ease-in-out absolute bg-white px-2 top-1/2 -translate-y-1/2 left-2 peer-focus:text-xs peer-focus:top-0 peer-valid:text-xs peer-valid:top-0">Alamat</label>
                    </div>
                    <select name="rt" id="rt" className="col-span-1 w-full h-fit px-3 py-2 border border-slate-500 rounded-lg outline-none" required>
                        <option defaultValue={"Pilih RT"} disabled>Pilih RT</option>
                        <option value="001">RT 001</option>
                        <option value="002">RT 002</option>
                        <option value="003">RT 003</option>
                        <option value="004">RT 004</option>
                    </select>
                    <FilledButton type="submit" label="Tambah Warga" className="col-span-3 mt-4"/>
                </Form>
            </div>
        </div> : null}
    </>
}

function Dashboard() {
    const { setShowSetFeePopup, setShowAddUserPopup } = useComponent();
    const [currentMonthData, setCurrentMonthData] = useState<{fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[]>([]);
    const [usersList, setUsersList] = useState<schema.usersType[]>([]);
    const [userListPagination, setUserListPagination] = useState<number>(1);
    const [userCount, setUserCount] = useState<number>(0);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [feeList, setFeeList] = useState<schema.feesType[]>([]);
    const [feeListPagination, setFeeListPagination] = useState<number>(1);
    const [feesCount, setFeesCount] = useState<number>(0);
    const [paymentHistoryList, setPaymentHistoryList] = useState<{payments: schema.paymentsType, users: schema.usersType}[]>([]);
    const [paymentHistoryPagination, setPaymentHistoryPagination] = useState<number>(1);
    const [paymentHistoryCount, setPaymentHistoryCount] = useState<number>(0);
    const [chartData, setChartData] = useState<{ month: string, done: number, undone: number }[]>([]);

    const getCurrentMonthFee = useCallback(async (fee_id: number) => {
        return await axios.get(`${process.env.API_URL}/admin/fees?fee_id=${fee_id}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[] };
                    setCurrentMonthData(data);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const currentMonthFeeAPI = useCallback(async () => {        
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        return await axios.get(`${process.env.API_URL}/admin/fees?month=${currentMonth}&year=${currentYear}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: schema.feesType[] };
                    getCurrentMonthFee(data[0].fee_id);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, []);

    const getAllUsers = useCallback(async (pagination: number) => {        
        return await axios.get(`${process.env.API_URL}/admin/users?page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, count } = res.data as { data: schema.usersType[], count: number };
                    setUsersList(data);
                    setUserCount(count);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const searchUser = useCallback(async (keyword: string) => {        
        if(keyword === '') return getAllUsers(userListPagination);

        return await axios.get(`${process.env.API_URL}/admin/users?search=${keyword}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: schema.usersType[] };
                    setUsersList(data);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const getAllFees = useCallback(async (pagination: number) => {        
        return await axios.get(`${process.env.API_URL}/admin/fees?page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, count } = res.data as { data: schema.feesType[], count: number };
                    setFeeList(data);
                    setFeesCount(count);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const getFeeByMonth = useCallback(async (month: string, year: string) => {        
        if(month === '' || year === '') return getAllFees(feeListPagination);
        
        return await axios.get(`${process.env.API_URL}/admin/fees?month=${month}&year=${year}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: schema.feesType[] };
                    setFeeList(data);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, []);

    const getActivityHistory = useCallback(async (pagination: number) => {        
        return await axios.get(`${process.env.API_URL}/admin/fees/history?page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, count } = res.data as { data: {payments: schema.paymentsType, users: schema.usersType}[], count: number };
                    setPaymentHistoryList(data);
                    setPaymentHistoryCount(count);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const getChartData = useCallback(async () => {
        return await axios.get(`${process.env.API_URL}/admin/fees?chart_data=true`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: { month: string, done: number, undone: number }[] };
                    setChartData(Object.values(data));
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const totalDoneAmount = currentMonthData.reduce((accumulator, currentValue) => {
        if (currentValue.payments.payment_description === "done") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    const totalPendingAmount = currentMonthData.reduce((accumulator, currentValue) => {
        if (currentValue.payments.payment_description === "pending") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    const totalUndoneAmount = currentMonthData.reduce((accumulator, currentValue) => {
        if (currentValue.payments.payment_description === "undone") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    const userListPaginationHandler = (pagination: number) => getAllUsers(pagination);
    const searchUserHandler = (keyword: string) => searchUser(keyword);
    const feeListPaginationHandler = (pagination: number) => getAllFees(pagination);
    const dateFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => getFeeByMonth(e.currentTarget.value.split('-')[1], e.currentTarget.value.split('-')[0]);
    const paymentHistoryPaginationHandler = (pagination: number) => getActivityHistory(pagination);

    useEffect(() => {
        currentMonthFeeAPI();
        getAllUsers(userListPagination);
        getAllFees(feeListPagination);
        getActivityHistory(paymentHistoryPagination);
        getChartData();
    }, [currentMonthFeeAPI, getAllUsers, getAllFees, getActivityHistory, getChartData]);

    return <>
        <div className="mt-8">
            <h1 className="font-semibold text-lg">Iuran Bulan Ini</h1>
        </div>
        {currentMonthData.length ? <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Card color="blue" title="Jumlah Warga" total={currentMonthData.length} nominal={currentMonthData.length * currentMonthData[0].fees.fee_amount!} icon={<Users/>}/>
            <Card color="green" title="Sudah Lunas" total={totalDoneAmount} nominal={totalDoneAmount * currentMonthData[0].fees.fee_amount!} icon={<HandCoins/>}/>
            <Card color="yellow" title="Menunggu Konfirmasi" total={totalPendingAmount} nominal={totalPendingAmount * currentMonthData[0].fees.fee_amount!} icon={<HandCoins/>}/>
            <Card color="red" title="Belum Lunas" total={totalUndoneAmount} nominal={totalUndoneAmount * currentMonthData[0].fees.fee_amount!} icon={<HandCoins/>}/>
        </div> : <span className="w-full p-4 bg-red-200 text-red-500 border border-red-500 mt-4 rounded-lg block text-center">Iuran bulan {convertDate.toString(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`)} belum anda atur. <span className="underline cursor-pointer" onClick={() => setShowSetFeePopup(true)}>Atur sekarang</span></span>}
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
                <Container>
                    <div>
                        <h1 className="text-lg font-semibold">Grafik Pembayaran</h1>
                        <span className="text-sm">Menampilkan statistik selama 6 bulan terakhir.</span>
                    </div>
                    <div className="mt-8">
                        <Chart chartData={chartData.map((data) => {
                            return { month: dateConvert.toString(data.month), done: data.done, undone: data.undone }
                        })}/>
                    </div>
                </Container>
                <Container>
                    <div className="flex-col md:flex-row flex gap-4 justify-between items-start md:items-center">
                        <h1 className="text-lg font-semibold">Daftar Warga</h1>
                        <div className="flex gap-4 justify-center items-center">
                            <SearchField value={searchKeyword} setValue={setSearchKeyword} onChange={searchUserHandler}/>
                            <VerticalDivider/>
                            <IconButton icon={<Plus size={14}/>} onClick={() => setShowAddUserPopup(true)}/>
                        </div>
                    </div>
                    <div className="mt-8">
                        <table className="w-full">
                            <TableHead title={['Nama', 'No. Telepon', 'Alamat', 'RT']}/>
                            <tbody>
                                {usersList.map((user: schema.usersType) => {
                                    return <UserListItem key={user.user_id} name={user.name!} phone={user.phone!} address={user.address!} rt={user.rt!}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                    {searchKeyword === '' ? <PaginationWidget currentPage={userListPagination} totalPage={Math.ceil(userCount / 10)} onClickNext={() => {if(userListPagination >= Math.ceil(userCount / 10)) return; setUserListPagination(userListPagination + 1); userListPaginationHandler(userListPagination + 1)}} onClickPrev={() => {if(userListPagination <= 1) return; setUserListPagination(userListPagination - 1); userListPaginationHandler(userListPagination - 1)}}/> : null}
                </Container>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <input type="month" name="month" id="month" onChange={dateFilterHandler} className="bg-blue-500 text-white [&::-webkit-calendar-picker-indicator]:invert-[1] outline-none p-2 rounded-md [&::-webkit-datetime-edit]:text-sm" defaultValue={`${new Date().getFullYear()}-${new Date().getMonth() + 1}`}/>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        {feeList.map((fee: schema.feesType) => {
                            return <FeeListItem key={fee.fee_id} month={convertDate.toString(fee.fee_date!)} title={`Iuran Bulan ${convertDate.toString(fee.fee_date!)}`}/>
                        })}
                    </div>
                    <PaginationWidget currentPage={feeListPagination} totalPage={Math.ceil(feesCount / 10)} onClickNext={() => {if(feeListPagination >= Math.ceil(feesCount / 10)) return; setFeeListPagination(feeListPagination + 1); feeListPaginationHandler(feeListPagination + 1)}} onClickPrev={() => {if(feeListPagination <= 1) return; setFeeListPagination(feeListPagination - 1); feeListPaginationHandler(feeListPagination - 1)}}/>
                </Container>
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        {paymentHistoryList.map((history: {payments: schema.paymentsType, users: schema.usersType}) => {
                            return <UserActivityList key={history.payments.payment_id} month={history.payments.last_update!} name={history.users.name!} phone={history.users.phone!} status={history.payments.payment_description!}/>
                        })}
                    </div>
                    <PaginationWidget currentPage={paymentHistoryPagination} totalPage={Math.ceil(paymentHistoryCount / 5)} onClickNext={() => {if(paymentHistoryPagination >= Math.ceil(paymentHistoryCount / 5)) return; setPaymentHistoryPagination(paymentHistoryPagination + 1); paymentHistoryPaginationHandler(paymentHistoryPagination + 1)}} onClickPrev={() => {if(paymentHistoryPagination <= 1) return; setPaymentHistoryPagination(paymentHistoryPagination - 1); paymentHistoryPaginationHandler(paymentHistoryPagination - 1)}}/>
                </Container>
            </div>
        </div>
    </>
}

function Iuran() {
    const { selectedContext, setSelectedContext, showContextMenu, setShowContextMenu, filterStatusIndex, setFilterStatusIndex, setShowSetFeePopup } = useComponent();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentMonthData, setCurrentMonthData] = useState<{fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[]>([]);
    const [usersList, setUsersList] = useState<{fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[]>([]);
    const [userListPagination, setUserListPagination] = useState<number>(1);
    const [feeList, setFeeList] = useState<schema.feesType[]>([]);
    const [feeListPagination, setFeeListPagination] = useState<number>(1);
    const [feesCount, setFeesCount] = useState<number>(0);
    const [paymentHistoryList, setPaymentHistoryList] = useState<{payments: schema.paymentsType, users: schema.usersType}[]>([]);
    const [paymentHistoryPagination, setPaymentHistoryPagination] = useState<number>(1);
    const [paymentHistoryCount, setPaymentHistoryCount] = useState<number>(0);

    const getCurrentMonthFee = useCallback(async (fee_id: number, pagination: number) => {
        return await axios.get(`${process.env.API_URL}/admin/fees?fee_id=${fee_id}&page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, users } = res.data as { data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[], users: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[] };
                    setCurrentMonthData(data);
                    setUsersList(users);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const getFilteredCurrentMonthFee = useCallback(async (fee_id: number, filter: string, pagination: number) => {
        if(filter === 'Semua RT') return getCurrentMonthFee(fee_id, pagination);

        return await axios.get(`${process.env.API_URL}/admin/fees?fee_id=${fee_id}&filter=${filter}&page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, users } = res.data as { data: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[], users: {fees: schema.feesType, payments: schema.paymentsType, users: schema.usersType}[] };
                    setCurrentMonthData(data);
                    setUsersList(users);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const currentMonthFeeAPI = useCallback(async () => {        
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        return await axios.get(`${process.env.API_URL}/admin/fees?month=${currentMonth}&year=${currentYear}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: schema.feesType[] };
                    getCurrentMonthFee(data[0].fee_id, 1);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, []);

    const getAllFees = useCallback(async (pagination: number) => {        
        return await axios.get(`${process.env.API_URL}/admin/fees?page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, count } = res.data as { data: schema.feesType[], count: number };
                    setFeeList(data);
                    setFeesCount(count);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const getFeeByMonth = useCallback(async (month: string, year: string) => {        
        if(month === '' || year === '') return getAllFees(feeListPagination);
        
        return await axios.get(`${process.env.API_URL}/admin/fees?month=${month}&year=${year}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data } = res.data as { data: schema.feesType[] };
                    setFeeList(data);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, []);

    const getActivityHistory = useCallback(async (pagination: number) => {        
        return await axios.get(`${process.env.API_URL}/admin/fees/history?page=${pagination}`)
            .then((res: AxiosResponse) => {
                if(res.status === 200){
                    const { data, count } = res.data as { data: {payments: schema.paymentsType, users: schema.usersType}[], count: number };
                    setPaymentHistoryList(data);
                    setPaymentHistoryCount(count);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [])

    const totalDoneAmount = currentMonthData.reduce((accumulator, currentValue) => {
        if (currentValue.payments.payment_description === "done") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    const totalPendingAmount = currentMonthData.reduce((accumulator, currentValue) => {
        if (currentValue.payments.payment_description === "pending") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    const totalUndoneAmount = currentMonthData.reduce((accumulator, currentValue) => {
        if (currentValue.payments.payment_description === "undone") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    const filterRTHandler = (fee_id: number, filter: string, pagination: number) => getFilteredCurrentMonthFee(fee_id, filter, pagination);
    const userListPaginationHandler = (pagination: number) => getCurrentMonthFee(currentMonthData[0].fees.fee_id, pagination);
    const feeListPaginationHandler = (pagination: number) => getAllFees(pagination);
    const dateFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => getFeeByMonth(e.currentTarget.value.split('-')[1], e.currentTarget.value.split('-')[0]);
    const paymentHistoryPaginationHandler = (pagination: number) => getActivityHistory(pagination);

    useEffect(() => {
        currentMonthFeeAPI();
        getAllFees(feeListPagination);
        getActivityHistory(paymentHistoryPagination);
    }, [currentMonthFeeAPI, getAllFees, getActivityHistory]);
    
    return !currentMonthData.length ? <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
        <span>Iuran bulan {convertDate.toString(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`)} belum anda atur. <span className="underline cursor-pointer" onClick={() => setShowSetFeePopup(true)}>Atur sekarang</span></span>
    </div> : <>
        <div className="mt-8 flex justify-between items-center">
            <div>
                <span className="text-xs">Iuran Bulan</span>
                <h1 className="font-semibold text-xl md:text-2xl">{dateConvert.toString(currentMonthData[0].fees.fee_date!)}</h1>
            </div>
            <div className="relative">
                <DropDown label={selectedContext} onClick={() => setShowContextMenu(!showContextMenu)}/>
                {showContextMenu ? <div className="w-full absolute mt-2 flex flex-col justify-center items-center shadow-md shadow-gray-300">
                    <DropDownItem label="Semua RT" onClick={() => {setSelectedContext('Semua RT'); setShowContextMenu(false); filterRTHandler(currentMonthData[0].fees.fee_id, 'Semua RT', userListPagination)}}/>
                    <DropDownItem label="RT 001" onClick={() => {setSelectedContext('RT 001'); setShowContextMenu(false); filterRTHandler(currentMonthData[0].fees.fee_id, '1', userListPagination)}}/>
                    <DropDownItem label="RT 002" onClick={() => {setSelectedContext('RT 002'); setShowContextMenu(false); filterRTHandler(currentMonthData[0].fees.fee_id, '2', userListPagination)}}/>
                    <DropDownItem label="RT 003" onClick={() => {setSelectedContext('RT 003'); setShowContextMenu(false); filterRTHandler(currentMonthData[0].fees.fee_id, '3', userListPagination)}}/>
                    <DropDownItem label="RT 004" onClick={() => {setSelectedContext('RT 004'); setShowContextMenu(false); filterRTHandler(currentMonthData[0].fees.fee_id, '4', userListPagination)}}/>
                </div> : null}
            </div>
        </div>
        <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <Card color="blue" title="Jumlah Warga" total={currentMonthData.length} nominal={currentMonthData.length * currentMonthData[0].fees.fee_amount!} icon={<Users/>}/>
            <Card color="green" title="Sudah Lunas" total={totalDoneAmount} nominal={totalDoneAmount * currentMonthData[0].fees.fee_amount!} icon={<HandCoins/>}/>
            <Card color="yellow" title="Menunggu Konfirmasi" total={totalPendingAmount} nominal={totalPendingAmount * currentMonthData[0].fees.fee_amount!} icon={<HandCoins/>}/>
            <Card color="red" title="Belum Lunas" total={totalUndoneAmount} nominal={totalUndoneAmount * currentMonthData[0].fees.fee_amount!} icon={<HandCoins/>}/>
        </div>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
                <Container>
                    <div className="w-full flex-col-reverse md:flex-row flex justify-between items-start md:items-center gap-4">
                        <div className="flex gap-2">
                            <ChoiceChip label="Semua" active={filterStatusIndex === 0} onClick={() => {setFilterStatusIndex(0);}}/>
                            <ChoiceChip label="Lunas" active={filterStatusIndex === 1} onClick={() => {setFilterStatusIndex(1);}}/>
                            <ChoiceChip label="Belum Lunas" active={filterStatusIndex === 2} onClick={() => {setFilterStatusIndex(2);}}/>
                        </div>
                        <SearchField value={searchKeyword} setValue={setSearchKeyword} onChange={() => {}}/>
                    </div>
                    <div className="mt-8">
                        <table className="w-full">
                            <TableHead title={['Nama', 'Alamat', 'Status']}/>
                            <tbody>
                                {usersList.map((data) => {
                                    return <UserListFeeItem key={data.users.user_id} name={data.users.name!} address={data.users.address!} status={data.payments.payment_description!}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <PaginationWidget currentPage={userListPagination} totalPage={Math.ceil(currentMonthData.length / 20)} onClickNext={() => {if(userListPagination >= Math.ceil(currentMonthData.length / 20)) return; setUserListPagination(userListPagination + 1); userListPaginationHandler(userListPagination + 1)}} onClickPrev={() => {if(userListPagination <= 1) return; setUserListPagination(userListPagination - 1); userListPaginationHandler(userListPagination - 1)}}/>
                </Container>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Rekapan Iuran Bulanan</h1>
                        <input type="month" name="month" id="month" onChange={dateFilterHandler} className="bg-blue-500 text-white [&::-webkit-calendar-picker-indicator]:invert-[1] outline-none p-2 rounded-md [&::-webkit-datetime-edit]:text-sm" defaultValue={`${new Date().getFullYear()}-${new Date().getMonth() + 1}`}/>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        {feeList.map((fee: schema.feesType) => {
                            return <FeeListItem key={fee.fee_id} month={convertDate.toString(fee.fee_date!)} title={`Iuran Bulan ${convertDate.toString(fee.fee_date!)}`}/>
                        })}
                    </div>
                    <PaginationWidget currentPage={feeListPagination} totalPage={Math.ceil(feesCount / 10)} onClickNext={() => {if(feeListPagination >= Math.ceil(feesCount / 10)) return; setFeeListPagination(feeListPagination + 1); feeListPaginationHandler(feeListPagination + 1)}} onClickPrev={() => {if(feeListPagination <= 1) return; setFeeListPagination(feeListPagination - 1); feeListPaginationHandler(feeListPagination - 1)}}/>
                </Container>
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Aktivitas Terbaru</h1>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        {paymentHistoryList.map((history: {payments: schema.paymentsType, users: schema.usersType}) => {
                            return <UserActivityList key={history.payments.payment_id} month={history.payments.last_update!} name={history.users.name!} phone={history.users.phone!} status={history.payments.payment_description!}/>
                        })}
                    </div>
                    <PaginationWidget currentPage={paymentHistoryPagination} totalPage={Math.ceil(paymentHistoryCount / 5)} onClickNext={() => {if(paymentHistoryPagination >= Math.ceil(paymentHistoryCount / 5)) return; setPaymentHistoryPagination(paymentHistoryPagination + 1); paymentHistoryPaginationHandler(paymentHistoryPagination + 1)}} onClickPrev={() => {if(paymentHistoryPagination <= 1) return; setPaymentHistoryPagination(paymentHistoryPagination - 1); paymentHistoryPaginationHandler(paymentHistoryPagination - 1)}}/>
                </Container>
            </div>
        </div>
    </>
}


function Warga() {
    const component = useComponent();
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    return <>    
        <div className="mt-4 w-full">
            <Container>
                <div className="flex-col gap-4 md:gap-0 md:flex-row flex justify-between items-start md:items-center">
                    <h1 className="text-lg font-semibold">Daftar Warga</h1>
                    <div className="flex gap-4 justify-center items-center">
                        <SearchField value={searchKeyword} setValue={setSearchKeyword} onChange={() => {}}/>
                        <VerticalDivider/>
                        <IconButton icon={<Funnel size={14}/>}/>
                        <IconButton icon={<Plus size={14}/>}/>
                    </div>
                </div>
                <div className="mt-8">
                    <table className="w-full">
                        <TableHead title={['Nama', 'No. Telepon', 'Alamat', 'RT']}/>
                        <tbody>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                            <UserListItem name="Repat Dwi Gunanda" phone="+62 812 - 3456 - 7890" address="Perum CGM, Blok. A 23" rt="01"/>
                        </tbody>
                    </table>
                </div>
                <PaginationWidget currentPage={1} totalPage={256}/>
            </Container>
        </div>
    </>
}

function Tentang(){
    const component = useComponent();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return <>
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 flex flex-col gap-8 shadow-gray-300 shadow-md rounded-lg p-4 h-fit">
                <ul>
                    <li className={`flex justify-between items-center gap-4 p-3 cursor-pointer ${component.profileSelectedIndex === 0 ? 'font-semibold' : 'font-normal'}`} onClick={() => component.setProfileSelectedIndex(0)}>
                        <span>Profil</span>
                        {component.profileSelectedIndex === 0 ? <CaretRight/> : null}
                    </li>
                    <li className={`flex justify-between items-center gap-4 p-3 cursor-pointer ${component.profileSelectedIndex === 1 ? 'font-semibold' : 'font-normal'}`} onClick={() => component.setProfileSelectedIndex(1)}>
                        <span>Ubah Kata Sandi</span>
                        {component.profileSelectedIndex === 1 ? <CaretRight/> : null}
                    </li>
                </ul>
            </div>
            <div className="col-span-1 md:col-span-3 p-4 h-fit bg-white shadow-md shadow-gray-300 flex flex-col gap-4">
                {component.profileSelectedIndex === 0 ? <>
                    <h1 className="text-2xl font-semibold">Profil</h1>
                    <div>
                        <h2 className="font-semibold">Nama</h2>
                        <span>Muhammad Azka Fakhri Fairuz</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">No. Telepon</h2>
                        <span className="text-xs text-gray-500">Nomor telepon anda diatur sebagai nomor <Link href={""} className="text-blue-500 underline">WhatsApp</Link> utama untuk pengaduan warga</span>
                        <div className="flex gap-2 items-center">
                            <span>+62 812 - 3456 - 7890</span>
                            <button className="p-2 bg-blue-500 text-white rounded-lg flex gap-2 items-center">
                                <span className="text-xs">Edit</span>
                                <Pencil/>
                            </button>
                        </div>
                    </div>
                </> : <>
                    <h1 className="text-2xl font-semibold">Ubah Kata Sandi</h1>
                    <div className="relative">
                        <input type={showOldPassword ? 'text' : 'password'} name="old_password" id="old_password" placeholder="Masukkan Kata Sandi Lama" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {showOldPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowOldPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowOldPassword(true)}/>}
                    </div>
                    <div className="w-full h-[0.5px] bg-gray-500 bg-opacity-50 my-2"></div>
                    <div className="relative">
                        <input type={showNewPassword ? 'text' : 'password'} name="new_password" id="new_password" placeholder="Masukkan Kata Sandi Baru" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {showNewPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowNewPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowNewPassword(true)}/>}
                    </div>
                    <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" id="confirm_password" placeholder="Konfirmasi Kata Sandi" className="w-full px-3 p-2 border border-slate-400 outline-none rounded-lg" />
                        {showConfirmPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowConfirmPassword(false)}/> : <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => setShowConfirmPassword(true)}/>}
                    </div>
                    <button className="p-3 bg-blue-500 text-white rounded-lg">Ubah Kata Sandi</button>
                </>}
            </div>
        </div>
    </>
}

function DetailWarga(){
    const [monthList, setMonthList] = useState<string[]>([]);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const component = useComponent();
    const month_inc = useRef(1);
    const currentDate = useRef({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    })

    const add_month = () => {
        let month = currentDate.current.month + month_inc.current;
        let year = currentDate.current.year;

        if (month > 12) {
            month = 1;
            year += 1;
        }

        const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}`;
        const updatedList = [...monthList, formattedDate];
        setMonthList(updatedList);

        currentDate.current.month = month;
        currentDate.current.year = year;
        month_inc.current = 1;
    }

    const resetDate = () => {
        currentDate.current = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        };

        month_inc.current = 1;
        setMonthList([]);
    };
        
    return <>
        <div className="mt-8 grid grid-cols-5 gap-8">
            <div className="col-span-3 flex flex-col gap-8">
                <Container>
                    <div className="flex gap-4 justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="w-20 h-20 bg-blue-200 rounded-full flex justify-center items-center">
                                <User size={32} className="text-blue-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Repat Dwi Gunanda</span>
                                <div className="flex gap-2 text-xs mt-1 items-center">
                                    <Phone size={18}/>
                                    <span className="">+62 812 - 3456 - 7890</span>
                                </div>
                                <div className="flex gap-2 text-xs mt-1 items-center">
                                    <MapPin size={18}/> 
                                    <span>Perum CGM, Blok A. 23</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <DotsThreeVertical size={24} className="cursor-pointer" onClick={() => setShowContextMenu(!showContextMenu)}/>
                            {showContextMenu ? <div className="w-36 bg-white shadow-md shadow-gray-300 absolute -top-0 right-0 mt-8 flex flex-col">
                                <button className="w-full p-2 hover:bg-gray-100">Edit Warga</button>
                                <button className="w-full p-2 hover:bg-gray-100 text-red-500">Hapus Warga</button>
                            </div> : null}
                        </div>
                    </div>
                </Container>
                <Container>
                    <h1 className="text-lg font-semibold">Riwayat Iuran</h1>
                    <div className="flex gap-2 my-4">
                        <ChoiceChip label="Semua" active={component.filterStatusIndex === 0} onClick={() => component.setFilterStatusIndex(0)}/>
                        <ChoiceChip label="Lunas" active={component.filterStatusIndex === 1} onClick={() => component.setFilterStatusIndex(1)}/>
                        <ChoiceChip label="Belum Lunas" active={component.filterStatusIndex === 2} onClick={() => component.setFilterStatusIndex(2)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FeeListItem month="November" title="Iuran Bulan November 2024"/>
                        <FeeListItem month="Oktober" title="Iuran Bulan Oktober 2024"/>
                        <FeeListItem month="September" title="Iuran Bulan September 2024"/>
                    </div>
                </Container>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                <Container>
                    <h1 className="font-semibold text-lg">Iuran Belum Lunas</h1>
                    <div className="w-full flex justify-center font-bold text-3xl items-center mt-4 gap-1">
                        <span>Rp. </span>
                        <span>110.000</span>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <UnpaidTransaction month="November 2024" title="Iuran Bulan November 2024" status="Belum Lunas"/>
                        <UnpaidTransaction month="Oktober 2024" title="Iuran Bulan Oktober 2024" status="Belum Lunas"/>
                    </div>
                </Container>
                <Container>
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-lg">Iuran Jangka Panjang</h1>
                        {monthList.length ? <Trash size={24} className="text-red-500" onClick={resetDate}/> : null}
                    </div>
                    <div className="w-full h-fit flex gap-2 flex-wrap mt-4">
                        {monthList.map((item: string, index: number) => {
                            return <LongFeeChip key={index} item={item}/>
                        })}
                        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full flex justify-center items-center gap-2" onClick={add_month}>
                            <Plus/>
                            <span>Tambah Bulan</span>
                        </button>
                    </div>
                    {monthList.length ? <button className="bg-blue-500 p-3 text-white rounded-lg mt-8 w-full">Tandai Lunas</button> : null}
                </Container>
            </div>
        </div>
    </>
}