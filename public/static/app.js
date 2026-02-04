// GXO Intranet - Interactive Checklists and Features

// ========================================
// VIEWPORT MODE TOGGLE - Desktop/Mobile
// ========================================

function toggleViewportMode() {
  const body = document.body;
  const icon = document.getElementById('viewport-icon');
  const button = document.getElementById('viewport-toggle');
  
  body.classList.toggle('mobile-mode');
  
  if (body.classList.contains('mobile-mode')) {
    // Mode Mobile
    icon.className = 'fas fa-desktop';
    button.title = 'Passer en mode ordinateur';
    localStorage.setItem('viewportMode', 'mobile');
    
    // Ajuster les éléments pour mobile
    optimizeForMobile();
  } else {
    // Mode Desktop
    icon.className = 'fas fa-mobile-alt';
    button.title = 'Passer en mode portable';
    localStorage.setItem('viewportMode', 'desktop');
    
    // Restaurer les éléments desktop
    restoreDesktopLayout();
  }
}

// Optimiser l'interface pour mobile
function optimizeForMobile() {
  // Rendre les grilles en une colonne
  const grids = document.querySelectorAll('.grid');
  grids.forEach(grid => {
    grid.style.gridTemplateColumns = '1fr';
  });
  
  // Rendre les flex en colonne
  const flexContainers = document.querySelectorAll('.flex.space-x-4, .flex.gap-4');
  flexContainers.forEach(flex => {
    if (!flex.classList.contains('items-center')) {
      flex.style.flexDirection = 'column';
    }
  });
  
  // Élargir les boutons
  const buttons = document.querySelectorAll('button:not(.viewport-toggle)');
  buttons.forEach(btn => {
    if (!btn.classList.contains('w-full')) {
      btn.style.width = '100%';
    }
  });
}

// Restaurer le layout desktop
function restoreDesktopLayout() {
  // Restaurer les grilles
  const grids = document.querySelectorAll('.grid');
  grids.forEach(grid => {
    grid.style.gridTemplateColumns = '';
  });
  
  // Restaurer les flex
  const flexContainers = document.querySelectorAll('.flex.space-x-4, .flex.gap-4');
  flexContainers.forEach(flex => {
    flex.style.flexDirection = '';
  });
  
  // Restaurer les boutons
  const buttons = document.querySelectorAll('button:not(.viewport-toggle)');
  buttons.forEach(btn => {
    btn.style.width = '';
  });
}

// Restaurer le mode au chargement
document.addEventListener('DOMContentLoaded', function() {
  const savedMode = localStorage.getItem('viewportMode');
  if (savedMode === 'mobile') {
    document.body.classList.add('mobile-mode');
    const icon = document.getElementById('viewport-icon');
    const button = document.getElementById('viewport-toggle');
    if (icon) icon.className = 'fas fa-desktop';
    if (button) button.title = 'Passer en mode ordinateur';
    
    // Appliquer les optimisations mobile
    setTimeout(() => optimizeForMobile(), 100);
  }
});

// ========================================
// BIBLIOTHEQUE - Document Preview
// ========================================

