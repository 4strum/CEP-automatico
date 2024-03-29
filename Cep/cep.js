const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const message = document.querySelector('#message');


cep.addEventListener('focusout', async() => {

 try {
    const onluNumber =  /^[0-9]+$/;
    const cepValid =  /^[0-9]{8}$/;

    if(!onluNumber.test(cep.value) || !cepValid.test(cep.value)){
        throw { cep_error: 'cep invalid'}
    }
    
    const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    if(!response.ok){
        throw await response.json();
    }

    const responseCep = await response.json();

    rua.value = responseCep.logradouro;
    bairro.value = responseCep.bairro;
    cidade.value = responseCep.localidade;
    estado.value = responseCep.uf;



    
 } catch (error) {
    if(error.cep_error) {
     message.textContent = error.cep_error;
     setTimeout(() => {
        message.textContent = '';
     }, 5000)
    }
   console.log(error); 
 }


  

})