// Ensure a single global `URL_BASE` to avoid redeclaration when multiple scripts load.
if (typeof URL_BASE === 'undefined') {
    var URL_BASE = 'https://api.escuelajs.co/api/v1';
}

// *-*-*- FUNÇÃO DE OLHINHO MÁGICO PARA MOSTRAR/ESCONDER SENHA *-*-*-*-
function mostarsenha(){
	let password = document.getElementById('password');
	let confirmpassword = document.getElementById('confirm-password');
	let eyeicon = document.getElementById('eyeicon');
    let eyeiconconfirm = document.getElementById('eyeicon-confirm');
	

	if (!password || !eyeicon) {
		return;
	}

    eyeicon.onclick = function(){
		if(password.type == 'password'){
			password.type = 'text';
			eyeicon.src = '../src/assets/icons/eye-open.svg';
		} else{
			password.type = 'password';
			eyeicon.src = '../src/assets/icons/eye-close.svg';
		}
	}

    if (confirmpassword && eyeiconconfirm) {
        eyeiconconfirm.onclick = function(){
            if(confirmpassword.type == 'password'){
                confirmpassword.type = 'text';
                eyeiconconfirm.src = '../src/assets/icons/eye-open.svg';
            }
            else {
                confirmpassword.type = 'password';
                eyeiconconfirm.src = '../src/assets/icons/eye-close.svg';
            }
        }
    }

}

mostarsenha();

async function validarFormularioCadastro() {
    const emailValido = await validarEmailNoCampo();
    const senha = document.getElementById('password');
    const confirmarSenha = document.getElementById('confirm-password');

    if (!emailValido || !senha || !confirmarSenha) {
        return false;
    }

    if (!senha.checkValidity() || !confirmarSenha.checkValidity()) {
        senha.reportValidity();
        confirmarSenha.reportValidity();
        return false;
    }

    if (senha.value !== confirmarSenha.value) {
        exibirMensagem('As senhas não coincidem. Por favor, verifique.', 'erro');
        senha.style.borderColor = '#ff4d4d';
        confirmarSenha.style.borderColor = '#ff4d4d';
        return false;
    }

    senha.style.borderColor = '';
    confirmarSenha.style.borderColor = '';
    return true;
}



// *-*-*- FUNÇÃO DE EXIBIÇÃO DE MENSAGEM *-*-*-*-
function exibirMensagem(texto, tipo = 'erro') {
    const msgElement = document.getElementById('error-message');

    if (msgElement){
        msgElement.textContent = texto;
        msgElement.style.color = tipo === 'erro' ? '#ff4d4d' : '#10b981'; // Não definir cor no css
        msgElement.style.display = 'block' ;

        setTimeout(() => {
            msgElement.style.display = 'none';
        }, 3000); // Rever o tempo de exibição da mensagem depois
    }
}

// *-*-*- FUNÇÕES DE VALIDAÇÃO DE E-MAIL *-*-*-*-
function normalizarEmail(email) {
    return email.trim().toLowerCase();

}

function ehEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}


// -*-*-*- VERIFICAÇÃO DE DISPONIBILIDADE DE E-MAIL *-*-*-*-
async function verificarDisponibilidadeEmail(email) {
    
    const emailNormalizado = normalizarEmail(email);

    const response = await fetch(`${URL_BASE}/users/is-available`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailNormalizado })
    });

    const data = await response.json();

    return {
        ok: response.ok,
        isAvailable: data?.isAvailable === false // lembrar de trocar para isAvailable === false quando for pra produção
    };
}


async function validarEmailNoCampo() {
    if (!emailInput) {
        return true;
    }

    const email = normalizarEmail(emailInput.value);

    if (!email) {
        return true;
    }

    if (!ehEmailValido(email)) {
        exibirMensagem('Informe um e-mail válido.', 'erro');
        emailInput.style.borderColor = '#ff4d4d';
        emailInput.setCustomValidity('Informe um e-mail válido.');
        emailInput.reportValidity();
        return false;
    }

    emailInput.value = email;

    try {
        const { ok, isAvailable } = await verificarDisponibilidadeEmail(email);

        if (!ok) {
            exibirMensagem('Não foi possível verificar a disponibilidade do e-mail.', 'erro');
            emailInput.style.borderColor = '#f39c12';
            emailInput.setCustomValidity('Não foi possível verificar este e-mail agora.');
            emailInput.reportValidity();
            return false;
        }

        if (!isAvailable) {
            exibirMensagem('Este e-mail já está cadastrado. Use outro e-mail.', 'erro');
            emailInput.style.borderColor = '#ff4d4d';
            emailInput.setCustomValidity('Este e-mail já está cadastrado.');
            emailInput.reportValidity();
            return false;
        }

        emailInput.style.borderColor = '#2ecc71';
        emailInput.setCustomValidity('');
        return true;
    } catch (error) {
        exibirMensagem('Erro ao verificar e-mail. Tente novamente.', 'erro');
        emailInput.setCustomValidity('Não foi possível verificar este e-mail agora.');
        emailInput.reportValidity();
        console.error('Erro na verificação de e-mail:', error);
        return false;
    }
}

const emailInput = document.getElementById('reg-email');

