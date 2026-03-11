import { PluginSettingTab, App } from "obsidian";
import type { GeminiHelperPlugin } from "src/plugin";
import type { SettingsContext } from "src/ui/settings/settingsContext";
import { displayCliSettings } from "src/ui/settings/cliSettings";
import { displayWorkspaceSettings } from "src/ui/settings/workspaceSettings";
import { displayEditHistorySettings } from "src/ui/settings/editHistorySettings";
import { displayEncryptionSettings } from "src/ui/settings/encryptionSettings";

export class SettingsTab extends PluginSettingTab {
  plugin: GeminiHelperPlugin;
  private syncCancelRef = { value: false };

  constructor(app: App, plugin: GeminiHelperPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    const ctx: SettingsContext = {
      plugin: this.plugin,
      display: () => this.display(),
      syncCancelRef: this.syncCancelRef,
    };

    displayCliSettings(containerEl, ctx);
    displayWorkspaceSettings(containerEl, ctx);
    displayEditHistorySettings(containerEl, ctx);
    displayEncryptionSettings(containerEl, ctx);
  }
}
