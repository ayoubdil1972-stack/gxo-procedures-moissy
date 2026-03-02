// Chauffeur Inscription
// Page: /chauffeur/inscription

// ===== TRADUCTIONS MULTILINGUES =====
const translations = {
  fr: {
    headerTitle: 'Inscription',
    pageTitle: 'Inscription Chauffeur',
    labelPseudo: 'Pseudo / Nom',
    labelEntreprise: 'Entreprise de transport',
    labelQuai: 'Numéro de quai attribué',
    optionSelect: '-- Sélectionner --',
    btnValider: 'Valider et Commencer',
    infoMessage: 'Après validation, vous accéderez à vos tâches de déchargement',
    alertChamps: 'Veuillez remplir tous les champs obligatoires',
    alertErreur: 'Erreur lors de l\'inscription',
    alertReseau: 'Erreur réseau. Veuillez réessayer.'
  },
  en: {
    headerTitle: 'Registration',
    pageTitle: 'Driver Registration',
    labelPseudo: 'Username / Name',
    labelEntreprise: 'Transport Company',
    labelQuai: 'Assigned dock number',
    optionSelect: '-- Select --',
    btnValider: 'Validate and Start',
    infoMessage: 'After validation, you will access your unloading tasks',
    alertChamps: 'Please fill in all required fields',
    alertErreur: 'Registration error',
    alertReseau: 'Network error. Please try again.'
  },
  nl: {
    headerTitle: 'Registratie',
    pageTitle: 'Bestuurder Registratie',
    labelPseudo: 'Gebruikersnaam / Naam',
    labelEntreprise: 'Transportbedrijf',
    labelQuai: 'Toegewezen kade nummer',
    optionSelect: '-- Selecteren --',
    btnValider: 'Valideren en Beginnen',
    infoMessage: 'Na validatie heeft u toegang tot uw lostaken',
    alertChamps: 'Vul alle verplichte velden in',
    alertErreur: 'Registratiefout',
    alertReseau: 'Netwerkfout. Probeer het opnieuw.'
  },
  fi: {
    headerTitle: 'Rekisteröinti',
    pageTitle: 'Kuljettajan Rekisteröinti',
    labelPseudo: 'Käyttäjänimi / Nimi',
    labelEntreprise: 'Kuljetusyritys',
    labelQuai: 'Määrätty laiturinumero',
    optionSelect: '-- Valitse --',
    btnValider: 'Vahvista ja Aloita',
    infoMessage: 'Vahvistuksen jälkeen pääset purkaustehtäviisi',
    alertChamps: 'Täytä kaikki pakolliset kentät',
    alertErreur: 'Rekisteröintivirhe',
    alertReseau: 'Verkkovirhe. Yritä uudelleen.'
  },
  de: {
    headerTitle: 'Registrierung',
    pageTitle: 'Fahrer-Registrierung',
    labelPseudo: 'Benutzername / Name',
    labelEntreprise: 'Transportunternehmen',
    labelQuai: 'Zugewiesene Verladenummer',
    optionSelect: '-- Auswählen --',
    btnValider: 'Bestätigen und Beginnen',
    infoMessage: 'Nach der Bestätigung erhalten Sie Zugang zu Ihren Entladeaufgaben',
    alertChamps: 'Bitte alle Pflichtfelder ausfüllen',
    alertErreur: 'Registrierungsfehler',
    alertReseau: 'Netzwerkfehler. Bitte versuchen Sie es erneut.'
  },
  it: {
    headerTitle: 'Registrazione',
    pageTitle: 'Registrazione Autista',
    labelPseudo: 'Nome utente / Nome',
    labelEntreprise: 'Azienda di trasporto',
    labelQuai: 'Numero banchina assegnato',
    optionSelect: '-- Selezionare --',
    btnValider: 'Convalida e Inizia',
    infoMessage: 'Dopo la convalida, accederai ai tuoi compiti di scarico',
    alertChamps: 'Si prega di compilare tutti i campi obbligatori',
    alertErreur: 'Errore di registrazione',
    alertReseau: 'Errore di rete. Riprova.'
  },
  pl: {
    headerTitle: 'Rejestracja',
    pageTitle: 'Rejestracja Kierowcy',
    labelPseudo: 'Nazwa użytkownika / Imię',
    labelEntreprise: 'Firma transportowa',
    labelQuai: 'Przypisany numer doku',
    optionSelect: '-- Wybierz --',
    btnValider: 'Potwierdź i Rozpocznij',
    infoMessage: 'Po zatwierdzeniu uzyskasz dostęp do swoich zadań rozładunkowych',
    alertChamps: 'Proszę wypełnić wszystkie wymagane pola',
    alertErreur: 'Błąd rejestracji',
    alertReseau: 'Błąd sieci. Spróbuj ponownie.'
  },
  pt: {
    headerTitle: 'Registo',
    pageTitle: 'Registo de Motorista',
    labelPseudo: 'Nome de utilizador / Nome',
    labelEntreprise: 'Empresa de transporte',
    labelQuai: 'Número de cais atribuído',
    optionSelect: '-- Selecionar --',
    btnValider: 'Validar e Começar',
    infoMessage: 'Após validação, acederá às suas tarefas de descarga',
    alertChamps: 'Por favor, preencha todos os campos obrigatórios',
    alertErreur: 'Erro de registo',
    alertReseau: 'Erro de rede. Tente novamente.'
  },
  bg: {
    headerTitle: 'Регистрация',
    pageTitle: 'Регистрация на Шофьор',
    labelPseudo: 'Потребителско име / Име',
    labelEntreprise: 'Транспортна фирма',
    labelQuai: 'Присвоен номер на док',
    optionSelect: '-- Изберете --',
    btnValider: 'Потвърди и Започни',
    infoMessage: 'След потвърждение ще имате достъп до задачите си за разтоварване',
    alertChamps: 'Моля, попълнете всички задължителни полета',
    alertErreur: 'Грешка при регистрация',
    alertReseau: 'Мрежова грешка. Опитайте отново.'
  },
  cs: {
    headerTitle: 'Registrace',
    pageTitle: 'Registrace Řidiče',
    labelPseudo: 'Uživatelské jméno / Jméno',
    labelEntreprise: 'Dopravní společnost',
    labelQuai: 'Přidělené číslo doku',
    optionSelect: '-- Vybrat --',
    btnValider: 'Potvrdit a Začít',
    infoMessage: 'Po potvrzení budete mít přístup k úkolům vykládky',
    alertChamps: 'Vyplňte prosím všechna povinná pole',
    alertErreur: 'Chyba registrace',
    alertReseau: 'Chyba sítě. Zkuste to znovu.'
  },
  da: {
    headerTitle: 'Tilmelding',
    pageTitle: 'Chauffør Tilmelding',
    labelPseudo: 'Brugernavn / Navn',
    labelEntreprise: 'Transportfirma',
    labelQuai: 'Tildelt kaj nummer',
    optionSelect: '-- Vælg --',
    btnValider: 'Bekræft og Begynd',
    infoMessage: 'Efter bekræftelse får du adgang til dine aflæsningsopgaver',
    alertChamps: 'Udfyld venligst alle obligatoriske felter',
    alertErreur: 'Registreringsfejl',
    alertReseau: 'Netværksfejl. Prøv igen.'
  },
  hr: {
    headerTitle: 'Registracija',
    pageTitle: 'Registracija Vozača',
    labelPseudo: 'Korisničko ime / Ime',
    labelEntreprise: 'Prijevoznička tvrtka',
    labelQuai: 'Dodijeljeni broj dokova',
    optionSelect: '-- Odaberi --',
    btnValider: 'Potvrdi i Započni',
    infoMessage: 'Nakon potvrde pristupiti ćete svojim zadacima istovara',
    alertChamps: 'Molimo ispunite sva obavezna polja',
    alertErreur: 'Greška registracije',
    alertReseau: 'Mrežna greška. Pokušajte ponovno.'
  },
  ro: {
    headerTitle: 'Înregistrare',
    pageTitle: 'Înregistrare Șofer',
    labelPseudo: 'Nume utilizator / Nume',
    labelEntreprise: 'Companie de transport',
    labelQuai: 'Număr cheu atribuit',
    optionSelect: '-- Selectați --',
    btnValider: 'Validează și Începe',
    infoMessage: 'După validare, veți accesa sarcinile dvs. de descărcare',
    alertChamps: 'Vă rugăm să completați toate câmpurile obligatorii',
    alertErreur: 'Eroare de înregistrare',
    alertReseau: 'Eroare de rețea. Vă rugăm să încercați din nou.'
  }
};

