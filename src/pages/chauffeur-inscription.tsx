import { getWorkflowTranslation } from '../translations-workflow';

interface Props {
  lang: string;
}

export function ChauffeurInscriptionPage({ lang }: Props) {
  const t = getWorkflowTranslation(lang);
  
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.inscriptionTitre} - GXO Logistics</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <!-- Header -->
  <div class="bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] p-4 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <img src="/static/gxo-logo-official.svg" alt="GXO" class="h-10">
      <div class="text-white font-bold text-lg">${t.inscriptionTitre}</div>
    </div>
  </div>

  <!-- Conteneur principal -->
  <div class="container mx-auto p-4 max-w-lg">
    <div class="bg-white rounded-2xl shadow-xl p-8 my-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-3">
        <i class="fas fa-user-plus text-[#FF5A1A]"></i>
        <span>${t.inscriptionTitre}</span>
      </h2>
      <p class="text-center text-gray-600 mb-6">${t.inscriptionSousTitre}</p>

      <form id="form-inscription" class="space-y-5">
        <!-- Pseudo / Nom -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            <i class="fas fa-user mr-2 text-[#FF5A1A]"></i>
            ${t.nomComplet}
          </label>
          <input 
            type="text" 
            id="pseudo" 
            name="pseudo"
            placeholder="Entrez votre nom..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors"
          />
        </div>

        <!-- Entreprise -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            <i class="fas fa-building mr-2 text-[#FF5A1A]"></i>
            ${t.entreprise}
          </label>
          <input 
            type="text" 
            id="entreprise" 
            name="entreprise"
            placeholder="Nom de votre entreprise..."
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors"
          />
        </div>

        <!-- Numéro de Quai -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            <i class="fas fa-warehouse mr-2 text-[#FF5A1A]"></i>
            Numéro de quai attribué
          </label>
          <select 
            id="numero-quai" 
            name="numero_quai"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#FF5A1A] focus:outline-none transition-colors text-lg"
          >
            <option value="">-- Sélectionner un quai --</option>
            ${Array.from({ length: 30 }, (_, i) => `<option value="Q${i + 1}">Quai ${i + 1}</option>`).join('')}
          </select>
        </div>

        <!-- Message d'erreur -->
        <div id="error-message" class="hidden bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div class="flex">
            <i class="fas fa-exclamation-triangle text-red-500 mr-3 mt-0.5"></i>
            <p class="text-sm text-red-700">${t.erreurChamps}</p>
          </div>
        </div>

        <!-- Bouton de soumission -->
        <button 
          type="submit"
          id="btn-submit"
          class="w-full bg-gradient-to-r from-[#FF5A1A] to-[#FF4500] text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="fas fa-check-circle mr-2"></i>
          ${t.btnValider}
        </button>
      </form>
    </div>
  </div>

  <!-- Footer -->
  <div class="bg-gray-900 text-gray-400 text-center p-4 text-sm">
    <p>© 2026 GXO Logistics</p>
  </div>

  <script>
    const lang = '${lang}';
    const form = document.getElementById('form-inscription');
    const btnSubmit = document.getElementById('btn-submit');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Désactiver le bouton pendant l'envoi
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>${t.chargement}...';
      
      // Cacher le message d'erreur
      errorMessage.classList.add('hidden');

      const formData = new FormData(form);
      const data = {
        pseudo: formData.get('pseudo') || '',
        entreprise: formData.get('entreprise') || '',
        numero_quai: formData.get('numero_quai') || '',
        langue: lang,
        video_completed: 1
      };

      try {
        const response = await fetch('/api/chauffeur/inscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.id) {
          // Rediriger vers la page des tâches avec l'ID du chauffeur
          window.location.href = \`/chauffeur/taches?id=\${result.id}&lang=\${lang}\`;
        } else {
          throw new Error(result.error || 'Erreur inscription');
        }
      } catch (error) {
        console.error('Erreur:', error);
        errorMessage.classList.remove('hidden');
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fas fa-check-circle mr-2"></i>${t.btnValider}';
      }
    });
  </script>
</body>
</html>`;
}
