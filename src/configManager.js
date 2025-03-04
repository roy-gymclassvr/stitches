const fs = require('fs-extra');
const path = require('path');

/**
 * @param {string} guildId
 * @returns {Promise<Object|null>}
 */
async function getConfig(guildId) {
    const configPath = path.join(__dirname, '..', 'databases', guildId, 'config.json');
    try {
        if (await fs.pathExists(configPath)) {
            const config = await fs.readJson(configPath);
            return config;
        } else {
            console.warn(`Config file not found for guild ${guildId}.`);
            return null;
        }
    } catch (error) {
        console.error("Error reading configuration from JSON file:", error);
        throw error;
    }
}

/**
 * @param {string} guildId
 * @param {Object} config
 * @returns {Promise<void>}
 */
async function saveConfig(guildId, config) {
    const configPath = path.join(__dirname, '..', 'databases', guildId, 'config.json');
    try {
        await fs.writeJson(configPath, config, { spaces: 2 });
    } catch (error) {
        console.error("Error saving configuration to JSON file:", error);
        throw error;
    }
}

/**
 * @param {Object} config
 */
function ensureConfigStructure(config) {
    if (!config.streakSystem) {
        config.streakSystem = {
            enabled: false,
            streakThreshold: 10,
        };
    }
    if (!config.messageLeaderSystem) {
        config.messageLeaderSystem = {
            enabled: false,
        };
    }
    if (!config.levelSystem) {
        config.levelSystem = {
            enabled: false,
            xpPerMessage: 10,
            levelMultiplier: 1.5,
            rewards: {},
        };
    }
    if (!config.reportSettings) {
        config.reportSettings = {
            weeklyReportChannel: "",
            monthlyReportChannel: ""
        };
    }
}

module.exports = { getConfig, saveConfig, ensureConfigStructure };