// Appliquer les traductions au chargement
function appliquerTraductions() {
  const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
  const t = translations[langue] || translations.fr;
  
  // Mettre à jour tous les éléments
  document.getElementById('header-titre').textContent = t.headerTitle;
  document.getElementById('titre-inscription').textContent = t.pageTitle;
  document.getElementById('label-pseudo').textContent = t.labelPseudo;
  document.getElementById('label-entreprise').textContent = t.labelEntreprise;
  document.getElementById('label-quai').textContent = t.labelQuai;
  document.getElementById('option-select').textContent = t.optionSelect;
  document.getElementById('btn-valider').textContent = t.btnValider;
  document.getElementById('info-message').textContent = t.infoMessage;
  
  // Stocker les traductions pour les messages d'erreur
  window.t = t;
}

// Appliquer au chargement
document.addEventListener('DOMContentLoaded', appliquerTraductions);

document.getElementById('form-inscription').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const pseudo = document.getElementById('pseudo').value.trim();
  const entreprise = document.getElementById('entreprise').value.trim();
  const numero_quai = document.getElementById('numero-quai').value.trim();
  const langue = sessionStorage.getItem('chauffeur_langue') || 'fr';
  
  if (!pseudo || !entreprise) {
    alert(window.t.alertChamps);
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
      alert('❌ ' + window.t.alertErreur + ' : ' + (data.error || 'Erreur inconnue'));
    }
  } catch (error) {
    console.error('Erreur inscription:', error);
    alert('❌ ' + window.t.alertReseau);
  }
});
