export const buscarDDDCallBack = async (ddd, callBack)=>{
    let urlAPI = `https://brasilapi.com.br/api/ddd/v1/${ddd}`;
    fetch(urlAPI,{
        method: "GET"
    })
    .then(resposta =>{
        if(!resposta.ok){
            throw new Error("Falha no fetch");
        }
        return resposta.json();
    })
    .then(resposta => callBack(resposta))
    .catch(error =>{console.error('Error:',error);});
}