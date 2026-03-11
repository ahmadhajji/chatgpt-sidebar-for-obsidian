import type { BridgeSessionState, ChatTurn, ProposalBatch } from "./contracts";

export interface DiffPreview {
  proposalId: string;
  operation: "create" | "update" | "rename" | "agents-update";
  targetPath: string;
  previousPath?: string;
  reason: string;
  unifiedDiff: string;
  approved: boolean;
}

export interface PluginSettings {
  bridgeMode: "auto" | "manual";
  bridgePort: number;
  bridgeUrl: string;
  bridgeToken: string;
  bridgeNodePath: string;
  bridgeScriptPath: string;
  codexPath: string;
  autoIncludeActiveNote: boolean;
  autoIncludeSelection: boolean;
  autoLoadAgents: boolean;
  maxAttachedFiles: number;
  maxFileBytes: number;
  sidebarPlacement: "left" | "right";
  diffContextLines: number;
}

export interface PersistedState {
  session?: BridgeSessionState;
  chatTurns: ChatTurn[];
  attachedPaths: string[];
  pendingBatch?: ProposalBatch;
  approvedProposalIds: string[];
  lastPromptDraft: string;
}
