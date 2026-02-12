// ===== CHAUFFEUR VIDEO PAGE - GESTION VIDÉO MULTILINGUE =====
// Ce script gère le lecteur vidéo des instructions chauffeur avec support mobile complet

// Sauvegarder le flag de complétion vidéo
sessionStorage.setItem('video_completed', 'false');

// Fonction de redirection intelligente après la vidéo
function handleContinue() {
  const chauffeurId = sessionStorage.getItem('chauffeur_id');
  if (chauffeurId) {
    // Chauffeur déjà inscrit → redirection vers ses tâches
    window.location.href = `/chauffeur/taches?id=${chauffeurId}`;
  } else {
    // Nouveau chauffeur → inscription
    window.location.href = '/chauffeur/inscription';
  }
}

// ===== TRADUCTIONS MULTILINGUES =====
const translations = {
  fr: {
    header: 'GXO Logistics - Procédures Moissy',
    title: 'Instructions',
    message: 'Veuillez regarder la vidéo complète avant de continuer.',
    button: 'Continuer',
    fullscreen: 'Plein écran',
    loading: 'Chargement de la vidéo...',
    error: 'Erreur : Impossible de lire la vidéo. Vérifiez votre connexion.',
    playButton: 'Lancer la vidéo',
    tapToStart: 'Appuyez pour démarrer'
  },
  en: {
    header: 'GXO Logistics - Moissy Procedures',
    title: 'Instructions',
    message: 'Please watch the full video before continuing.',
    button: 'Continue',
    fullscreen: 'Fullscreen',
    loading: 'Loading video...',
    error: 'Error: Unable to play video. Check your connection.',
    playButton: 'Play Video',
    tapToStart: 'Tap to start'
  },
  nl: {
    header: 'GXO Logistics - Moissy Procedures',
    title: 'Instructies',
    message: 'Bekijk de volledige video voordat u verdergaat.',
    button: 'Doorgaan',
    fullscreen: 'Volledig scherm',
    loading: 'Video laden...',
    error: 'Fout: Kan video niet afspelen. Controleer uw verbinding.',
    playButton: 'Video Afspelen',
    tapToStart: 'Tik om te starten'
  },
  de: {
    header: 'GXO Logistics - Moissy Verfahren',
    title: 'Anweisungen',
    message: 'Bitte sehen Sie sich das gesamte Video an, bevor Sie fortfahren.',
    button: 'Weiter',
    fullscreen: 'Vollbild',
    loading: 'Video wird geladen...',
    error: 'Fehler: Video kann nicht abgespielt werden. Überprüfen Sie Ihre Verbindung.',
    playButton: 'Video Abspielen',
    tapToStart: 'Tippen Sie zum Starten'
  },
  es: {
    header: 'GXO Logistics - Procedimientos Moissy',
    title: 'Instrucciones',
    message: 'Por favor, vea el video completo antes de continuar.',
    button: 'Continuar',
    fullscreen: 'Pantalla completa',
    loading: 'Cargando video...',
    error: 'Error: No se puede reproducir el video. Verifique su conexión.',
    playButton: 'Reproducir Video',
    tapToStart: 'Toque para comenzar'
  },
  it: {
    header: 'GXO Logistics - Procedure Moissy',
    title: 'Istruzioni',
    message: 'Si prega di guardare il video completo prima di continuare.',
    button: 'Continua',
    fullscreen: 'Schermo intero',
    loading: 'Caricamento video...',
    error: 'Errore: Impossibile riprodurre il video. Controlla la connessione.',
    playButton: 'Riproduci Video',
    tapToStart: 'Tocca per iniziare'
  },
  pl: {
    header: 'GXO Logistics - Procedury Moissy',
    title: 'Instrukcje',
    message: 'Proszę obejrzeć cały film przed kontynuowaniem.',
    button: 'Kontynuuj',
    fullscreen: 'Pełny ekran',
    loading: 'Ładowanie wideo...',
    error: 'Błąd: Nie można odtworzyć wideo. Sprawdź połączenie.',
    playButton: 'Odtwórz Wideo',
    tapToStart: 'Dotknij, aby rozpocząć'
  },
  ro: {
    header: 'GXO Logistics - Proceduri Moissy',
    title: 'Instrucțiuni',
    message: 'Vă rugăm să vizionați întregul videoclip înainte de a continua.',
    button: 'Continuați',
    fullscreen: 'Ecran complet',
    loading: 'Se încarcă videoclipul...',
    error: 'Eroare: Nu se poate reda videoclipul. Verificați conexiunea.',
    playButton: 'Redați Videoclipul',
    tapToStart: 'Atingeți pentru a începe'
  },
  bg: {
    header: 'GXO Logistics - Процедури Moissy',
    title: 'Инструкции',
    message: 'Моля, гледайте целия видеоклип, преди да продължите.',
    button: 'Продължете',
    fullscreen: 'Цял екран',
    loading: 'Зареждане на видеоклипа...',
    error: 'Грешка: Не може да се възпроизведе видеоклипът. Проверете връзката си.',
    playButton: 'Пуснете Видеоклипа',
    tapToStart: 'Докоснете, за да започнете'
  },
  cs: {
    header: 'GXO Logistics - Postupy Moissy',
    title: 'Instrukce',
    message: 'Před pokračováním si prosím přehrajte celé video.',
    button: 'Pokračovat',
    fullscreen: 'Celá obrazovka',
    loading: 'Načítání videa...',
    error: 'Chyba: Video nelze přehrát. Zkontrolujte připojení.',
    playButton: 'Přehrát Video',
    tapToStart: 'Klepnutím spustíte'
  },
  da: {
    header: 'GXO Logistics - Moissy Procedurer',
    title: 'Instruktioner',
    message: 'Se venligst hele videoen, før du fortsætter.',
    button: 'Fortsæt',
    fullscreen: 'Fuld skærm',
    loading: 'Indlæser video...',
    error: 'Fejl: Kan ikke afspille video. Tjek din forbindelse.',
    playButton: 'Afspil Video',
    tapToStart: 'Tryk for at starte'
  },
  fi: {
    header: 'GXO Logistics - Moissy Menettelyt',
    title: 'Ohjeet',
    message: 'Katso koko video ennen jatkamista.',
    button: 'Jatka',
    fullscreen: 'Koko näyttö',
    loading: 'Ladataan videota...',
    error: 'Virhe: Videota ei voi toistaa. Tarkista yhteytesi.',
    playButton: 'Toista Video',
    tapToStart: 'Napauta aloittaaksesi'
  }
};

