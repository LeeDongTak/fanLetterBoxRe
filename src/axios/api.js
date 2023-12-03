import axios from "axios";

const intance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

intance.interceptors.request.use(
    // 요청을 보내기 전 수행되는 함수
    function(config){
        console.log("인터셉터 요청 성공!")
        return config
    },

    // 오류 요청을 보내기 전 수행되는 함수
    function(error){
        console.log("인터셉터 요청 오류")
        return Promise.reject(error)
    }
)

intance.interceptors.response.use(
     // 응답을 내보내기 전 수행되는 함수
     function(responce){
        console.log("인터셉터가 응답을 받았습니다.")
        return responce
     },

     // 오류 응답을 내보내기 전 수행되는 함수
     function(error){
        console.log("인터셉터 응답 오류 발생")
        return Promise.reject(error)
     }
) 
export default intance