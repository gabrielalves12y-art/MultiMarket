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


// -*-*-*- VERIFICAÇÃO DE DISPONIBILIDADE DE E-MAIL *-*-*-*-

async function verificarDisponibilidadeEmail(email) {
	const response = await fetch(`${URL_BASE}/users/is-available`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email })
	});

	const data = await response.json();

	return {
		ok: response.ok,
		isAvailable: data?.isAvailable === true
	};
}



const emailInput = document.getElementById('reg-email');
if (emailInput){
	emailInput.addEventListener('blur', async () => {
		const email = emailInput.value.trim();
        


		if (!email || !email.includes('@')) return; 

		try {
			const { ok, isAvailable } = await verificarDisponibilidadeEmail(email);

			if (!ok) {
				exibirMensagem('Não foi possível verificar a disponibilidade do e-mail.', 'erro'); // rever depois se deixa essa mensagem ou a função nativa do HTML 
				emailInput.style.borderColor = '#f39c12';
				emailInput.setCustomValidity('Não foi possível verificar este e-mail agora.'); 
				return;
			}

			if (!isAvailable) {
				exibirMensagem('Este e-mail já está cadastrado. Use outro e-mail.', 'erro'); // Mesma coisa, analisar direitinho qual o melhor em termos de UX, acessibilidade ou se deixa os dois
				emailInput.style.borderColor = '#ff4d4d';
				emailInput.setCustomValidity('Este e-mail já está cadastrado.'); 
				emailInput.reportValidity(); 
			} else {
				exibirMensagem('E-mail disponível!', 'sucesso');
				emailInput.style.borderColor = '#2ecc71';
				emailInput.setCustomValidity('');
			}
		} catch (error) {
		exibirMensagem('Erro ao verificar e-mail. Tente novamente.', 'erro');
		emailInput.setCustomValidity('Não foi possível verificar este e-mail agora.');
		console.error('Erro na verificação de e-mail:', error); // lembrar de apagar depois
	} });
}


const registerForm = document.getElementById('register-form');
if(registerForm){
    
	// -*-*-*- FUNÇÃO DE CADASTRO *-*-*-*-
	document.getElementById('register-form').addEventListener('submit', async (event) => {
	  event.preventDefault();

	  // Dados do usuário a ser cadastrado
	  const userData = {
		name: document.getElementById('reg-name').value,
		email: document.getElementById('reg-email').value,
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
			localStorage.setItem('users', JSON.stringify(data))
			exibirMensagem('Usuário criado com sucesso! Agora faça o login', 'sucesso');
			console.log('Usuário', data); // lembrar de apagar depois

			// Time para o usuário ler a mensagem antes de redirecionar para a página de login
			setTimeout(() => {
				window.location.href = '../index.html';
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
