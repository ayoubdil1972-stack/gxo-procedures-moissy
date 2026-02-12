export function ChauffeurVideoPage() {
  return (
    <div class="min-h-screen bg-black flex flex-col">
      {/* Header fixe - Compact mobile */}
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-3 md:p-4 shadow-lg">
        <div class="container mx-auto">
          <div class="flex items-center justify-between mb-2">
            <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-8 md:h-10" />
            <div class="text-white font-bold text-sm md:text-base" id="langue-selectionnee"></div>
          </div>
          {/* Titre Instructions */}
          <div class="text-center">
            <h1 class="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <i class="fas fa-play-circle"></i>
              <span id="titre-instructions">Instructions</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Conteneur vidéo - Optimisé mobile + plein écran */}
      <div class="flex-1 flex items-center justify-center p-2 md:p-4">
        <div class="w-full max-w-5xl">
          {/* Container vidéo avec aspect ratio adaptatif - Optimisé mobile */}
          <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style="min-height: 200px;">
            <video 
              id="video-instructions" 
              class="w-full h-auto mx-auto"
              style="max-height: 70vh; object-fit: contain; display: block;"
              controls
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu="return false;"
              playsinline
              webkit-playsinline
              x-webkit-airplay="allow"
              preload="auto"
              poster=""
              muted
            >
              <source src="" type="video/mp4" id="video-source" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            
            {/* Placeholder si pas de vidéo chargée */}
            <div id="video-placeholder" class="absolute inset-0 flex items-center justify-center p-4 md:p-8 bg-gray-900">
              <div class="text-center">
                <div class="relative inline-block">
                  {/* Spinner de chargement animé */}
                  <svg class="animate-spin h-16 w-16 md:h-20 md:w-20 text-orange-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p class="text-white text-lg md:text-xl mb-2 font-semibold">Chargement de la vidéo...</p>
                <p class="text-gray-400 text-xs md:text-sm">Patientez quelques instants</p>
              </div>
            </div>
            
            {/* Bouton plein écran personnalisé - Toujours visible quand vidéo chargée */}
            <button 
              id="fullscreen-btn"
              onclick="toggleFullscreen()"
              class="hidden absolute top-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg transition-all z-10 text-sm md:text-base"
            >
              <i class="fas fa-expand mr-1" id="fullscreen-icon"></i>
              <span id="fullscreen-text">Plein écran</span>
            </button>
          </div>

          {/* Barre de progression */}
          <div class="mt-3 md:mt-4 bg-gray-800 rounded-full h-2 md:h-3 overflow-hidden">
            <div 
              id="progress-bar" 
              class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] h-full transition-all duration-300 flex items-center justify-center text-white text-xs font-bold"
              style="width: 0%"
            ></div>
          </div>

          {/* Timer */}
          <div class="text-center mt-2 md:mt-3 text-gray-400 text-xs md:text-sm" id="video-timer">
            00:00 / 00:00
          </div>

          {/* Message bloquant */}
          <div id="message-bloquant" class="mt-4 md:mt-6 bg-yellow-500 text-black p-3 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
            <i class="fas fa-lock mr-2"></i>
            <span id="message-text">Veuillez regarder la vidéo complète avant de continuer</span>
          </div>

          {/* Bouton continuer (masqué par défaut) */}
          <div id="btn-continuer-container" class="hidden mt-4 md:mt-6 text-center">
            <button 
              id="btn-continuer"
              onclick="handleContinue()"
              class="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-lg transition-all cursor-pointer"
            >
              <i class="fas fa-check-circle mr-2"></i>
              <span id="btn-continuer-text">Continuer vers l'inscription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Script de contrôle vidéo AMÉLIORÉ */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Animation pulse pour bouton mobile
          const style = document.createElement('style');
          style.textContent = \`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          \`;
          document.head.appendChild(style);
          
          // Récupérer la langue depuis l'URL
          const urlParams = new URLSearchParams(window.location.search);
          const langue = urlParams.get('lang') || 'bg';
          
          // Stocker la langue pour la suite
          sessionStorage.setItem('chauffeur_langue', langue);
          
          // Traductions
          const translations = {
            bg: { 
              header: '🇧🇬 Български', 
              titre: 'Инструкции',
              message: 'Моля, гледайте цялото видео преди да продължите',
              btn: 'Продължи към регистрацията',
              fullscreen: 'Цял екран'
            },
            cs: { 
              header: '🇨🇿 Čeština', 
              titre: 'Pokyny',
              message: 'Prosím sledujte celé video před pokračováním',
              btn: 'Pokračovat k registraci',
              fullscreen: 'Celá obrazovka'
            },
            da: { 
              header: '🇩🇰 Dansk', 
              titre: 'Instruktioner',
              message: 'Se venligst hele videoen før du fortsætter',
              btn: 'Fortsæt til registrering',
              fullscreen: 'Fuld skærm'
            },
            de: { 
              header: '🇩🇪 Deutsch', 
              titre: 'Anweisungen',
              message: 'Bitte sehen Sie sich das gesamte Video an, bevor Sie fortfahren',
              btn: 'Weiter zur Registrierung',
              fullscreen: 'Vollbild'
            },
            hr: { 
              header: '🇭🇷 Hrvatski', 
              titre: 'Upute',
              message: 'Molimo pogledajte cijeli video prije nastavka',
              btn: 'Nastavi s registracijom',
              fullscreen: 'Puni zaslon'
            },
            it: { 
              header: '🇮🇹 Italiano', 
              titre: 'Istruzioni',
              message: 'Si prega di guardare l\\'intero video prima di continuare',
              btn: 'Continua con la registrazione',
              fullscreen: 'Schermo intero'
            },
            pl: { 
              header: '🇵🇱 Polski', 
              titre: 'Instrukcje',
              message: 'Proszę obejrzeć cały film przed kontynuowaniem',
              btn: 'Przejdź do rejestracji',
              fullscreen: 'Pełny ekran'
            },
            pt: { 
              header: '🇵🇹 Português', 
              titre: 'Instruções',
              message: 'Por favor, assista ao vídeo completo antes de continuar',
              btn: 'Continuar para o registo',
              fullscreen: 'Ecrã inteiro'
            },
            ro: { 
              header: '🇷🇴 Română', 
              titre: 'Instrucțiuni',
              message: 'Vă rugăm să vizionați întregul video înainte de a continua',
              btn: 'Continuă către înregistrare',
              fullscreen: 'Ecran complet'
            },
            fr: { 
              header: '🇫🇷 Français', 
              titre: 'Instructions',
              message: 'Veuillez regarder la vidéo complète avant de continuer',
              btn: 'Continuer vers l\\\'inscription',
              fullscreen: 'Plein écran'
            },
            nl: { 
              header: '🇳🇱 Nederlands', 
              titre: 'Instructies',
              message: 'Bekijk de volledige video voordat u doorgaat',
              btn: 'Doorgaan naar registratie',
              fullscreen: 'Volledig scherm'
            },
            fi: { 
              header: '🇫🇮 Suomi', 
              titre: 'Ohjeet',
              message: 'Katso koko video ennen jatkamista',
              btn: 'Jatka rekisteröintiin',
              fullscreen: 'Koko näyttö'
            }
          };
          
          const t = translations[langue] || translations.bg;
          document.getElementById('langue-selectionnee').textContent = t.header;
          document.getElementById('titre-instructions').textContent = t.titre;
          document.getElementById('message-text').textContent = t.message;
          document.getElementById('btn-continuer-text').textContent = t.btn;
          document.getElementById('fullscreen-text').textContent = t.fullscreen;
          
          // URLs des vidéos par langue (12 langues disponibles !)
          const videoUrls = {
            'fr': '/static/videos/instructions-fr.mp4',
            'nl': '/static/videos/instructions-nl.mp4',
            'fi': '/static/videos/instructions-fi.mp4',
            'bg': '/static/videos/instructions-bg.mp4',
            'cs': '/static/videos/instructions-cs.mp4',
            'da': '/static/videos/instructions-da.mp4',
            'de': '/static/videos/instructions-de.mp4',
            'hr': '/static/videos/instructions-hr.mp4',
            'it': '/static/videos/instructions-it.mp4',
            'pl': '/static/videos/instructions-pl.mp4',
            'pt': '/static/videos/instructions-pt.mp4',
            'ro': '/static/videos/instructions-ro.mp4'
          };
          
          const video = document.getElementById('video-instructions');
          const videoSource = document.getElementById('video-source');
          const progressBar = document.getElementById('progress-bar');
          const videoTimer = document.getElementById('video-timer');
          const messageBloquant = document.getElementById('message-bloquant');
          const btnContinuerContainer = document.getElementById('btn-continuer-container');
          const placeholder = document.getElementById('video-placeholder');
          const fullscreenBtn = document.getElementById('fullscreen-btn');
          

          
          // Fonction plein écran AMÉLIORÉE (support mobile)
          window.toggleFullscreen = function() {
            const videoContainer = video.parentElement;
            
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
              // Entrer en plein écran
              const requestFullscreen = videoContainer.requestFullscreen || 
                                       videoContainer.webkitRequestFullscreen || 
                                       videoContainer.mozRequestFullScreen || 
                                       videoContainer.msRequestFullscreen;
              
              if (requestFullscreen) {
                requestFullscreen.call(videoContainer).then(() => {
                  // Sur mobile, laisser l'orientation naturelle (portrait ou paysage)
                  console.log('✅ Mode plein écran activé');
                }).catch((err) => {
                  console.error('❌ Erreur plein écran:', err);
                });
              }
              
              document.getElementById('fullscreen-icon').className = 'fas fa-compress mr-1';
              document.getElementById('fullscreen-text').textContent = 'Quitter';
            } else {
              // Quitter le plein écran
              const exitFullscreen = document.exitFullscreen || 
                                    document.webkitExitFullscreen || 
                                    document.mozCancelFullScreen || 
                                    document.msExitFullscreen;
              
              if (exitFullscreen) {
                exitFullscreen.call(document).then(() => {
                  // Unlock orientation
                  if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                  }
                });
              }
              
              document.getElementById('fullscreen-icon').className = 'fas fa-expand mr-1';
              const t = translations[langue] || translations.bg;
              document.getElementById('fullscreen-text').textContent = t.fullscreen;
            }
          };
          
          // Écouter les changements de plein écran
          document.addEventListener('fullscreenchange', updateFullscreenButton);
          document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
          
          function updateFullscreenButton() {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
              document.getElementById('fullscreen-icon').className = 'fas fa-compress mr-1';
              document.getElementById('fullscreen-text').textContent = 'Quitter';
            } else {
              document.getElementById('fullscreen-icon').className = 'fas fa-expand mr-1';
              const t = translations[langue] || translations.bg;
              document.getElementById('fullscreen-text').textContent = t.fullscreen;
            }
          }
          
          // Fonction appelée quand la vidéo est terminée
          function videoCompleted() {
            progressBar.style.width = '100%';
            messageBloquant.classList.add('hidden');
            btnContinuerContainer.classList.remove('hidden');
            sessionStorage.setItem('video_completed', 'true');
          }
          
          // Fonction pour gérer le clic sur "Continuer"
          window.handleContinue = function() {
            canLeave = true;
            
            // Vérifier si le chauffeur est déjà inscrit (a un ID en session)
            const chauffeurId = sessionStorage.getItem('chauffeur_id');
            
            if (chauffeurId) {
              // Chauffeur déjà inscrit → Rediriger vers ses tâches
              console.log('✅ Chauffeur inscrit, redirection vers tâches:', chauffeurId);
              window.location.href = '/chauffeur/taches?id=' + chauffeurId;
            } else {
              // Nouveau chauffeur → Rediriger vers l'inscription
              console.log('✅ Nouveau chauffeur, redirection vers inscription');
              window.location.href = '/chauffeur/inscription';
            }
          };
          
          // Si une vidéo existe pour cette langue
          if (videoUrls[langue]) {
            videoSource.src = videoUrls[langue];
            
            let videoDisplayed = false;
            let isSeekingLocked = false;
            
            // Détection mobile
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // Fonction pour afficher la vidéo
            function afficherVideo() {
              if (videoDisplayed) return;
              videoDisplayed = true;
              console.log('✅ Vidéo chargée:', langue);
              placeholder.classList.add('hidden');
              video.classList.remove('hidden');
              fullscreenBtn.classList.remove('hidden');
            }
            
            // STRATÉGIE UNIVERSELLE : Même code pour MOBILE et PC
            // Charger la vidéo
            video.load();
            
            // Afficher le bouton PLAY sur mobile
            if (isMobile) {
              placeholder.innerHTML = \`
                <div class="text-center">
                  <button 
                    id="mobile-play-btn"
                    class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 active:scale-95"
                    style="animation: pulse 2s ease-in-out infinite;"
                  >
                    <i class="fas fa-play-circle text-5xl mb-3"></i>
                    <div class="text-lg">▶ Lancer la vidéo</div>
                  </button>
                  <p class="text-gray-400 text-sm mt-4">Appuyez pour démarrer</p>
                </div>
              \`;
              
              // Clic sur le bouton PLAY
              document.getElementById('mobile-play-btn').addEventListener('click', function() {
                console.log('🎬 Clic mobile détecté');
                afficherVideo();
                video.play().catch(function(err) {
                  console.error('❌ Erreur:', err);
                  alert('Erreur de lecture. Rechargez la page.');
                });
              });
            } else {
              // PC : Autoplay direct
              video.muted = true;
              video.play().then(function() {
                setTimeout(function() { video.muted = false; }, 100);
              }).catch(function() {
                video.muted = false;
              });
            }
            
            // Événements de chargement (PC uniquement)
            if (!isMobile) {
              video.addEventListener('loadedmetadata', function() {
                console.log('✅ Métadonnées chargées');
                afficherVideo();
              });
              
              video.addEventListener('canplay', function() {
                console.log('✅ Vidéo prête');
                afficherVideo();
              });
              
              // Timeout secours
              setTimeout(function() {
                if (!videoDisplayed) {
                  console.log('⏰ Timeout - Affichage forcé');
                  afficherVideo();
                }
              }, 2000);
            }
            
            // Gestion erreurs
            video.addEventListener('error', function(e) {
              console.error('❌ Erreur chargement vidéo:', e);
              placeholder.innerHTML = \`
                <div class="text-center">
                  <i class="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                  <p class="text-white text-lg mb-4">Erreur de chargement</p>
                  <button 
                    onclick="location.reload()"
                    class="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600"
                  >
                    <i class="fas fa-redo mr-2"></i>Recharger
                  </button>
                </div>
              \`;
            });
            
            // Mise à jour progression (avec protection NaN)
            video.addEventListener('timeupdate', function() {
              if (isNaN(video.duration) || video.duration === 0) return;
              
              const percent = (video.currentTime / video.duration) * 100;
              progressBar.style.width = percent + '%';
              
              const currentMin = Math.floor(video.currentTime / 60);
              const currentSec = Math.floor(video.currentTime % 60);
              const durationMin = Math.floor(video.duration / 60);
              const durationSec = Math.floor(video.duration % 60);
              
              videoTimer.textContent = 
                String(currentMin).padStart(2, '0') + ':' + String(currentSec).padStart(2, '0') +
                ' / ' +
                String(durationMin).padStart(2, '0') + ':' + String(durationSec).padStart(2, '0');
            });
            
            // Vidéo terminée
            video.addEventListener('ended', videoCompleted);
            
            // Empêcher skip (avec protection boucle)
            video.addEventListener('seeking', function() {
              if (isSeekingLocked) return;
              if (video.currentTime > video.duration - 5) return;
              if (video.currentTime > (this.dataset.lastTime || 0)) {
                isSeekingLocked = true;
                video.currentTime = this.dataset.lastTime || 0;
                setTimeout(function() { isSeekingLocked = false; }, 100);
              }
            });
            
            video.addEventListener('timeupdate', function() {
              this.dataset.lastTime = this.currentTime;
            });
            
            console.log('✅ Vidéo prête. ' + (isMobile ? 'Appuyez sur PLAY.' : 'Chargement auto.'));
          } else {
            console.error('❌ Pas de vidéo pour la langue:', langue);
            placeholder.innerHTML = \`
              <div class="text-center">
                <i class="fas fa-film text-gray-500 text-5xl mb-4"></i>
                <p class="text-white text-lg">Vidéo non disponible</p>
                <p class="text-gray-400 text-sm mt-2">Langue : \${langue}</p>
              </div>
            \`;
          }
          
          // Empêcher de quitter la page
          let canLeave = false;
          
          window.addEventListener('beforeunload', function(e) {
            if (!canLeave && !sessionStorage.getItem('video_completed')) {
              e.preventDefault();
              e.returnValue = '';
              return '';
            }
          });
          
          if (btnContinuerContainer) {
            btnContinuerContainer.addEventListener('click', function() {
              canLeave = true;
            });
          }
          
          // Empêcher le back button pendant la vidéo
          history.pushState(null, null, location.href);
          window.addEventListener('popstate', function() {
            if (!sessionStorage.getItem('video_completed')) {
              history.pushState(null, null, location.href);
              const t = translations[langue] || translations.bg;
              alert(t.message);
            }
          });
        `
      }} />
    </div>
  )
}