function openDocumentPreview(filename, type, title) {
  const modal = document.getElementById('preview-modal');
  const titleEl = document.getElementById('preview-title');
  const contentEl = document.getElementById('preview-content');
  const downloadBtn = document.getElementById('preview-download-btn');
  
  // Update title and download button
  titleEl.textContent = title;
  downloadBtn.href = `/static/documents/${filename}`;
  downloadBtn.download = filename;
  
  // Clear previous content
  contentEl.innerHTML = '';
  
  const documentUrl = `/static/documents/${filename}`;
  
  if (type === 'pdf') {
    // PDF: Use iframe for direct viewing
    contentEl.innerHTML = `
      <iframe 
        src="${documentUrl}" 
        class="w-full h-full border-0"
        title="${title}"
      ></iframe>
    `;
  } else if (type === 'docx') {
    // Word: Use Microsoft Office Online Viewer
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + documentUrl)}`;
    contentEl.innerHTML = `
      <div class="w-full h-full flex flex-col">
        <iframe 
          src="${officeViewerUrl}" 
          class="w-full h-full border-0"
          title="${title}"
        ></iframe>
        <div class="p-4 bg-yellow-50 border-t border-yellow-200 text-sm text-yellow-800">
          <i class="fas fa-info-circle mr-2"></i>
          Si l'aperçu ne s'affiche pas, cliquez sur "Télécharger" pour ouvrir le document localement.
        </div>
      </div>
    `;
  } else if (type === 'xlsx' || type === 'xltm') {
    // Excel: Use Microsoft Office Online Viewer
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + documentUrl)}`;
    contentEl.innerHTML = `
      <div class="w-full h-full flex flex-col">
        <iframe 
          src="${officeViewerUrl}" 
          class="w-full h-full border-0"
          title="${title}"
        ></iframe>
        <div class="p-4 bg-yellow-50 border-t border-yellow-200 text-sm text-yellow-800">
          <i class="fas fa-info-circle mr-2"></i>
          Si l'aperçu ne s'affiche pas, cliquez sur "Télécharger" pour ouvrir le document localement.
        </div>
      </div>
    `;
  } else {
    // Fallback for unsupported types
    contentEl.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-center p-8">
          <i class="fas fa-file text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-bold text-gray-700 mb-2">Aperçu non disponible</h3>
          <p class="text-gray-600 mb-4">Ce type de fichier ne peut pas être prévisualisé dans le navigateur.</p>
          <a 
            href="${documentUrl}"
            download="${filename}"
            class="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF8555] transition-colors"
          >
            <i class="fas fa-download mr-2"></i>Télécharger le document
          </a>
        </div>
      </div>
    `;
  }
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  const modal = document.getElementById('preview-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Close preview with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('preview-modal');
    if (modal && !modal.classList.contains('hidden')) {
      closePreview();
    }
  }
});

// ========================================
// BIBLIOTHEQUE - Search and Filter
// ========================================

function filterDocuments() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase().trim();
  const documentCards = document.querySelectorAll('.document-card');
  const noResults = document.getElementById('no-results');
  let visibleCount = 0;

  documentCards.forEach(card => {
    const name = card.dataset.name || '';
    const category = card.dataset.category || '';
    const keywords = card.dataset.keywords || '';
    const description = card.dataset.description || '';
    
    const matches = !searchTerm || 
      name.includes(searchTerm) || 
      category.toLowerCase().includes(searchTerm) ||
      keywords.includes(searchTerm) ||
      description.includes(searchTerm);
    
    if (matches) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Show/hide no results message
  if (visibleCount === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }
}

function filterByCategory(category) {
  const searchInput = document.getElementById('search-input');
  searchInput.value = ''; // Clear search
  
  const documentCards = document.querySelectorAll('.document-card');
  const noResults = document.getElementById('no-results');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let visibleCount = 0;

  // Update button states
  filterButtons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('ring-4', 'ring-opacity-50');
      btn.classList.add(category === 'all' ? 'ring-gray-300' : 
                       category === 'Réception' ? 'ring-blue-300' :
                       category === 'IPL' ? 'ring-green-300' :
                       category === 'Préparation' ? 'ring-purple-300' :
                       category === "Chef d'équipe" ? 'ring-orange-300' : 'ring-red-300');
    } else {
      btn.classList.remove('ring-4', 'ring-opacity-50', 'ring-gray-300', 'ring-blue-300', 'ring-green-300', 'ring-purple-300', 'ring-orange-300', 'ring-red-300');
    }
  });

  documentCards.forEach(card => {
    const cardCategory = card.dataset.category;
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Show/hide no results message
  if (visibleCount === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }
}

function clearSearch() {
  const searchInput = document.getElementById('search-input');
  searchInput.value = '';
  filterByCategory('all');
}

// ========================================
// CHECKLISTS - Interactive Features
// ========================================

// Toggle FAQ items
function toggleFaq(index) {
  const content = document.getElementById(`faq-content-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    content.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

// Show interactive checklist
function showChecklistInteractive(processId, checklistItems) {
  const modal = document.getElementById('modal-container');
  const modalContent = document.getElementById('modal-content');
  
  let checklistHtml = `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-800 flex items-center">
          <i class="fas fa-list-check mr-3 text-green-500"></i>
          Checklist interactive
        </h3>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p class="text-sm text-blue-800">
          <i class="fas fa-info-circle mr-2"></i>
          Cochez chaque étape au fur et à mesure de votre progression
        </p>
      </div>
      
      <div class="space-y-3" id="checklist-items">
  `;
  
  checklistItems.forEach((item, index) => {
    checklistHtml += `
      <div class="checklist-item bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 transition-all cursor-pointer" onclick="toggleChecklistItem(${index})">
        <label class="flex items-start cursor-pointer">
          <input type="checkbox" id="check-${index}" class="mt-1 mr-4 w-5 h-5 text-green-500 rounded focus:ring-green-500" onchange="updateProgress()">
          <span class="flex-1 text-gray-700">
            <span class="font-semibold text-gray-800">${index + 1}.</span> ${item}
          </span>
        </label>
      </div>
    `;
  });
  
  checklistHtml += `
      </div>
      
      <div class="mt-6 bg-gray-100 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-700">Progression</span>
          <span id="progress-text" class="text-sm font-bold text-green-600">0 / ${checklistItems.length}</span>
        </div>
        <div class="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div id="progress-bar" class="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300" style="width: 0%"></div>
        </div>
      </div>
      
      <div class="mt-6 flex gap-3">
        <button onclick="printChecklist()" class="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
          <i class="fas fa-print mr-2"></i>Imprimer
        </button>
        <button onclick="resetChecklist(${checklistItems.length})" class="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
          <i class="fas fa-redo mr-2"></i>Réinitialiser
        </button>
        <button onclick="closeModal()" class="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
          <i class="fas fa-check mr-2"></i>Terminer
        </button>
      </div>
    </div>
  `;
  
  modalContent.innerHTML = checklistHtml;
  modal.classList.remove('hidden');
  
  // Add click outside to close
  modal.onclick = function(e) {
    if (e.target === modal) {
      closeModal();
    }
  }
}

// Toggle checklist item
function toggleChecklistItem(index) {
  const checkbox = document.getElementById(`check-${index}`);
  checkbox.checked = !checkbox.checked;
  updateProgress();
}

// Update progress bar
function updateProgress() {
  const checkboxes = document.querySelectorAll('#checklist-items input[type="checkbox"]');
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percentage = (checked / total) * 100;
  
  document.getElementById('progress-bar').style.width = percentage + '%';
  document.getElementById('progress-text').textContent = `${checked} / ${total}`;
  
  // Update checklist item styles
  checkboxes.forEach((checkbox, index) => {
    const item = checkbox.closest('.checklist-item');
    if (checkbox.checked) {
      item.classList.add('checked', 'bg-green-50', 'border-green-500');
      item.classList.remove('bg-white', 'border-gray-200');
    } else {
      item.classList.remove('checked', 'bg-green-50', 'border-green-500');
      item.classList.add('bg-white', 'border-gray-200');
    }
  });
  
  // Celebration animation when all checked
  if (checked === total && total > 0) {
    confetti();
  }
}

// Reset checklist
function resetChecklist(total) {
  for (let i = 0; i < total; i++) {
    const checkbox = document.getElementById(`check-${i}`);
    if (checkbox) {
      checkbox.checked = false;
    }
  }
  updateProgress();
}

// Print checklist
function printChecklist() {
  window.print();
}

// Simple confetti effect
function confetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    const timeLeft = end - Date.now();
    
    if (timeLeft <= 0) return;
    
    const particleCount = 2;
    
    // Create confetti
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '10px';
      particle.style.height = '10px';
      particle.style.background = ['#ff6b35', '#003da5', '#00cc88', '#ffd700'][Math.floor(Math.random() * 4)];
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = '-10px';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      document.body.appendChild(particle);
      
      const animation = particle.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 1500 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      animation.onfinish = () => particle.remove();
    }
    
    requestAnimationFrame(frame);
  }());
}

