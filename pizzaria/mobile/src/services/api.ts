import axios from "axios";

const api = axios.create({
    //baseURL: 'http://localhost:3333'  //não hospedamos e pode dar erros..
    baseURL: 'http://172.31.128.1:3333'  //ip da máquina - adaptador ethernet vEthernet (WSL)
})

export {api}