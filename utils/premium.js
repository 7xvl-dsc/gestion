
const premiumUsers = new Set();

// Simuler une base de données de users premium
const MOCK_PREMIUM_USERS = ['123456789', '987654321']; // Remplacer par vos IDs

module.exports = {
  isPremium: (userId) => {
    return premiumUsers.has(userId) || MOCK_PREMIUM_USERS.includes(userId);
  },
  
  addPremium: (userId) => {
    premiumUsers.add(userId);
  },
  
  removePremium: (userId) => {
    premiumUsers.delete(userId);
  }
};
