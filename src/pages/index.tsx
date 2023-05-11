// 훅
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


// 컴포넌트
import Tooltip from "@/components/tooltip";
import FontBox from "@/components/fontbox";

const Index = ({paramsSort}: any) => {
    /** useRouter 훅 */
    const router = useRouter();

    /** 셀렉트 박스 - "언어 선택" 영역 */
    const refLangSelect = useRef<HTMLLabelElement>(null);
    const refLangOption = useRef<HTMLDivElement>(null);

    /** 셀렉트 박스 - "언어 선택" 외 영역 클릭 */
    useEffect(() => {
        function handleLangOutside(e:Event) {
            const selectInput = document.getElementById("select-lang") as HTMLInputElement;
            if (refLangSelect?.current && !refLangSelect.current.contains(e.target as Node) && refLangOption.current && !refLangOption.current.contains(e.target as Node)) {
                selectInput.checked = false;
            }
        }
        document.addEventListener("mouseup", handleLangOutside);
        return () => document.removeEventListener("mouseup", handleLangOutside);
    },[refLangOption]);

    /** 셀렉트 박스 - "언어 선택" 클릭 */
    const handleLangChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const option = document.getElementById("option-lang") as HTMLDivElement;
        if (e.target.checked) {
            option.classList.add("animate-fade-in");
            setTimeout(function() { option.classList.remove('animate-fade-in'); },600);
        }
    }

    /** 셀렉트 박스 - "폰트 형태" 영역 */
    const refTypeSelect = useRef<HTMLLabelElement>(null);
    const refTypeOption = useRef<HTMLDivElement>(null);

    /** 셀렉트 박스 - "폰트 형태" 외 영역 클릭 */
    useEffect(() => {
        function handleTypeOutside(e:Event) {
            const selectInput = document.getElementById("select-type") as HTMLInputElement;
            if (refTypeSelect?.current && !refTypeSelect.current.contains(e.target as Node) && refTypeOption.current && !refTypeOption.current.contains(e.target as Node)) {
                selectInput.checked = false;
            }
        }
        document.addEventListener("mouseup", handleTypeOutside);
        return () => document.removeEventListener("mouseup", handleTypeOutside);
    },[refTypeOption]);

    /** 셀렉트 박스 - "폰트 형태" 클릭 */
    const handleTypeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const option = document.getElementById("option-type") as HTMLDivElement;
        if (e.target.checked) {
            option.classList.add("animate-fade-in");
            setTimeout(function() { option.classList.remove('animate-fade-in'); },600);
        }
    }

    /** 셀렉트 박스 - "정렬순" 영역 */
    const refSortSelect = useRef<HTMLLabelElement>(null);
    const refSortOption = useRef<HTMLDivElement>(null);

    /** 셀렉트 박스 - 정렬순" 외 영역 클릭 */
    useEffect(() => {
        function handleSortOutside(e:Event) {
            const selectInput = document.getElementById("select-sort") as HTMLInputElement;
            if (refSortSelect?.current && !refSortSelect.current.contains(e.target as Node) && refSortOption.current && !refSortOption.current.contains(e.target as Node)) {
                selectInput.checked = false;
            }
        }
        document.addEventListener("mouseup", handleSortOutside);
        return () => document.removeEventListener("mouseup", handleSortOutside);
    },[refSortOption]);

    /** 셀렉트 박스 - "정렬순" 클릭 */
    const handleSortChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const option = document.getElementById("option-sort") as HTMLDivElement;
        if (e.target.checked) {
            option.classList.add("animate-fade-in");
            setTimeout(function() { option.classList.remove('animate-fade-in'); },600);
        }
    }

    /** 옵션 - "정렬순" 훅 */
    const defaultSort: string = paramsSort;
    const [sort, setSort] = useState(defaultSort);
    useEffect(() => { setSort(defaultSort);},[defaultSort]);

    /** 옵션 - "정렬순" 클릭 */
    const handleSortOptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSort(e.target.value);
            router
            .push({ pathname: '/', query: { sort: e.target.value }})
            .then(() => router.reload());
        }
    }

    return (
        <>
            <Tooltip/>
            {/* 헤더 */}
            <div className='interface w-[100%] h-[68px] px-[16px] fixed right-0 top-0 z-10 flex flex-row justify-between items-center backdrop-blur bg-blur-theme border-b border-dark-theme-4'>
                <div className="flex flex-row justify-start items-center">
                    <Link href="/" className="w-[36px] h-[36px] flex flex-row justify-center items-center rounded-[8px] mr-[12px] bg-dark-theme-3/80 hover:bg-dark-theme-4/60 hover:drop-shadow-default">
                        <svg className="w-[18px] pb-px fill-dark-theme-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/></svg>
                    </Link>
                    <div className="relative w-[380px] group">
                        <input type='text' placeholder='원하는 문구를 적어보세요...' className="w-[100%] text-[14px] text-normal text-dark-theme-8 leading-none border rounded-full border-dark-theme-4 px-[20px] py-[10px] pl-[52px] bg-transparent group-hover:bg-dark-theme-3/40 focus:bg-dark-theme-3/40"/>
                        <svg className="w-[16px] h-[16px] absolute left-[24px] top-[50%] translate-y-[-50%] fill-dark-theme-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/></svg>
                    </div>
                </div>
                <div className='w-content flex flex-row justify-start items-center'>
                    <button className="w-[220px] h-[32px] relative text-[14px] text-normal text-dark-theme-8 leading-none bg-dark-theme-3/80 flex flex-start justify-start items-center rounded-[8px] pl-[38px] pr-[20px] pb-px hover:bg-dark-theme-4/60 hover:drop-shadow-default">
                        폰트 검색하기...
                        <svg className="w-[12px] absolute left-[16px] top-[50%] translate-y-[-50%] fill-dark-theme-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                        <div className="absolute right-[16px] text-[12px] flex flex-row justify-center items-center">
                            <svg className="w-[10px] mr-px fill-dark-theme-8" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><g><path d="M64,48L64,48h-8V32h8c8.836,0,16-7.164,16-16S72.836,0,64,0c-8.837,0-16,7.164-16,16v8H32v-8c0-8.836-7.164-16-16-16 S0,7.164,0,16s7.164,16,16,16h8v16h-8l0,0l0,0C7.164,48,0,55.164,0,64s7.164,16,16,16c8.837,0,16-7.164,16-16l0,0v-8h16v7.98 c0,0.008-0.001,0.014-0.001,0.02c0,8.836,7.164,16,16,16s16-7.164,16-16S72.836,48.002,64,48z M64,8c4.418,0,8,3.582,8,8 s-3.582,8-8,8h-8v-8C56,11.582,59.582,8,64,8z M8,16c0-4.418,3.582-8,8-8s8,3.582,8,8v8h-8C11.582,24,8,20.417,8,16z M16,72 c-4.418,0-8-3.582-8-8s3.582-8,8-8l0,0h8v8C24,68.418,20.418,72,16,72z M32,48V32h16v16H32z M64,72c-4.418,0-8-3.582-8-8l0,0v-8 h7.999c4.418,0,8,3.582,8,8S68.418,72,64,72z"/></g></svg>
                            <span className="text-[12px] leading-none">K</span>
                        </div>
                    </button>
                    <div className='w-px h-[20px] rounded-full mx-[10px] bg-dark-theme-4'></div>
                    <div className='w-content relative flex flex-row justify-start items-center'>
                        <input type='checkbox' id='select-lang' onChange={handleLangChange} className="select hidden"/>
                        <label ref={refLangSelect} htmlFor='select-lang' className="h-[32px] relative flex flex-row justify-center items-center text-[14px] text-dark-theme-8 leading-none px-[20px] border border-dark-theme-5 rounded-full cursor-pointer fill-dark-theme-8 hover:bg-blue-theme-bg hover:border-blue-theme-border hover:text-dark-theme-9 hover:fill-dark-theme-9 hover:drop-shadow-default">
                            <div className='w-[100%] h-[100%] absolute z-10'></div>
                            <button className="w-[100%] h-[100%] flex flex-row justify-center items-center text-inherit leading-none text-[14px]">
                                언어 선택
                                <svg className="w-[8px] rotate-180 ml-[12px] fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/></svg>
                            </button>
                        </label>
                        <div ref={refLangOption} id="option-lang" className='option w-[128px] absolute z-2 left-[-7px] top-[40px] border border-blue-theme-border rounded-[12px] flex flex-col justify-start items-start px-[16px] py-[22px] bg-blue-theme-bg drop-shadow-default'>
                            <input type='radio' id="option-lang-all" name="option-lang" className="option-input hidden" defaultChecked/>
                            <div className='flex flex-row justify-start items-center mb-[16px]'>
                                <label htmlFor='option-lang-all'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">전체</span>
                            </div>
                            <input type='radio' id="option-lang-kr" name="option-lang" className="option-input hidden"/>
                            <div className='flex flex-row justify-start items-center mb-[16px]'>
                                <label htmlFor='option-lang-kr'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">한국어</span>
                            </div>
                            <input type='radio' id="option-lang-en" name="option-lang" className="option-input hidden"/>
                            <div className='flex flex-row justify-start items-center'>
                                <label htmlFor='option-lang-en'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">영어</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-content relative flex flex-row justify-start items-center ml-[8px]'>
                        <input type='checkbox' id='select-type' onChange={handleTypeChange} className="select hidden"/>
                        <label ref={refTypeSelect} htmlFor='select-type' className="h-[32px] relative flex flex-row justify-center items-center text-[14px] text-dark-theme-8 leading-none px-[20px] border border-dark-theme-5 rounded-full cursor-pointer fill-dark-theme-8 hover:bg-blue-theme-bg hover:border-blue-theme-border hover:text-dark-theme-9 hover:fill-dark-theme-9 hover:drop-shadow-default">
                            <div className='w-[100%] h-[100%] absolute z-10'></div>
                            <button className="w-[100%] h-[100%] flex flex-row justify-center items-center text-inherit leading-none text-[14px]">
                                폰트 형태
                                <svg className="w-[8px] rotate-180 ml-[12px] fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/></svg>
                            </button>
                        </label>
                        <div ref={refTypeOption} id="option-type" className='option w-[128px] absolute z-2 left-[-7px] top-[40px] border border-blue-theme-border rounded-[12px] flex flex-col justify-start items-start px-[16px] py-[22px] bg-blue-theme-bg drop-shadow-default'>
                            <input type='radio' id="option-type-sans-serif" name="option-type" className="option-input hidden" defaultChecked/>
                            <div className='flex flex-row justify-start items-center mb-[16px]'>
                                <label htmlFor='option-type-sans-serif'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">고딕</span>
                            </div>
                            <input type='radio' id="option-type-serif" name="option-type" className="option-input hidden"/>
                            <div className='flex flex-row justify-start items-center'>
                                <label htmlFor='option-type-serif'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">명조</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-px h-[20px] rounded-full mx-[10px] bg-dark-theme-4'></div>
                    <div className='w-content relative flex flex-row justify-start items-center'>
                        <input type='checkbox' id='select-sort' onChange={handleSortChange} className="select hidden"/>
                        <label ref={refSortSelect} htmlFor='select-sort' className="h-[32px] relative flex flex-row justify-center items-center text-[14px] text-dark-theme-8 leading-none px-[20px] border border-dark-theme-5 rounded-full cursor-pointer fill-dark-theme-8 hover:bg-blue-theme-bg hover:border-blue-theme-border hover:text-dark-theme-9 hover:fill-dark-theme-9 hover:drop-shadow-default">
                            <div className='w-[100%] h-[100%] absolute z-10'></div>
                            <button className="w-[100%] h-[100%] flex flex-row justify-center items-center text-inherit leading-none text-[14px]">
                                {sort === "date" ? "최신순" : "이름순"}
                                <svg className="w-[8px] rotate-180 ml-[12px] fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/></svg>
                            </button>
                        </label>
                        <div ref={refSortOption} id="option-sort" className='option w-[114px] absolute z-2 left-[-7px] top-[40px] border border-blue-theme-border rounded-[12px] flex flex-col justify-start items-start px-[16px] py-[22px] bg-blue-theme-bg drop-shadow-default'>
                            <input onChange={handleSortOptionChange} type='radio' id="option-sort-latest" name="option-sort" value="date" className="option-input hidden" defaultChecked={sort === "date" ? true : false}/>
                            <div className='flex flex-row justify-start items-center mb-[16px]'>
                                <label htmlFor='option-sort-latest'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">최신순</span>
                            </div>
                            <input onChange={handleSortOptionChange} type='radio' id="option-sort-name" name="option-sort" value="name" className="option-input hidden" defaultChecked={sort === "name" ? true : false}/>
                            <div className='flex flex-row justify-start items-center'>
                                <label htmlFor='option-sort-name'>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                    <svg className='w-[18px] mr-[10px] cursor-pointer fill-blue-theme-border' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                </label>
                                <span className="text-[14px] text-dark-theme-9 leading-tight">이름순</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 메인 */}
            <FontBox sort={sort}/>
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    try {
        const sort = ctx.query.sort === "" || ctx.query.sort === undefined ? "date" : (ctx.query.sort === "name" ? "name" : "date");
        return {
            props: {
                paramsSort: sort
            }
        }
    }
    catch (error) {
        console.log(error);
        return { props: {} }
    }
}

export default Index;