// Close modal
function closeModal() {
  const modal = document.getElementById('modal-container');
  modal.classList.add('hidden');
}

// Show decision tree (placeholder for now)
function showDecisionTree(processId) {
  alert('Arbre de décision pour: ' + processId + '\n\nCette fonctionnalité sera bientôt disponible avec des diagrammes interactifs.');
}

// Show basic checklist (non-interactive)
function showChecklist(processId) {
  alert('Checklist pour: ' + processId + '\n\nConsultez le document associé pour voir la procédure détaillée.');
}

// Smooth scroll to anchors
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
      closeModal();
    }
    
    // Ctrl+H to go home
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault();
      window.location.href = '/';
    }
  });
  
  // Add service worker for offline support (optional)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail - not critical
    });
  }
});

// Print-friendly styles
const style = document.createElement('style');
style.textContent = `
  @media print {
    .no-print {
      display: none !important;
    }
    body {
      background: white !important;
    }
    .checklist-item {
      page-break-inside: avoid;
      border: 1px solid #ccc !important;
      background: white !important;
    }
  }
`;
document.head.appendChild(style);

// Make functions globally available
window.toggleFaq = toggleFaq;
window.showChecklistInteractive = showChecklistInteractive;
window.toggleChecklistItem = toggleChecklistItem;
window.updateProgress = updateProgress;
window.resetChecklist = resetChecklist;
window.printChecklist = printChecklist;
window.closeModal = closeModal;
window.showDecisionTree = showDecisionTree;
window.showChecklist = showChecklist;
window.openDocumentPreview = openDocumentPreview;
window.closePreview = closePreview;
window.filterDocuments = filterDocuments;
window.filterByCategory = filterByCategory;
window.clearSearch = clearSearch;
window.toggleViewportMode = toggleViewportMode;

console.log('GXO Intranet loaded successfully ✓');
