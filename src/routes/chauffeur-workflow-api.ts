import { Context } from 'hono';

type Bindings = {
  DB: D1Database;
};

// Routes API pour le nouveau workflow chauffeur

// POST /api/chauffeurs/inscription - Enregistrer un nouveau chauffeur
export async function inscriptionChauffeur(c: Context<{ Bindings: Bindings }>) {
  try {
    const { nom, entreprise, telephone, plaque, type_camion, langue } = await c.req.json();

    // Validation
    if (!nom || !entreprise || !telephone || !plaque || !type_camion) {
      return c.json({ error: 'Tous les champs sont obligatoires' }, 400);
    }

    // Insertion dans la base de données
    const result = await c.env.DB.prepare(`
      INSERT INTO chauffeurs_v2 (
        nom, entreprise, telephone, plaque, type_camion, langue, 
        statut, date_arrivee
      )
      VALUES (?, ?, ?, ?, ?, ?, 'actif', CURRENT_TIMESTAMP)
    `).bind(nom, entreprise, telephone, plaque, type_camion, langue || 'fr').run();

    const chauffeurId = result.meta.last_row_id;

    return c.json({ 
      success: true, 
      id: chauffeurId,
      message: 'Inscription réussie'
    });
  } catch (error) {
    console.error('Erreur inscription chauffeur:', error);
    return c.json({ error: 'Erreur lors de l\'inscription' }, 500);
  }
}

// GET /api/chauffeurs/:id - Récupérer les informations d'un chauffeur
export async function getChauffeur(c: Context<{ Bindings: Bindings }>) {
  try {
    const chauffeurId = c.req.param('id');

    const result = await c.env.DB.prepare(`
      SELECT id, nom, entreprise, telephone, plaque, type_camion, langue, statut, date_arrivee
      FROM chauffeurs_v2
      WHERE id = ?
    `).bind(chauffeurId).first();

    if (!result) {
      return c.json({ error: 'Chauffeur non trouvé' }, 404);
    }

    return c.json(result);
  } catch (error) {
    console.error('Erreur récupération chauffeur:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// GET /api/chauffeurs/:id/taches - Récupérer les tâches d'un chauffeur
export async function getTachesChauffeur(c: Context<{ Bindings: Bindings }>) {
  try {
    const chauffeurId = c.req.param('id');

    // Tâches en cours
    const tachesEnCours = await c.env.DB.prepare(`
      SELECT id, type, quai, porte, statut, heure_debut, heure_fin
      FROM taches_v2
      WHERE chauffeur_id = ? AND statut = 'en_cours'
      ORDER BY heure_debut DESC
    `).bind(chauffeurId).all();

    // Tâches terminées
    const tachesTerminees = await c.env.DB.prepare(`
      SELECT id, type, quai, porte, statut, heure_debut, heure_fin
      FROM taches_v2
      WHERE chauffeur_id = ? AND statut = 'termine'
      ORDER BY heure_fin DESC
      LIMIT 10
    `).bind(chauffeurId).all();

    return c.json({
      taches_en_cours: tachesEnCours.results || [],
      taches_terminees: tachesTerminees.results || []
    });
  } catch (error) {
    console.error('Erreur récupération tâches:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// POST /api/taches/:id/completer - Marquer une tâche comme terminée
export async function completerTache(c: Context<{ Bindings: Bindings }>) {
  try {
    const tacheId = c.req.param('id');

    await c.env.DB.prepare(`
      UPDATE taches_v2
      SET statut = 'termine', heure_fin = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(tacheId).run();

    return c.json({ success: true, message: 'Tâche terminée' });
  } catch (error) {
    console.error('Erreur complétion tâche:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// GET /api/chauffeurs/:id/messages - Récupérer les messages d'un chauffeur
export async function getMessagesChauffeur(c: Context<{ Bindings: Bindings }>) {
  try {
    const chauffeurId = c.req.param('id');

    const result = await c.env.DB.prepare(`
      SELECT id, expediteur, message, date_envoi, vu
      FROM messages_v2
      WHERE chauffeur_id = ?
      ORDER BY date_envoi ASC
    `).bind(chauffeurId).all();

    return c.json({ messages: result.results || [] });
  } catch (error) {
    console.error('Erreur récupération messages:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// POST /api/messages - Envoyer un message
export async function envoyerMessage(c: Context<{ Bindings: Bindings }>) {
  try {
    const { chauffeur_id, message, expediteur } = await c.req.json();

    if (!chauffeur_id || !message || !expediteur) {
      return c.json({ error: 'Données manquantes' }, 400);
    }

    const result = await c.env.DB.prepare(`
      INSERT INTO messages_v2 (chauffeur_id, expediteur, message, date_envoi, vu)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)
    `).bind(chauffeur_id, expediteur, message).run();

    return c.json({ 
      success: true, 
      id: result.meta.last_row_id,
      message: 'Message envoyé'
    });
  } catch (error) {
    console.error('Erreur envoi message:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// POST /api/messages/:id/marquer-vu - Marquer un message comme vu
export async function marquerMessageVu(c: Context<{ Bindings: Bindings }>) {
  try {
    const messageId = c.req.param('id');

    await c.env.DB.prepare(`
      UPDATE messages_v2
      SET vu = 1
      WHERE id = ?
    `).bind(messageId).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Erreur marquage message:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// GET /api/admin/chauffeurs-actifs - Liste des chauffeurs actifs pour le dashboard admin
export async function getChauffeursActifs(c: Context<{ Bindings: Bindings }>) {
  try {
    const result = await c.env.DB.prepare(`
      SELECT 
        c.id, c.nom, c.entreprise, c.telephone, c.plaque, c.type_camion, 
        c.langue, c.statut, c.date_arrivee,
        COUNT(CASE WHEN t.statut = 'en_cours' THEN 1 END) as taches_en_cours,
        COUNT(CASE WHEN t.statut = 'termine' THEN 1 END) as taches_terminees,
        (SELECT COUNT(*) FROM messages_v2 WHERE chauffeur_id = c.id AND expediteur = 'chauffeur' AND vu = 0) as messages_non_lus
      FROM chauffeurs_v2 c
      LEFT JOIN taches_v2 t ON c.id = t.chauffeur_id
      WHERE c.statut = 'actif'
      GROUP BY c.id
      ORDER BY c.date_arrivee DESC
    `).all();

    return c.json({ chauffeurs: result.results || [] });
  } catch (error) {
    console.error('Erreur récupération chauffeurs actifs:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}

// POST /api/admin/taches/assigner - Assigner une nouvelle tâche à un chauffeur
export async function assignerTache(c: Context<{ Bindings: Bindings }>) {
  try {
    const { chauffeur_id, type, quai, porte } = await c.req.json();

    if (!chauffeur_id || !type || !quai) {
      return c.json({ error: 'Données manquantes' }, 400);
    }

    const result = await c.env.DB.prepare(`
      INSERT INTO taches_v2 (chauffeur_id, type, quai, porte, statut, heure_debut)
      VALUES (?, ?, ?, ?, 'en_cours', CURRENT_TIMESTAMP)
    `).bind(chauffeur_id, type, quai, porte || null).run();

    return c.json({ 
      success: true, 
      id: result.meta.last_row_id,
      message: 'Tâche assignée'
    });
  } catch (error) {
    console.error('Erreur assignation tâche:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}
