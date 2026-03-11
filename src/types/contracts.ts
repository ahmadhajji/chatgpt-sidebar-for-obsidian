export type FileAttachmentKind = "note" | "text" | "binary";

export interface FileAttachmentSnapshot {
  path: string;
  kind: FileAttachmentKind;
  content?: string;
  size?: number;
  truncated?: boolean;
}

export interface ActiveNoteSnapshot {
  path: string;
  content: string;
  frontmatter?: Record<string, unknown>;
}

export interface TemplateCandidate {
  path: string;
  reason: string;
}

export interface VaultContextSnapshot {
  vaultId: string;
  vaultName: string;
  vaultRoot: string;
  activeNote?: ActiveNoteSnapshot;
  selection?: string;
  agentsInstructions?: string;
  attachedFiles: FileAttachmentSnapshot[];
  templateCandidates: TemplateCandidate[];
  generatedAt: string;
}

export type ChatRole = "user" | "assistant" | "system";

export interface ChatTurn {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export type ProposalOperation = "create" | "update" | "rename" | "agents-update";

export interface ChangeProposal {
  id: string;
  operation: ProposalOperation;
  targetPath: string;
  previousPath?: string;
  content?: string;
  reason: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface ProposalBatch {
  summary: string;
  proposals: ChangeProposal[];
  warnings: string[];
}

export interface BridgeSessionState {
  bridgeSessionId: string;
  codexThreadId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionUpsertRequest {
  vaultId: string;
  vaultRoot: string;
  bridgeSessionId?: string;
  codexThreadId?: string;
}

export interface ChatStreamRequest {
  sessionId: string;
  prompt: string;
  history: ChatTurn[];
  context: VaultContextSnapshot;
}

export interface ProposalRequest {
  sessionId: string;
  prompt: string;
  history: ChatTurn[];
  context: VaultContextSnapshot;
}

export interface HealthResponse {
  ok: boolean;
  codexAvailable: boolean;
  bridgeVersion: string;
  message?: string;
}

export type StreamEvent =
  | { type: "session"; session: BridgeSessionState }
  | { type: "assistant_delta"; delta: string }
  | { type: "assistant_message"; message: string }
  | { type: "error"; message: string }
  | { type: "done" };
