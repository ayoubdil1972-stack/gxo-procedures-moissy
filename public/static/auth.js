// auth.js - Système d'authentification sécurisé GXO

// Configuration (À MODIFIER POUR LA PRODUCTION)
const AUTH_CONFIG = {
  // Identifiants par défaut - CHANGER EN PRODUCTION !
  credentials: [
    { username: 'gxo.admin', password: 'GXO2026!Moissy', role: 'admin', name: 'Administrateur' },
    { username: 'gxo.user', password: 'GXO@Moissy2026', role: 'user', name: 'Utilisateur' },
    { username: 'chef.equipe', password: 'ChefGXO2026!', role: 'manager', name: 'Chef d\'équipe' }
  ],
  sessionDuration: 8 * 60 * 60 * 1000, // 8 heures
  maxAttempts: 5,
  lockoutDuration: 15 * 60 * 1000 // 15 minutes
};

// État de l'authentification
let authState = {
  attempts: 0,
  lockedUntil: null
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/login') {
    initLoginPage();
  } else {
    checkAuthentication();
  }
});

// Vérifier l'authentification
function checkAuthentication() {
  const session = getSession();
  
  if (!session || !isSessionValid(session)) {
    // Session invalide - rediriger vers login
    clearSession();
    window.location.href = '/login';
    return false;
  }
  
  // Session valide - mettre à jour l'interface
  updateUserInfo(session);
  return true;
}

// Obtenir la session
function getSession() {
  const sessionData = localStorage.getItem('gxo_session');
  if (!sessionData) return null;
  
  try {
    return JSON.parse(atob(sessionData));
  } catch (e) {
    return null;
  }
}

// Vérifier si la session est valide
function isSessionValid(session) {
  if (!session || !session.expires) return false;
  return new Date().getTime() < session.expires;
}

// Créer une session
function createSession(user, remember = false) {
  const session = {
    username: user.username,
    role: user.role,
    name: user.name,
    loginTime: new Date().getTime(),
    expires: new Date().getTime() + AUTH_CONFIG.sessionDuration
  };
  
  localStorage.setItem('gxo_session', btoa(JSON.stringify(session)));
  
  if (remember) {
    localStorage.setItem('gxo_remember', 'true');
  }
}

// Effacer la session
function clearSession() {
  localStorage.removeItem('gxo_session');
  localStorage.removeItem('gxo_remember');
}

// Initialiser la page de connexion
function initLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) return;
  
  // Vérifier si déjà connecté
  const session = getSession();
  if (session && isSessionValid(session)) {
    window.location.href = '/';
    return;
  }
  
  // Gérer la soumission du formulaire
  form.addEventListener('submit', handleLogin);
  
  // Charger l'état de verrouillage
  loadLockoutState();
}

// Gérer la connexion
async function handleLogin(event) {
  event.preventDefault();
  
  // Vérifier le verrouillage
  if (isLockedOut()) {
    const remainingTime = Math.ceil((authState.lockedUntil - Date.now()) / 1000 / 60);
    showError(`Trop de tentatives échouées. Réessayez dans ${remainingTime} minute(s).`);
    return;
  }
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  
  // Validation basique
  if (!username || !password) {
    showError('Veuillez remplir tous les champs.');
    return;
  }
  
  // Simuler un délai pour éviter les attaques par force brute
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Vérifier les identifiants
  const user = AUTH_CONFIG.credentials.find(
    u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  
  if (user) {
    // Connexion réussie
    authState.attempts = 0;
    saveLockoutState();
    
    createSession(user, remember);
    
    // Animation de succès
    showSuccess('Connexion réussie ! Redirection...');
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } else {
    // Échec de connexion
    authState.attempts++;
    saveLockoutState();
    
    const remainingAttempts = AUTH_CONFIG.maxAttempts - authState.attempts;
    
    if (remainingAttempts <= 0) {
      // Verrouiller le compte
      authState.lockedUntil = Date.now() + AUTH_CONFIG.lockoutDuration;
      saveLockoutState();
      showError('Compte temporairement verrouillé pour des raisons de sécurité.');
    } else {
      showError(`Identifiant ou mot de passe incorrect. ${remainingAttempts} tentative(s) restante(s).`);
    }
    
    // Secouer le formulaire
    const form = document.getElementById('login-form');
    form.classList.add('animate-shake');
    setTimeout(() => form.classList.remove('animate-shake'), 500);
  }
}

// Vérifier si le compte est verrouillé
function isLockedOut() {
  if (!authState.lockedUntil) return false;
  
  if (Date.now() < authState.lockedUntil) {
    return true;
  } else {
    // Le verrouillage a expiré
    authState.lockedUntil = null;
    authState.attempts = 0;
    saveLockoutState();
    return false;
  }
}

// Sauvegarder l'état de verrouillage
function saveLockoutState() {
  localStorage.setItem('gxo_lockout', JSON.stringify(authState));
}

// Charger l'état de verrouillage
function loadLockoutState() {
  const data = localStorage.getItem('gxo_lockout');
  if (data) {
    try {
      authState = JSON.parse(data);
    } catch (e) {
      authState = { attempts: 0, lockedUntil: null };
    }
  }
}

// Afficher une erreur
function showError(message) {
  const errorDiv = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  
  if (errorDiv && errorText) {
    errorText.textContent = message;
    errorDiv.classList.remove('hidden', 'bg-green-500');
    errorDiv.classList.add('bg-red-500');
    
    // Animation
    errorDiv.style.animation = 'none';
    setTimeout(() => {
      errorDiv.style.animation = 'shake 0.5s';
    }, 10);
  }
}

// Afficher un succès
function showSuccess(message) {
  const errorDiv = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  
  if (errorDiv && errorText) {
    errorText.textContent = message;
    errorDiv.classList.remove('hidden', 'bg-red-500');
    errorDiv.classList.add('bg-green-500');
  }
}

// Basculer la visibilité du mot de passe
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const passwordIcon = document.getElementById('password-icon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIcon.className = 'fas fa-eye-slash';
  } else {
    passwordInput.type = 'password';
    passwordIcon.className = 'fas fa-eye';
  }
}

// Afficher l'aide
function showHelp() {
  alert(
    'Aide à la connexion\n\n' +
    '• Identifiants par défaut :\n' +
    '  - Admin: gxo.admin / GXO2026!Moissy\n' +
    '  - Utilisateur: gxo.user / GXO@Moissy2026\n' +
    '  - Chef d\'équipe: chef.equipe / ChefGXO2026!\n\n' +
    '• En cas de problème, contactez votre administrateur système.\n\n' +
    '⚠️ IMPORTANT: Ces identifiants sont temporaires.\n' +
    'Ils doivent être changés en production !'
  );
}

// Déconnexion
function logout() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    clearSession();
    window.location.href = '/login';
  }
}

// Mettre à jour les informations utilisateur dans l'interface
function updateUserInfo(session) {
  // Ajouter un bouton de déconnexion dans le header si pas déjà présent
  const nav = document.querySelector('nav .container > div:last-child');
  if (nav && !document.getElementById('logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.className = 'hover:text-[#FF6B35] transition-colors text-sm';
    logoutBtn.innerHTML = `
      <i class="fas fa-user-circle mr-2"></i>
      <span class="hidden md:inline">${session.name}</span>
      <i class="fas fa-sign-out-alt ml-2"></i>
    `;
    logoutBtn.onclick = logout;
    logoutBtn.title = 'Déconnexion';
    nav.appendChild(logoutBtn);
  }
}

// Exporter les fonctions pour utilisation globale
window.logout = logout;
window.togglePassword = togglePassword;
window.showHelp = showHelp;
