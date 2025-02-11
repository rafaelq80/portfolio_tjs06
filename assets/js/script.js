// Seleciona a Seção about
const sobre = document.querySelector("#about");

// Seleciona o Formulário
const formulario = document.querySelector("#formulario");

// Expressão Regular para validar o e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para consumir os dados do Github
async function getApiGithub(){
    try{

        // Envia a Requisição HTTP
        const dadosPerfil = await fetch(`https://api.github.com/users/rafaelq80`);
        
        // Converte a resposta para o formato JSON
        const perfil = await dadosPerfil.json();

        // Cria o conteúdo da Seção About com os dados da Reposta da Requisição
        let conteudo = `
        
             <!-- Imagem da Seção Sobre -->
            <img src="${perfil.avatar_url}" alt="Foto do Perfil do Github - ${perfil.name}">

            <!-- Texto da Seção Sobre -->
            <article id="about_texto">
                <h2>Sobre mim</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In nihil magni doloremque sint, qui facere
                    fugit sequi optio molestiae sunt! Maiores sapiente atque nulla mollitia earum delectus nostrum natus
                    architecto?</p>

                <!-- Detalhes do Github -->
                <div id="about_github" class="flex sobre_github">
                    <a href="${perfil.html_url}" target="_blank" class="botao">
                        Github
                    </a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
                </div>

            </article>
        
        `;

        // Adiciona o conteúdo na página HTML, na Seção About
        sobre.innerHTML += conteudo;

    }catch(error){
        console.error(error);
    }
}

// Validação do Formulário antes do envio
formulario.addEventListener("submit", function(event){
    
    // Impede que o formulário seja enviado antes da validação
    event.preventDefault();

    // Seleciona os elementos do campo nome (input e span)
    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome");

    // Verifica se o campo possui menos de 3 caracteres
    if(campoNome.value.length < 3){

        // Caso afirmativo, exibe a mensagem de erro no span
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres.";

        // Mantém o cursor no campo
        campoNome.focus();

        // Finaliza a função
        return;
    }else{
        // Senão, limpa o span
        txtNome.innerHTML = "" ;
    }

    // Seleciona os elementos do campo email (input e span)
    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail");

    // Valida através da Expressão Regular se o usuário digitou um e-mail válido
    if(!campoEmail.value.match(emailRegex)){

         // Caso afirmativo, exibe a mensagem de erro no span
        txtEmail.innerHTML = "Digite um e-mail válido.";
        campoEmail.focus();
        return;
    }else{
        txtEmail.innerHTML = "" ;
    }

    // Seleciona os elementos do campo assunto (input e span)
    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto");

    // Verifica se o campo possui pelo menos 5 caracteres
    if(campoAssunto.value.length < 5){

         // Caso afirmativo, exibe a mensagem de erro no span
        txtAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres.";
        campoAssunto.focus();
        return;
    }else{
        txtAssunto.innerHTML = "" ;
    }

    // Envia o formulário caso os 3 campos sejam validados
    formulario.submit();
    
});

// Executa a função ao carregar o script, gerando a Seção About
getApiGithub();