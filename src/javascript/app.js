const URL_BASE = 'https://api.escuelajs.co/api/v1';

const registerForm = document.getElementById('register-form');
if(registerForm){
    
    // -*-*-*- FUNÇÃO DE CADASTRO *-*-*-*-
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const userData = {
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        password: document.getElementById('reg-password').value,
        avatar: "https://picsum.photos/80"
      };

      
    
    // Tratando o erro 
    try{
        const response = await fetch(`${URL_BASE}/users`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData)
        });
    
        const data = await response.json();
    
        if(response.ok){
            localStorage.setItem('userId', data.id)
            localStorage.setItem('users', JSON.stringify(data))
            alert('Usuário criado com sucesso! Agora faça o login')
            console.log('Usuário', data);
            window.location.href = '../index.html';
        }
        else{
            alert('Erro no cadastro:', data.message)
        }
    
    } catch (error){
        console.log('Erro na requisição', error)
    }
    
    });

};


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
                
                alert('Login realizado! Token salvo.')
                console.log('Token JWT:', data.access_token);
                window.location.href = 'pages/shop-window.html';
            }
            else{
                alert('Falha no login: Verifique suas credenciais.')
            }
    
        }catch(error){
            console.error('Erro no login:', error);
        }
    
    });

}



