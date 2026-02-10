export function ChauffeurVideoPage() {
  return (
    <div class="min-h-screen bg-black flex flex-col">
      {/* Header fixe */}
      <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
        <div class="container mx-auto flex items-center justify-between">
          <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10" />
          <div class="text-white font-bold" id="langue-selectionnee"></div>
        </div>
      </div>

      {/* Conteneur vidéo */}
      <div class="flex-1 flex items-center justify-center p-4">
        <div class="w-full max-w-4xl">
          {/* Placeholder vidéo - vous ajouterez vos vidéos ici */}
          <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style="padding-bottom: 56.25%;">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <video 
                  id="video-instructions" 
                  class="w-full h-full"
                  controlsList="nodownload"
                  disablePictureInPicture
                  onContextMenu="return false;"
                >
                  <source src="" type="video/mp4" id="video-source" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                
                {/* Placeholder si pas de vidéo */}
                <div id="video-placeholder" class="p-8">
                  <i class="fas fa-video text-6xl text-gray-600 mb-4"></i>
                  <p class="text-white text-xl mb-2">Vidéo d'instructions</p>
                  <p class="text-gray-400 text-sm">La vidéo sera ajoutée ici</p>
                  
                  {/* Bouton de simulation pour test */}
                  <button 
                    onclick="simulerFinVideo()"
                    class="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i class="fas fa-forward mr-2"></i>
                    Simuler fin de vidéo (TEST)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div class="mt-4 bg-gray-800 rounded-full h-3 overflow-hidden">
            <div 
              id="progress-bar" 
              class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] h-full transition-all duration-300"
              style="width: 0%"
            ></div>
          </div>

          {/* Timer */}
          <div class="text-center mt-3 text-gray-400 text-sm" id="video-timer">
            00:00 / 00:00
          </div>

          {/* Message bloquant */}
          <div id="message-bloquant" class="mt-6 bg-yellow-500 text-black p-4 rounded-lg text-center font-semibold">
            <i class="fas fa-lock mr-2"></i>
            Veuillez regarder la vidéo complète avant de continuer
          </div>

          {/* Bouton continuer (masqué par défaut) */}
          <div id="btn-continuer-container" class="hidden mt-6 text-center">
            <a 
              href="/chauffeur/inscription"
              class="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
            >
              <i class="fas fa-check-circle mr-2"></i>
              Continuer vers l'inscription
            </a>
          </div>
        </div>
      </div>

      {/* Script de contrôle vidéo */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Récupérer la langue depuis l'URL
          const urlParams = new URLSearchParams(window.location.search);
          const langue = urlParams.get('lang') || 'fr';
          
          // Stocker la langue pour la suite
          sessionStorage.setItem('chauffeur_langue', langue);
          
          // Afficher la langue sélectionnée
          const langueNoms = {
            'fr': '🇫🇷 Français',
            'en': '🇬🇧 English',
            'es': '🇪🇸 Español',
            'pl': '🇵🇱 Polski',
            'de': '🇩🇪 Deutsch',
            'it': '🇮🇹 Italiano'
          };
          document.getElementById('langue-selectionnee').textContent = langueNoms[langue] || langue;
          
          // URLs des vidéos par langue (à remplir plus tard)
          const videoUrls = {
            'fr': '/static/videos/instructions-fr.mp4',
            'en': '/static/videos/instructions-en.mp4',
            'es': '/static/videos/instructions-es.mp4',
            'pl': '/static/videos/instructions-pl.mp4',
            'de': '/static/videos/instructions-de.mp4',
            'it': '/static/videos/instructions-it.mp4'
          };
          
          const video = document.getElementById('video-instructions');
          const videoSource = document.getElementById('video-source');
          const progressBar = document.getElementById('progress-bar');
          const videoTimer = document.getElementById('video-timer');
          const messageBloquant = document.getElementById('message-bloquant');
          const btnContinuerContainer = document.getElementById('btn-continuer-container');
          const placeholder = document.getElementById('video-placeholder');
          
          // Fonction pour simuler la fin de vidéo (pour les tests)
          window.simulerFinVideo = function() {
            console.log('Simulation : vidéo terminée');
            videoCompleted();
          };
          
          // Fonction appelée quand la vidéo est terminée
          function videoCompleted() {
            progressBar.style.width = '100%';
            messageBloquant.classList.add('hidden');
            btnContinuerContainer.classList.remove('hidden');
            sessionStorage.setItem('video_completed', 'true');
          }
          
          // Si une vidéo existe pour cette langue
          if (videoUrls[langue] && videoUrls[langue] !== '/static/videos/instructions-' + langue + '.mp4') {
            videoSource.src = videoUrls[langue];
            video.load();
            placeholder.classList.add('hidden');
            video.classList.remove('hidden');
            
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
                // Autoriser les 5 dernières secondes
                return;
              }
              // Empêcher de sauter en avant
              if (video.currentTime > this.dataset.lastTime || 0) {
                video.currentTime = this.dataset.lastTime || 0;
              }
            });
            
            video.addEventListener('timeupdate', function() {
              this.dataset.lastTime = this.currentTime;
            });
            
            // Lancer la vidéo
            video.play();
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
          
          // Autoriser de quitter quand on clique sur "Continuer"
          btnContinuerContainer.addEventListener('click', function() {
            canLeave = true;
          });
          
          // Empêcher le back button pendant la vidéo
          history.pushState(null, null, location.href);
          window.addEventListener('popstate', function() {
            if (!sessionStorage.getItem('video_completed')) {
              history.pushState(null, null, location.href);
              alert('Veuillez terminer la vidéo avant de continuer.');
            }
          });
        `
      }} />
    </div>
  )
}