// Récupérer la langue depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const langue = urlParams.get('lang') || 'fr';
sessionStorage.setItem('langue', langue);

// Sélectionner la traduction appropriée
const t = translations[langue] || translations.fr;

// Mettre à jour les textes de l'interface
document.title = t.header;
const titleElement = document.querySelector('h2');
if (titleElement) titleElement.textContent = t.title;

const messageElement = document.getElementById('message-bloquant');
if (messageElement) messageElement.textContent = t.message;

const btnContinuer = document.getElementById('btn-continuer');
if (btnContinuer) btnContinuer.textContent = t.button;

// ===== MAPPING DES VIDÉOS PAR LANGUE =====
const videoMapping = {
  fr: '/static/videos/instructions-fr.mp4',
  en: '/static/videos/instructions-en.mp4',
  nl: '/static/videos/instructions-nl.mp4',
  de: '/static/videos/instructions-de.mp4',
  es: '/static/videos/instructions-es.mp4',
  it: '/static/videos/instructions-it.mp4',
  pl: '/static/videos/instructions-pl.mp4',
  ro: '/static/videos/instructions-ro.mp4',
  bg: '/static/videos/instructions-bg.mp4',
  cs: '/static/videos/instructions-cs.mp4',
  da: '/static/videos/instructions-da.mp4',
  fi: '/static/videos/instructions-fi.mp4'
};

// ===== RÉFÉRENCES DOM =====
const video = document.getElementById('video-instructions');
const videoSource = document.getElementById('video-source');
const progressBar = document.getElementById('progress-bar');
const videoTimer = document.getElementById('video-timer');
const btnContinuerContainer = document.getElementById('btn-continuer-container');
const placeholder = document.getElementById('video-placeholder');
const fullscreenBtn = document.getElementById('fullscreen-btn');

