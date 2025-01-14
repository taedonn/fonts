// react
import { useState } from "react";

// next
import { NextSeo } from "next-seo";

// next-auth
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

// components
import Button from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SelectBox from "@/components/selectbox";
import TextArea from "@/components/textarea";
import TextInput from "@/components/textinput";

const NoticesAdd = ({ params }: any) => {
  const { theme, userAgent, user } = params;

  // 디바이스 체크
  const isMac: boolean = userAgent.includes("Mac OS") ? true : false;

  // states
  const [titleAlert, setTitleAlert] = useState<string>("");
  const [contentAlert, setContentAlert] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlerted, setIsAlerted] = useState<string>("");
  const [option, setOption] = useState<string>("service");

  // onChange
  const handleTitleChange = () => {
    setTitleAlert("");
  };
  const handleContentChange = () => {
    setContentAlert("");
  };
  const handleSelectBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  // submit
  const handleSubmit = async () => {
    // 변수
    const title = document.getElementById("title") as HTMLInputElement;
    const content = document.getElementById("content") as HTMLTextAreaElement;

    if (title.value === "") {
      setTitleAlert("empty");
      window.scrollTo({ top: title.offsetTop, behavior: "smooth" });
    } else if (content.value === "") {
      setContentAlert("empty");
      window.scrollTo({ top: content.offsetTop, behavior: "smooth" });
    } else {
      setIsLoading(true);

      const url = "/api/admin/notices";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          notice_type: option,
          notice_title: title.value,
          notice_content: content.value,
        }),
      };

      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.msg);
          uploadOnSuccess();
        })
        .catch((err) => {
          console.log(err);
          uploadOnFail();
        });
    }
    setIsLoading(false);
  };

  /** 업로드 실패 시 */
  const uploadOnFail = () => {
    // 초기화
    setIsAlerted("fail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** 업로드 성공 시 */
  const uploadOnSuccess = () => {
    // 초기화
    resetForm();
    setIsAlerted("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** 업로드 성공 시 폼 초기화 */
  const resetForm = () => {
    // 변수
    const title = document.getElementById("title") as HTMLInputElement;
    const content = document.getElementById("content") as HTMLTextAreaElement;

    // 초기화
    title.value = "";
    content.value = "";
  };

  /** 알럿 닫기 */
  const handleAlertClose = () => {
    setIsAlerted("");
  };

  return (
    <>
      {/* Head 부분*/}
      <NextSeo title="공지 추가 | 폰트 아카이브" />

      {/* 헤더 */}
      <Header isMac={isMac} theme={theme} user={user} />

      {/* 메인 */}
      <div className="w-full px-4 flex flex-col justify-center items-center text-l-2 dark:text-white">
        <div className="max-w-[45rem] w-full flex flex-col justify-center my-16 lg:my-24 mt-8 lg:mt-16">
          <h2 className="text-2xl font-bold mb-6">공지 추가</h2>
          <div id="is-issued" className="w-full">
            {isAlerted === "success" ? (
              <div className="w-full h-10 px-2.5 mb-3 flex justify-between items-center rounded-lg border-2 border-h-1 dark:border-f-8 text-xs bg-h-1/20 dark:bg-f-8/20">
                <div className="flex items-center">
                  <i className="text-sm text-h-1 dark:text-f-8 fa-regular fa-bell"></i>
                  <div className="ml-2">공지 추가에 성공했습니다.</div>
                </div>
                <div
                  onClick={handleAlertClose}
                  className="flex justify-center items-center cursor-pointer"
                >
                  <i className="text-sm fa-solid fa-xmark"></i>
                </div>
              </div>
            ) : isAlerted === "fail" ? (
              <div className="w-full h-10 px-2.5 mb-3 flex justify-between items-center rounded-lg border-2 border-h-r text-xs bg-h-r/20">
                <div className="flex items-center">
                  <i className="text-sm text-h-r fa-regular fa-bell"></i>
                  <div className="ml-2">
                    공지 추가에 실패했습니다. 잠시 후 다시 시도해 주세요.
                  </div>
                </div>
                <div
                  onClick={handleAlertClose}
                  className="flex justify-center items-center cursor-pointer"
                >
                  <i className="text-sm fa-solid fa-xmark"></i>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full p-5 rounded-lg bg-l-e dark:bg-d-3 drop-shadow-default dark:drop-shadow-dark">
            <div className="w-full flex flex-col">
              <SelectBox
                title="공지 종류"
                icon="bi-send"
                value="type"
                select={option}
                options={[
                  { value: "service", name: "서비스" },
                  { value: "font", name: "폰트" },
                ]}
                optionChange={handleSelectBoxChange}
              />
              <TextInput
                onchange={handleTitleChange}
                state={titleAlert}
                stateMsg={[
                  { state: "", msg: "" },
                  { state: "empty", msg: "제목을 입력해 주세요." },
                ]}
                id="title"
                tabindex={1}
                placeholder="공지 제목을 입력해 주세요."
                label="공지 제목"
                marginTop={2}
              />
              <TextArea
                onchange={handleContentChange}
                state={contentAlert}
                stateMsg={[
                  { state: "", msg: "" },
                  { state: "empty", msg: "내용을 입력해 주세요." },
                ]}
                id="content"
                tabindex={2}
                placeholder="공지 내용을 입력해 주세요."
                label="공지 내용"
                marginTop={2}
              />
            </div>
            <Button marginTop={1}>
              <button onClick={handleSubmit} className="w-full h-full">
                {isLoading === true ? (
                  <span className="loader border-2 border-h-e dark:border-d-6 border-b-h-1 dark:border-b-f-8 w-4 h-4"></span>
                ) : (
                  "추가하기"
                )}
              </button>
            </Button>
          </div>
        </div>
      </div>

      {/* 풋터 */}
      <Footer />
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  try {
    // 쿠키 체크
    const { theme } = ctx.req.cookies;

    // 디바이스 체크
    const userAgent = ctx.req
      ? ctx.req.headers["user-agent"]
      : navigator.userAgent;

    // 유저 정보 불러오기
    const session: any = await getServerSession(ctx.req, ctx.res, authOptions);

    if (
      session === null ||
      session.user === undefined ||
      session.user.id !== 1
    ) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          params: {
            theme: theme ? theme : "light",
            userAgent: userAgent,
            user: session === null ? null : session.user,
          },
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export default NoticesAdd;
