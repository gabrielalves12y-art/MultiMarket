const URL_BASE = 'https://api.escuelajs.co/api/v1';
const STORAGE_REGISTERED_USERS_KEY = 'registered_users';


// -*-*-*- FUNÇÃO DE EXIBIÇÃO DE MENSAGEM *-*-*-*-

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

function normalizarEmail(email) {
	return email.trim().toLowerCase();
}

function ehEmailValido(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function transformarEmLista(valor) {
	if (!valor) {
		return [];
	}

	if (Array.isArray(valor)) {
		return valor.filter(Boolean);
	}

	return [valor].filter(Boolean);
}

function lerStorageJSON(chave) {
	try {
		return JSON.parse(localStorage.getItem(chave));
	} catch (error) {
		console.error(`Erro ao ler ${chave} do localStorage:`, error);
		return null;
	}
}

function obterUsuariosRegistrados() {
	const usuariosRegistrados = transformarEmLista(lerStorageJSON(STORAGE_REGISTERED_USERS_KEY));

	if (usuariosRegistrados.length > 0) {
		return usuariosRegistrados;
	}

	const usuariosLegados = transformarEmLista(lerStorageJSON('users'));

	if (usuariosLegados.length > 0) {
		localStorage.setItem(STORAGE_REGISTERED_USERS_KEY, JSON.stringify(usuariosLegados));
		return usuariosLegados;
	}

	return [];
}

function salvarUsuarioRegistrado(usuario) {
	const emailNormalizado = normalizarEmail(usuario?.email || '');

	if (!emailNormalizado) {
		return;
	}

	const usuariosRegistrados = obterUsuariosRegistrados().filter((item) => {
		return normalizarEmail(item?.email || '') !== emailNormalizado;
	});

	usuariosRegistrados.push({
		...usuario,
		email: emailNormalizado
	});

	localStorage.setItem(STORAGE_REGISTERED_USERS_KEY, JSON.stringify(usuariosRegistrados));
}

function emailExisteEmUsuarios(usuarios, email) {
	const emailNormalizado = normalizarEmail(email);

	return transformarEmLista(usuarios).some((usuario) => {
		return normalizarEmail(usuario?.email || '') === emailNormalizado;
	});
}

async function buscarUsuariosNaApi() {
	try {
		const response = await fetch(`${URL_BASE}/users?offset=0&limit=1000`);

		if (!response.ok) {
			return {
				ok: false,
				users: []
			};
		}

		const data = await response.json();

		return {
			ok: true,
			users: transformarEmLista(data)
		};
	} catch (error) {
		console.error('Erro ao buscar usuários da API:', error);

		return {
			ok: false,
			users: []
		};
	}
}


// -*-*-*- VERIFICAÇÃO DE DISPONIBILIDADE DE E-MAIL *-*-*-*-
async function verificarDisponibilidadeEmail(email) {
	const emailNormalizado = normalizarEmail(email);
	const usuariosRegistrados = obterUsuariosRegistrados();

	if (emailExisteEmUsuarios(usuariosRegistrados, emailNormalizado)) {
		return {
			ok: true,
			isAvailable: false
		};
	}

	const { ok, users } = await buscarUsuariosNaApi();

	if (!ok) {
		return {
			ok: false,
			isAvailable: false
		};
	}

	return {
		ok: true,
		isAvailable: !emailExisteEmUsuarios(users, emailNormalizado)
	};
}


function limparEstadoCampoEmail() {
	if (!emailInput) {
		return;
	}

	emailInput.setCustomValidity('');
	emailInput.style.borderColor = '';
}



function atualizarEstadoCampoEmail({
	mensagem = '',
	tipo = 'erro',
	borderColor = '',
	customValidity = '',
	reportValidity = false
}) {
	if (!emailInput) {
		return;
	}

	emailInput.style.borderColor = borderColor;
	emailInput.setCustomValidity(customValidity);

	if (mensagem) {
		exibirMensagem(mensagem, tipo);
	}

	if (reportValidity) {
		emailInput.reportValidity();
	}
}

// -*-*-*- FUNÇÃO DE VALIDAÇÃO DE E-MAIL NO CAMPO DE REGISTRO *-*-*-*-
async function validarEmailNoCampo() {
	if (!emailInput) {
		return true;
	}

	const email = normalizarEmail(emailInput.value);

	if (!email) {
		return true;
	}

	limparEstadoCampoEmail();

	// Validção de formato de e-mail
	if (!ehEmailValido(email)) {
		atualizarEstadoCampoEmail({
			mensagem: 'Informe um e-mail válido.',
			tipo: 'erro',
			borderColor: '#ff4d4d',
			customValidity: 'Informe um e-mail válido.',
			reportValidity: true
		});
		return false;
	}

	emailInput.value = email;

	try {
		const { ok, isAvailable } = await verificarDisponibilidadeEmail(email);

		if (!ok) {
			atualizarEstadoCampoEmail({
				mensagem: 'Não foi possível verificar a disponibilidade do e-mail agora. Tente novamente.',
				tipo: 'erro'
			});
			return false;
		}

		if (!isAvailable) {
			atualizarEstadoCampoEmail({
				mensagem: 'Este e-mail já está cadastrado. Use outro e-mail.',
				tipo: 'erro',
				borderColor: '#ff4d4d',
				customValidity: 'Este e-mail já está cadastrado.',
				reportValidity: true
			});
			return false;
		}

		atualizarEstadoCampoEmail({
			mensagem: 'E-mail disponível!',
			tipo: 'sucesso',
			borderColor: '#2ecc71'
		});
		return true;

	} catch (error) {
        console.error('Erro na verificação:', error);
        atualizarEstadoCampoEmail({
			mensagem: 'Erro de conexão ao verificar a disponibilidade do e-mail.',
			tipo: 'erro'
		});
        return false;
    }
}



const emailInput = document.getElementById('reg-email');
if (emailInput){
	
	emailInput.addEventListener('blur', async () => {
		await validarEmailNoCampo();
	});

	
	emailInput.addEventListener('input', () => {
		limparEstadoCampoEmail();
	});
}


const registerForm = document.getElementById('register-form');
if(registerForm){
    
	// -*-*-*- FUNÇÃO DE CADASTRO *-*-*-*-
	registerForm.addEventListener('submit', async (event) => {
	  event.preventDefault();

	  const emailValido = await validarEmailNoCampo();
	  if (!emailValido) {
		return;
	  }

	  // Dados do usuário a ser cadastrado
	  const userData = {
		name: document.getElementById('reg-name').value,
		email: normalizarEmail(document.getElementById('reg-email').value),
		password: document.getElementById('reg-password').value,
		avatar: "https://picsum.photos/80"
	  };

      

	try{

		// -*-*-*-*- REQUISIÇÃO PARA CADASTRO DE USUÁRIO -*-*-*-*-
		const response = await fetch(`${URL_BASE}/users`,{
		  method: 'POST', 
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify(userData)
		});
    
		const data = await response.json();
    
		if(response.ok){
			localStorage.setItem('userId', data.id)
			salvarUsuarioRegistrado(data);
			exibirMensagem('Usuário criado com sucesso! Agora faça o login', 'sucesso');

			// Time para o usuário ler a mensagem antes de redirecionar para a página de login
			setTimeout(() => {
				window.location.href = '../pages/login.html';
			}, 3000);    
		}

		else{
			exibirMensagem('Erro no cadastro: ' + data.message, 'erro');
			console.error('Erro no cadastro:', data);
		}
    
	} catch (error) {
			exibirMensagem('Erro na requisição. Verifique a sua conexão.', 'erro');
			console.error('Erro na requisição:', error);
		}
    
	});

};
