// next hooks
import Link from 'next/link';
import { NextSeo } from 'next-seo';

// react hooks
import { useState } from 'react';

// components
import Header from "@/components/header";
import Alert from '@/components/alert';

const Regist = ({params}: any) => {
    // 디바이스 체크
    const isMac: boolean = params.userAgent.includes("Mac OS") ? true : false;

    // 빈 함수
    const emptyFn = () => { return; }

    // 폼 유효성 검사 state
    const [nameChk, setNameChk] = useState<string>("");
    const [nameVal, setNameVal] = useState<string>("");
    const [idChk, setIdChk] = useState<string>("");
    const [idVal, setIdVal] = useState<string>("");
    const [pwChk, setPwChk] = useState<string>("");
    const [pwVal, setPwVal] = useState<string>("");
    const [pwConfirmChk, setPwConfirmChk] = useState<string>("");
    const [pwConfirmVal, setPwConfirmVal] = useState<string>("");
    const [termsChk, setTermsChk] = useState<boolean>(false);
    const [privacyChk, setPrivacyChk] = useState<boolean>(false);
    const [alertDisplay, setAlertDisplay] = useState<string>("");
    const [alertText, setAlertText] = useState<string>("");

    /** 폼 서밋 전 유효성 검사 */
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // 서밋 전 유효성 검사를 위해 서밋 이벤트 막기
        e.preventDefault();

        // 유효성 검사
        if (handleValidateChk()) {
            // 약관 동의 체크
            if (handleTermsAndPrivacyChk()) {
                alert("성공");
            } else {
                setAlertDisplay('show');
                setAlertText('약관에 동의해 주세요.');
            }
        }
    }

    /** 유효성 검사 */
    const handleValidateChk = () => {
        // 유효성 패턴
        const emailPattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/; // 이메일 패턴
        const pwPattern = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/; // 비밀번호 패턴

        // 이름 유효성 검사
        if (nameVal=== '') { setNameChk('empty'); }

        // 이메일 유효성 검사
        if (idVal === '') { setIdChk('empty'); }
        else if (!emailPattern.test(idVal)) { setIdChk('wrong-pattern'); }

        // 비밀번호 유효성 검사
        if (pwVal === '') { setPwChk('empty'); }
        else if (!pwPattern.test(pwVal)) { setPwChk('wrong-pattern'); }

        // 비밀번호 재입력 유효성 검사
        if (pwConfirmVal === '') { setPwConfirmChk('empty'); }
        else if (pwConfirmVal !== pwConfirmVal) { setPwConfirmChk('unmatch'); }

        // 유효성 검사 결과 return
        if (nameVal !== '' && idVal !== '' && emailPattern.test(idVal) && pwVal !== '' && pwPattern.test(pwVal) && pwConfirmVal !== '' && pwConfirmVal === pwVal) { return true; } 
        else { return false; }
    }

    /** 약관 동의 체크 */
    const handleTermsAndPrivacyChk = () => {
        if (termsChk && privacyChk) { return true; }
        else { return false; }
    }

    /** 유효성 검사 후 다시 이름 입력 시 경고 메시지 해제 */
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameVal(e.target.value);
        setNameChk('');
    }

    /** 유효성 검사 후 다시 아이디 입력 시 경고 메시지 해제 */
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdVal(e.target.value);
        setIdChk('');
    }

    /** 유효성 검사 후 다시 비밀번호 입력 시 경고 메시지 해제 */
    const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwVal(e.target.value);
        setPwChk('');
    }

    /** 유효성 검사 후 다시 비밀번호 재입력 입력 시 경고 메시지 해제 */
    const handlePwConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwConfirmVal(e.target.value);
        setPwConfirmChk('');
    }

    /** 서비스 이용약관 체크 이벤트 */
    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) { setTermsChk(true); }
        else { setTermsChk(false); }
    }

    /** 개인정보 처리방침 체크 이벤트 */
    const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) { setPrivacyChk(true); }
        else { setPrivacyChk(false); }
    }

    /** 알럿창 닫기 */
    const handleAlertClose = () => { setAlertDisplay('hide'); }

    return (
        <>
            {/* Head 부분*/}
            <NextSeo 
                title={"회원가입 · 폰트 아카이브"}
                description={"회원가입 - 상업용 무료 한글 폰트 아카이브"}
            />

            {/* 헤더 */}
            <Header
                isMac={isMac}
                theme={params.theme}
                page={"login"}
                lang={""}
                type={""}
                sort={""}
                source={""}
                handleTextChange={emptyFn}
                handleLangOptionChange={emptyFn}
                handleTypeOptionChange={emptyFn}
                handleSortOptionChange={emptyFn}
                handleSearch={emptyFn}
            />

            {/* 메인 */}
            <div className='w-[100%] flex flex-col justify-center items-center mt-[60px] tlg:mt-[56px]'>
                <div className='w-[360px] flex flex-col justify-center items-start mt-[100px] mb-[40px] tlg:mt-[40px]'>
                    <h2 className='text-[20px] tlg:text-[18px] text-theme-4 dark:text-theme-9 font-medium mb-[12px] tlg:mb-[8px]'>회원가입</h2>
                    <form onSubmit={handleOnSubmit} id='register-form' className='w-[100%] p-[20px] rounded-[8px] text-theme-10 dark:text-theme-9 bg-theme-5 dark:bg-theme-3 drop-shadow-default dark:drop-shadow-dark'>
                        <label htmlFor='id' className='block text-[14px] ml-px'>이름</label>
                        <input onChange={handleNameChange} type='text' id='name' tabIndex={1} autoComplete='on' placeholder='홍길동' className={`${nameChk === '' ? 'border-theme-4 focus:border-theme-yellow dark:border-theme-blue-2 focus:dark:border-theme-blue-1' : 'border-theme-red focus:border-theme-red dark:border-theme-red focus:dark:border-theme-red'} w-[100%] text-[14px] mt-[6px] px-[14px] py-[8px] rounded-[8px] border-[2px] placeholder-theme-7 dark:placeholder-theme-6 bg-theme-4 dark:bg-theme-blue-2 autofill:bg-theme-4 autofill:dark:bg-theme-blue-2`}/>
                        {
                            nameChk === ''
                            ? <></>
                            : <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>이름을 입력해 주세요.</span>
                        }
                        <label htmlFor='name' className='block text-[14px] ml-px mt-[24px]'>이메일</label>
                        <input onChange={handleIdChange} type='text' id='id' tabIndex={2} autoComplete='on' placeholder='example@example.com' className={`${idChk === '' ? 'border-theme-4 focus:border-theme-yellow dark:border-theme-blue-2 focus:dark:border-theme-blue-1' : 'border-theme-red focus:border-theme-red dark:border-theme-red focus:dark:border-theme-red'} w-[100%] text-[14px] mt-[6px] px-[14px] py-[8px] rounded-[8px] border-[2px] placeholder-theme-7 dark:placeholder-theme-6 bg-theme-4 dark:bg-theme-blue-2 autofill:bg-theme-4 autofill:dark:bg-theme-blue-2`}/>
                        {
                            idChk === ''
                            ? <></>
                            : ( idChk === 'empty'
                                ? <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>이메일을 입력해 주세요.</span>
                                : ( idChk === 'wrong-pattern'
                                    ? <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>이메일 형식이 올바르지 않습니다.</span>
                                    : <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>이미 등록된 이메일입니다.</span>
                                )
                            )
                        }
                        <label htmlFor='pw' className='w-[100%] flex flex-row justify-between items-center text-[14px] ml-px mt-[24px]'>비밀번호</label>
                        <input onChange={handlePwChange} type='password' id='pw' tabIndex={3} autoComplete='on' placeholder='영문, 숫자, 특수문자 포함 8~20자' className={`${pwChk === '' ? 'border-theme-4 focus:border-theme-yellow dark:border-theme-blue-2 focus:dark:border-theme-blue-1' : 'border-theme-red focus:border-theme-red dark:border-theme-red focus:dark:border-theme-red'} w-[100%] text-[14px] mt-[6px] px-[14px] py-[8px] rounded-[8px] border-[2px] placeholder-theme-7 dark:placeholder-theme-6 bg-theme-4 dark:bg-theme-blue-2`}/>
                        {
                            pwChk === ''
                            ? <></>
                            : ( pwChk === 'empty'
                                ? <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>비밀번호를 입력해 주세요.</span>
                                : <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>비밀번호 형식이 올바르지 않습니다.</span>
                            )
                        }
                        <input onChange={handlePwConfirmChange} type='password' id='pw-confirm' tabIndex={4} autoComplete='on' placeholder='비밀번호 재입력' className={`${pwConfirmChk === '' ? 'border-theme-4 focus:border-theme-yellow dark:border-theme-blue-2 focus:dark:border-theme-blue-1' : 'border-theme-red focus:border-theme-red dark:border-theme-red focus:dark:border-theme-red'} w-[100%] text-[14px] mt-[6px] px-[14px] py-[8px] rounded-[8px] border-[2px] placeholder-theme-7 dark:placeholder-theme-6 bg-theme-4 dark:bg-theme-blue-2`}/>
                        {
                            pwConfirmChk === ''
                            ? <></>
                            : ( pwConfirmChk === 'empty'
                                ? <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>비밀번호를 다시 입력해 주세요.</span>
                                : <span className='block text-[12px] text-theme-red mt-[4px] ml-[16px]'>비밀번호가 일치하지 않습니다.</span>
                            )
                        }
                        <div className='w-[100%] h-px my-[24px] bg-theme-4/80 dark:bg-theme-blue-2/80'></div>
                        <div className='w-[100%] flex flex-col justify-start items-start'>
                            <div className='w-[100%] flex flex-row justify-between items-center'>
                                <div className='flex flex-row justify-start items-center'>
                                    <input onChange={handleTermsChange} type='checkbox' id='terms-check' className='hidden'/>
                                    <label htmlFor='terms-check' className='w-[20px] h-[20px] flex flex-row justify-center items-center cursor-pointer'>
                                        <svg className='uncheck w-[16px] fill-theme-yellow dark:fill-theme-blue-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                        <svg className='check w-[16px] fill-theme-yellow dark:fill-theme-blue-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                    </label>
                                    <p className='text-[13px] text-theme-10 dark:text-theme-9 mt-px ml-[6px]'>서비스 이용약관 (필수)</p>
                                </div>
                                <Link href="/terms" target='_blank' className='text-[12px] text-theme-6 dark:text-theme-7 flex flex-row justify-center items-center hover:underline tlg:hover:no-underline'>전문보기</Link>
                            </div>
                            <div className='w-[100%] flex flex-row justify-between items-center mt-[8px]'>
                                <div className='flex flex-row justify-start items-center'>
                                    <input onChange={handlePrivacyChange} type='checkbox' id='privacy-check' className='hidden'/>
                                    <label htmlFor='privacy-check' className='w-[20px] h-[20px] flex flex-row justify-center items-center cursor-pointer'>
                                        <svg className='uncheck w-[16px] fill-theme-yellow dark:fill-theme-blue-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
                                        <svg className='check w-[16px] fill-theme-yellow dark:fill-theme-blue-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>
                                    </label>
                                    <p className='text-[13px] text-theme-10 dark:text-theme-9 mt-px ml-[6px]'>개인정보 처리방침 (필수)</p>
                                </div>
                                <Link href="/privacy" target='_blank' className='text-[12px] text-theme-6 dark:text-theme-7 flex flex-row justify-center items-center hover:underline tlg:hover:no-underline'>전문보기</Link>
                            </div>
                        </div>
                        <button id='submit-button' className='w-[100%] h-[40px] rounded-[8px] mt-[24px] text-[14px] font-medium text-theme-4 dark:text-theme-blue-2 bg-theme-yellow/80 hover:bg-theme-yellow tlg:hover:bg-theme-yellow/80 dark:bg-theme-blue-1/80 hover:dark:bg-theme-blue-1 tlg:hover:dark:bg-theme-blue-1/80'>
                            이메일 인증 후 가입하기
                        </button>
                    </form>
                </div>
            </div>

            {/* Alert 창 */}
            <Alert
                display={alertDisplay}
                text={alertText}
                handleAlertClose={handleAlertClose}
            />
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    try {
        // 필터링 쿠키 체크
        const cookieTheme = ctx.req.cookies.theme === undefined ? "dark" : ctx.req.cookies.theme;

        // 디바이스 체크
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;

        return {
            props: {
                params: {
                    theme: cookieTheme,
                    userAgent: userAgent,
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default Regist;