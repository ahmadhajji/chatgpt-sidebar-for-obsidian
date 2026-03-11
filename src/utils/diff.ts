import { createPatch } from "diff";
import type { ChangeProposal } from "../types/contracts";
import type { DiffPreview } from "../types/plugin";

function operationLabel(operation: ChangeProposal["operation"]): DiffPreview["operation"] {
  if (operation === "rename") {
    return "rename";
  }
  if (operation === "create") {
    return "create";
  }
  if (operation === "agents-update") {
    return "agents-update";
  }
  return "update";
}

export function buildDiffPreview(
  proposal: ChangeProposal,
  currentContent: string,
  contextLines: number
): DiffPreview {
  const beforeLabel = proposal.previousPath ?? proposal.targetPath;
  const afterLabel = proposal.targetPath;
  let unifiedDiff = "";

  if (proposal.operation === "rename") {
    const renamed = `${beforeLabel}\n->\n${afterLabel}`;
    const content = proposal.content ?? currentContent;
    unifiedDiff = `${renamed}\n\n${createPatch(beforeLabel, currentContent, content, "before", "after", {
      context: contextLines
    })}`;
  } else {
    unifiedDiff = createPatch(
      beforeLabel,
      currentContent,
      proposal.content ?? currentContent,
      "before",
      "after",
      { context: contextLines }
    );
  }

  return {
    proposalId: proposal.id,
    operation: operationLabel(proposal.operation),
    targetPath: proposal.targetPath,
    previousPath: proposal.previousPath,
    reason: proposal.reason,
    unifiedDiff,
    approved: true
  };
}
