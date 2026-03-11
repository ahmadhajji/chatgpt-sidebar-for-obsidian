import { FuzzySuggestModal, TFile } from "obsidian";

export class FileSuggestModal extends FuzzySuggestModal<TFile> {
  private resolver?: (value: TFile | null) => void;

  getItems(): TFile[] {
    return this.app.vault.getFiles();
  }

  getItemText(item: TFile): string {
    return item.path;
  }

  onChooseItem(item: TFile): void {
    this.resolver?.(item);
  }

  onClose(): void {
    super.onClose();
    this.resolver?.(null);
  }

  choose(): Promise<TFile | null> {
    return new Promise((resolve) => {
      this.resolver = resolve;
      this.open();
    });
  }
}