if (emailInput){
    // validacao centralizada no blur
    emailInput.addEventListener('blur', async () => {
        await validarEmailNoCampo();
    });

    // limpa estado de erro ao digitar novamente.
    emailInput.addEventListener('input', () => {
        emailInput.setCustomValidity('');
        emailInput.style.borderColor = '';
    });
}

async function renovarTokens() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        return false;
    }

    try {
        const response = await fetch(`${URL_BASE}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        if (!data?.access_token || !data?.refresh_token) {
            return false;
        }

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        return true;
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        return false;
    }
}


const registerForm = document.getElementById('register-form');
if(registerForm){
    
    // -*-*-*- FUNÇÃO DE CADASTRO *-*-*-*-
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

        const formularioValido = await validarFormularioCadastro();
        if (!formularioValido) {
                return;
            }

      // Dados do usuário a ser cadastrado
      const Data = {
        name: document.getElementById('reg-name').value,
        email: normalizarEmail(document.getElementById('reg-email').value),
        password: document.getElementById('password').value,
        avatar: "https://picsum.photos/80"
      };

    


    try{

        // -*-*-*-*- REQUISIÇÃO PARA CADASTRO DE USUÁRIO -*-*-*-*-


        const user = await fetch(`${URL_BASE}/users`,{
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(Data)
        })


    
        const data = await user.json();
    
        if(user.ok){
            localStorage.setItem('userId', data.id)
            localStorage.setItem('users', JSON.stringify(data))
            exibirMensagem('Usuário criado com sucesso! Agora faça o login', 'sucesso');
            console.log('Usuário', data); // lembrar de apagar depois

            // Time para o usuário ler a mensagem antes de redirecionar para a página de login
            setTimeout(() => {
                window.location.href = '../pages/login.html';
            }, 3000);    
        }

        else{
            exibirMensagem('Erro no cadastro: ' + data.message, 'erro');
            console.error('Erro no cadastro:', data); // lembrar de apagar depois
        }
    
    } catch (error) {
            exibirMensagem('Erro na requisição. Verifique a sua conexão.', 'erro');
            console.error('Erro na requisição:', error); // lembrar de apagar depois
        }
    
    });

};


const loginForm = document.getElementById('login-form');
if (loginForm) {

    // -*-*-*- FUNÇÃO DE LOGIN *-*-*-*-
    document.getElementById('login-form').addEventListener('submit', async (event) => {
    
        event.preventDefault();

        // ALTERADO: valida formato e normaliza e-mail antes do login.
        const email = normalizarEmail(document.getElementById('log-email').value);

        if (!ehEmailValido(email)) {
            exibirMensagem('Informe um e-mail válido.', 'erro');
            return;
        }
    
        const loginData = {
            email,
            password: document.getElementById('password').value
        };
    
        // Tratamento de erro
        try {
            const response = await fetch(`${URL_BASE}/auth/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginData)
            });
    
            const data = await response.json();
    
            if(response.ok){
                // -*-*-*-*- GUARDANDO O TOKEN NO LOCALSTORAGE -*-*-*-*-
    
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                
                exibirMensagem('Login realizado! Token salvo.', 'sucesso');

                console.log('Token JWT:', data.access_token); // lembrar de apagar depois
                console.log('Refresh Token:', data.refresh_token); // lembrar de apagar depois

                setTimeout(() => {
                    window.location.href = 'pages/profile.html';
                }, 3000);

            }
            else{
                exibirMensagem('Falha no login: Verifique suas credenciais.', 'erro');
                console.error('Falha no login:', data.message); // lembrar de apagar depois
            }
    
        }catch(error){
            exibirMensagem('Erro no servidor ao tentar login.', 'erro');
            console.error('Erro no login:', error); // lembrar de apagar depois
        }
    
    });

}

// --- BUSCAR PERFIL (ROTA PROTEGIDA) ---
async function buscarDadosUsuario() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        fazerLogout();
        return;
    }


    try {
        const response = await fetch(`${URL_BASE}/auth/profile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('userId', user.id);

            // Atualiza o nome na interface
            const welcomeMsg = document.getElementById('welcome-message');
            if(welcomeMsg) welcomeMsg.innerHTML = `Olá, ${user.name}!`;
            

            // Atualiza foto se existir algum avatar
            const avatarImg = document.getElementById('user-avatar');
            if (avatarImg) avatarImg.src = user.avatar;

        } else if (response.status === 401 || response.status === 403) {
            const renovado = await renovarTokens();

            if (renovado) {
                await buscarDadosUsuario();
                return;
            }

            exibirMensagem('Sessão expirada ou inválida. Faça login novamente.', 'erro');
            fazerLogout();
        } else {
            exibirMensagem('Erro ao carregar perfil. Tente novamente.', 'erro');
        }

    } catch (error) {
        exibirMensagem('Erro ao carregar perfil. Tente novamente.', 'erro');
        console.error('Erro ao carregar perfil:', error);
    }
}
// -*-*-*- FUNÇÃO DE LOGOUT COM LIMPEZA DE DADOS *-*-*-*-

function fazerLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('users');
    const redirectTo = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
    window.location.href = redirectTo;
}


document.addEventListener('DOMContentLoaded', () => {
    const profileElements = document.getElementById('welcome-message') && document.getElementById('user-avatar');

    if (profileElements) {
        buscarDadosUsuario();
    }
});
