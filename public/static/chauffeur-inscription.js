// Chauffeur Inscription
// Page: /chauffeur/inscription

document.getElementById('form-inscription').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const pseudo = document.getElementById('pseudo').value.trim();
  const entreprise = document.getElementById('entreprise').value.trim();
  const numero_quai = document.getElementById('numero-quai').value.trim();
  const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
  
  if (!pseudo || !entreprise) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  try {
    const response = await fetch('/api/chauffeur/inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pseudo,
        entreprise,
        numero_quai,
        langue,
        video_completed: true
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Sauvegarder l'ID du chauffeur
      sessionStorage.setItem('chauffeur_id', data.id);
      sessionStorage.setItem('chauffeur_pseudo', pseudo);
      
      // Rediriger vers la page des tâches
      window.location.href = `/chauffeur/taches?id=${data.id}`;
    } else {
      alert('❌ Erreur lors de l\'inscription : ' + (data.error || 'Erreur inconnue'));
    }
  } catch (error) {
    console.error('Erreur inscription:', error);
    alert('❌ Erreur réseau. Veuillez réessayer.');
  }
});
