export function ChauffeurVideoPage() {
  return (
    <div class="min-h-screen bg-black flex flex-col">
      {/* Header fixe - Compact mobile */}
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-3 md:p-4 shadow-lg">
        <div class="container mx-auto flex items-center justify-between">
          <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-8 md:h-10" />
          <div class="text-white font-bold text-sm md:text-base" id="langue-selectionnee"></div>
        </div>
      </div>

      {/* Conteneur vidéo - Optimisé mobile + plein écran */}
      <div class="flex-1 flex items-center justify-center p-2 md:p-4">
        <div class="w-full max-w-5xl">
          {/* Container vidéo avec aspect ratio 9:16 (portrait mobile) */}
          <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <video 
              id="video-instructions" 
              class="w-full h-auto"
              style="max-height: 85vh; object-fit: contain;"
              controls
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu="return false;"
              playsinline
              webkit-playsinline
              x-webkit-airplay="allow"
            >
              <source src="" type="video/mp4" id="video-source" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            
            {/* Placeholder si pas de vidéo chargée */}
            <div id="video-placeholder" class="absolute inset-0 flex items-center justify-center p-4 md:p-8 bg-gray-900">
              <div class="text-center">
                <i class="fas fa-video text-4xl md:text-6xl text-gray-600 mb-4"></i>
                <p class="text-white text-lg md:text-xl mb-2">Vidéo d'instructions</p>
                <p class="text-gray-400 text-xs md:text-sm mb-4">Chargement...</p>
                
                {/* Bouton de simulation pour test */}
                <button 
                  onclick="simulerFinVideo()"
                  class="mt-4 md:mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                >
                  <i class="fas fa-forward mr-2"></i>
                  Simuler fin de vidéo (TEST)
                </button>
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
            <a 
              href="/chauffeur/inscription"
              class="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-lg transition-all"
            >
              <i class="fas fa-check-circle mr-2"></i>
              <span id="btn-continuer-text">Continuer vers l'inscription</span>
            </a>
          </div>
        </div>
      </div>

      {/* Script de contrôle vidéo AMÉLIORÉ */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Récupérer la langue depuis l'URL
          const urlParams = new URLSearchParams(window.location.search);
          const langue = urlParams.get('lang') || 'bg';
          
          // Stocker la langue pour la suite
          sessionStorage.setItem('chauffeur_langue', langue);
          
          // Traductions
          const translations = {
            bg: { 
              header: '🇧🇬 Български', 
              message: 'Моля, гледайте цялото видео преди да продължите',
              btn: 'Продължи към регистрацията',
              fullscreen: 'Цял екран'
            },
            cs: { 
              header: '🇨🇿 Čeština', 
              message: 'Prosím sledujte celé video před pokračováním',
              btn: 'Pokračovat k registraci',
              fullscreen: 'Celá obrazovka'
            },
            da: { 
              header: '🇩🇰 Dansk', 
              message: 'Se venligst hele videoen før du fortsætter',
              btn: 'Fortsæt til registrering',
              fullscreen: 'Fuld skærm'
            },
            de: { 
              header: '🇩🇪 Deutsch', 
              message: 'Bitte sehen Sie sich das gesamte Video an, bevor Sie fortfahren',
              btn: 'Weiter zur Registrierung',
              fullscreen: 'Vollbild'
            },
            hr: { 
              header: '🇭🇷 Hrvatski', 
              message: 'Molimo pogledajte cijeli video prije nastavka',
              btn: 'Nastavi s registracijom',
              fullscreen: 'Puni zaslon'
            },
            it: { 
              header: '🇮🇹 Italiano', 
              message: 'Si prega di guardare l\\'intero video prima di continuare',
              btn: 'Continua con la registrazione',
              fullscreen: 'Schermo intero'
            },
            pl: { 
              header: '🇵🇱 Polski', 
              message: 'Proszę obejrzeć cały film przed kontynuowaniem',
              btn: 'Przejdź do rejestracji',
              fullscreen: 'Pełny ekran'
            },
            pt: { 
              header: '🇵🇹 Português', 
              message: 'Por favor, assista ao vídeo completo antes de continuar',
              btn: 'Continuar para o registo',
              fullscreen: 'Ecrã inteiro'
            },
            ro: { 
              header: '🇷🇴 Română', 
              message: 'Vă rugăm să vizionați întregul video înainte de a continua',
              btn: 'Continuă către înregistrare',
              fullscreen: 'Ecran complet'
            }
          };
          
          const t = translations[langue] || translations.bg;
          document.getElementById('langue-selectionnee').textContent = t.header;
          document.getElementById('message-text').textContent = t.message;
          document.getElementById('btn-continuer-text').textContent = t.btn;
          document.getElementById('fullscreen-text').textContent = t.fullscreen;
          
          // URLs des vidéos par langue (9 langues disponibles !)
          const videoUrls = {
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
          
          // Fonction pour simuler la fin de vidéo (pour les tests)
          window.simulerFinVideo = function() {
            console.log('Simulation : vidéo terminée');
            videoCompleted();
          };
          
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
                  // Lock orientation en paysage si disponible (Android)
                  if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(() => {
                      console.log('Orientation lock not supported');
                    });
                  }
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
          
          // Si une vidéo existe pour cette langue
          if (videoUrls[langue]) {
            videoSource.src = videoUrls[langue];
            video.load();
            
            // Attendre que les métadonnées soient chargées
            video.addEventListener('loadedmetadata', function() {
              console.log('✅ Vidéo chargée:', langue, '(' + Math.round(video.duration) + 's)');
              placeholder.classList.add('hidden');
              video.classList.remove('hidden');
              fullscreenBtn.classList.remove('hidden');
            });
            
            // Gestion des erreurs
            video.addEventListener('error', function(e) {
              console.error('❌ Erreur chargement vidéo:', e);
              placeholder.querySelector('p').textContent = 'Erreur de chargement. Utilisez le bouton TEST.';
            });
            
            // Mise à jour de la progression
            video.addEventListener('timeupdate', function() {
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
            
            // Empêcher de skip la vidéo
            video.addEventListener('seeking', function() {
              if (video.currentTime > video.duration - 5) {
                return;
              }
              if (video.currentTime > (this.dataset.lastTime || 0)) {
                video.currentTime = this.dataset.lastTime || 0;
              }
            });
            
            video.addEventListener('timeupdate', function() {
              this.dataset.lastTime = this.currentTime;
            });
            
            console.log('✅ Vidéo prête. Cliquez sur PLAY pour démarrer.');
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