// ===== DÉTECTION MOBILE =====
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ===== FONCTION DE CHARGEMENT VIDÉO =====
function chargerVideo() {
  const videoUrl = videoMapping[langue];
  
  if (!videoUrl) {
    console.error(`Pas de vidéo disponible pour la langue: ${langue}`);
    placeholder.innerHTML = `<div class="text-red-500 text-center"><i class="fas fa-exclamation-triangle text-4xl mb-4"></i><p class="text-lg">${t.error}</p></div>`;
    return;
  }

  // Configurer la source vidéo
  videoSource.src = videoUrl;
  video.load();

  // Fonction pour afficher la vidéo
  function afficherVideo() {
    placeholder.style.display = 'none';
    video.style.display = 'block';
    fullscreenBtn.style.display = 'block';
    console.log('✅ Vidéo affichée et prête');
  }

  // ===== MODE MOBILE : BOUTON PLAY =====
  if (isMobile) {
    // Créer un gros bouton PLAY orange avec animation pulse
    placeholder.innerHTML = `
      <div class="flex flex-col items-center justify-center space-y-6">
        <button id="mobile-play-btn" class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full px-12 py-6 text-2xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-4 animate-pulse">
          <i class="fas fa-play-circle text-5xl"></i>
          <div class="text-left">
            <div class="text-2xl font-bold">${t.playButton}</div>
            <div class="text-sm opacity-90">${t.tapToStart}</div>
          </div>
        </button>
      </div>
    `;

    const playBtn = document.getElementById('mobile-play-btn');
    playBtn.addEventListener('click', () => {
      afficherVideo();
      video.play().then(() => {
        console.log('✅ Vidéo lancée sur mobile');
        playBtn.remove();
      }).catch(err => {
        console.error('❌ Erreur lecture mobile:', err);
        placeholder.innerHTML = `<div class="text-red-500 text-center"><i class="fas fa-exclamation-triangle text-4xl mb-4"></i><p class="text-lg">${t.error}</p></div>`;
      });
    });

  } else {
    // ===== MODE DESKTOP : AUTOPLAY =====
    video.addEventListener('loadedmetadata', afficherVideo);
    video.addEventListener('loadeddata', afficherVideo);
    video.addEventListener('canplay', afficherVideo);

    // Timeout de sécurité pour afficher la vidéo après 3 secondes
    setTimeout(() => {
      if (placeholder.style.display !== 'none') {
        afficherVideo();
      }
    }, 3000);

    // Tenter l'autoplay (fonctionne sur desktop)
    video.play().catch(err => {
      console.warn('Autoplay bloqué (normal sur mobile):', err);
    });
  }

  // ===== GESTION DES ERREURS =====
  video.addEventListener('error', () => {
    console.error('❌ Erreur de chargement vidéo');
    placeholder.innerHTML = `<div class="text-red-500 text-center"><i class="fas fa-exclamation-triangle text-4xl mb-4"></i><p class="text-lg">${t.error}</p></div>`;
  });
}

// ===== GESTION DE LA PROGRESSION =====
video.addEventListener('timeupdate', () => {
  if (!video.duration || isNaN(video.duration) || video.duration === 0) return;

  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = progress + '%';

  // Afficher le timer (mm:ss / mm:ss)
  const currentMinutes = Math.floor(video.currentTime / 60);
  const currentSeconds = Math.floor(video.currentTime % 60);
  const durationMinutes = Math.floor(video.duration / 60);
  const durationSeconds = Math.floor(video.duration % 60);

  videoTimer.textContent = 
    `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / ` +
    `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
});

// ===== VIDÉO TERMINÉE =====
video.addEventListener('ended', () => {
  console.log('✅ Vidéo terminée');
  sessionStorage.setItem('video_completed', 'true');
  btnContinuerContainer.style.display = 'block';
  messageElement.style.display = 'none';
});

// ===== EMPÊCHER LE SKIP (SEEKING) =====
let lastPlayedTime = 0;
let isSeekingLocked = false;

video.addEventListener('timeupdate', () => {
  if (!isSeekingLocked) {
    lastPlayedTime = video.currentTime;
  }
});

video.addEventListener('seeking', () => {
  if (video.currentTime > lastPlayedTime + 1 && !isSeekingLocked) {
    isSeekingLocked = true;
    video.currentTime = lastPlayedTime;
    setTimeout(() => { isSeekingLocked = false; }, 500);
    console.warn('⚠️ Skip vidéo bloqué');
  }
});

// ===== PROTECTION CONTRE LA NAVIGATION =====
window.addEventListener('beforeunload', (e) => {
  if (sessionStorage.getItem('video_completed') !== 'true') {
    e.preventDefault();
    e.returnValue = t.message;
    return t.message;
  }
});

// Bloquer le bouton retour du navigateur
window.history.pushState(null, '', window.location.href);
window.addEventListener('popstate', () => {
  if (sessionStorage.getItem('video_completed') !== 'true') {
    alert(t.message);
    window.history.pushState(null, '', window.location.href);
  }
});

// Débloquer la navigation quand on clique sur Continuer
if (btnContinuer) {
  btnContinuer.addEventListener('click', () => {
    sessionStorage.setItem('video_completed', 'true');
  });
}

// ===== FULLSCREEN TOGGLE =====
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        console.error('Erreur fullscreen:', err);
      });
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Quitter';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = `<i class="fas fa-expand"></i> ${t.fullscreen}`;
    }
  });
}

// ===== LANCER LE CHARGEMENT =====
chargerVideo();

console.log(`🎬 Lecteur vidéo initialisé - Langue: ${langue}, Mobile: ${isMobile}`);
