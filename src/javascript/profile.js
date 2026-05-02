if (typeof URL_BASE === 'undefined') {
    var URL_BASE = 'https://api.escuelajs.co/api/v1';
}
const LOGIN_PAGE = 'login.html';

function exibirMensagem(texto, tipo = 'erro') {
    const msgElement = document.getElementById('profile-message');

    if (!msgElement){
        return;
    }

    msgElement.textContent = texto;
    msgElement.dataset.tipo = tipo;
    msgElement.style.display = 'block';

    window.clearTimeout(msgElement._hideTimer);
    msgElement._hideTimer = setTimeout(() => {
        msgElement.style.display = 'none';
    }, 3500);
}


function normalizarTexto(valor, fallback = '') {
      return valor === null || valor === undefined || valor === '' ? fallback : String(valor);
}

function preencherPerfil(usuario){
    const avatar = document.getElementById('profile-avatar');
    const titulo = document.getElementById('profile-title');
    const campoId = document.getElementById('profile-id');
    const campoName = document.getElementById('profile-name-field');
    const campoEmail = document.getElementById('profile-email-field');
    const campoRole = document.getElementById('profile-role-field');

    console.log('Dados do usuário:', usuario);


if (titulo){
    titulo.textContent = `Perfil de ${normalizarTexto(usuario?.name, 'Usuário')}`;
}

if (campoId){
    campoId.value = `${normalizarTexto(usuario?.id, '-')}`;
}

if (campoName){
    campoName.value = `${normalizarTexto(usuario?.name, '-')}`;
}

if (campoEmail){
    campoEmail.value = `${normalizarTexto(usuario?.email, '-')}`;
}

if (campoRole){
    campoRole.value = `${normalizarTexto(usuario?.role, '-')}`;
}


if (avatar) {
    const avatarUrl = (usuario && usuario.avatar && usuario.avatar.trim()) ? usuario.avatar: 'https://api.lorem.space/image/face?w=200&h=200';
    console.log('profile avatar about to set to:', avatarUrl);
    avatar.src = avatarUrl;

    const fallbackAvatar = '../src/assets/icons/sharp-person.png';
    avatar.onerror = function () {
        console.warn('Avatar failed to load, switching to fallback:', avatarUrl);
        this.onerror = null;
        this.src = fallbackAvatar;
    };
    avatar.alt = usuario?.name ? `Foto de ${usuario.name}` : 'Foto do usuário';
    console.log('profile avatar applied:', avatar.src);
}
}

function patch(){
    const avatar = document.getElementById('profile-avatar');

    if (!avatar){
        return;
    }
    avatar.src = 'https://api.lorem.space/image/face?w=200&h=200';
    avatar.alt = 'Foto do usuário';
    console.log('profile avatar applied:', avatar.src);

}

// -*-*-*- FUNÇÃO DE CARREGAMENTO DO PERFIL *-*-*-*-
async function carregarPerfil(){
    const token = localStorage.getItem('access_token');

    if (!token) {
        window.location.href = LOGIN_PAGE;
        return;
    }
    
    try {
        const response = await fetch(`${URL_BASE}/auth/profile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar perfil: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        preencherPerfil(data);

    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        exibirMensagem('Erro ao carregar perfil. Faça login novamente.', 'erro');
        window.location.href = LOGIN_PAGE;
    }

}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        await carregarPerfil();
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        exibirMensagem('Erro ao carregar perfil. Tente novamente.', 'erro');
    }
});

// Função de logout
function fazerLogout() {
    const logout = document.getElementById('profile-logout');

    if (logout) {
        logout.addEventListener('click', () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userId');
            exibirMensagem('Logout realizado com sucesso.', 'sucesso');
            window.location.href = LOGIN_PAGE;
        });

    }
}

// Funções de navegação
function setupNavigation() {
    const navShop = document.getElementById('nav-shop');
    const navCategorias = document.getElementById('nav-categorias');
    const navPerfil = document.getElementById('nav-perfil');

    if (navShop) {
        navShop.addEventListener('click', () => {
            window.location.href = '../shop-window.html';
        });
    }

    if (navCategorias) {
        navCategorias.addEventListener('click', () => {
            window.location.href = './products.html';
        });
    }

    if (navPerfil) {
        navPerfil.addEventListener('click', () => {
            window.location.href = './profile.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
});

fazerLogout();