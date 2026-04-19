const URL_BASE = 'https://api.escuelajs.co/api/v1';


// -*-*-*- FUNÇÃO DE EXIBIÇÃO DE MENSAGEM *-*-*-*-

function exibirMensagem(texto, tipo = 'erro') {
	const msgElement = document.getElementById('error-message');

	if (msgElement){
		msgElement.textContent = texto;
		msgElement.style.color = tipo === 'erro' ? '#ff4d4d' : '#10b981'; // Não definir cor no css
		msgElement.style.display = 'block' ;

		setTimeout(() => {
			msgElement.style.display = 'none';
		}, 5000); // Rever o tempo de exibição da mensagem depois
	}
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


const loginForm = document.getElementById('login-form');
if (loginForm) {

	// -*-*-*- FUNÇÃO DE LOGIN *-*-*-*-
	document.getElementById('login-form').addEventListener('submit', async (event) => {
    
		event.preventDefault();
    
		const loginData = {
			email: document.getElementById('log-email').value,
			password: document.getElementById('log-password').value
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
