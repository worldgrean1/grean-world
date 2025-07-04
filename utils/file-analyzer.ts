/**
 * TypeScript utility for analyzing file complexity and suggesting refactoring strategies
 */

export interface FileAnalysis {
  path: string
  lines: number
  complexity: "low" | "medium" | "high" | "critical"
  suggestions: string[]
  estimatedRefactorTime: string
}

export interface RefactoringStrategy {
  type: "component-extraction" | "hook-extraction" | "utility-extraction" | "state-management"
  description: string
  priority: "low" | "medium" | "high" | "critical"
  estimatedEffort: string
}

/**
 * Analyze file complexity based on line count and content patterns
 */
export function analyzeFileComplexity(filePath: string, lineCount: number): FileAnalysis {
  const suggestions: string[] = []
  let complexity: FileAnalysis["complexity"] = "low"
  let estimatedRefactorTime = "1-2 hours"

  // Determine complexity level
  if (lineCount >= 800) {
    complexity = "critical"
    estimatedRefactorTime = "1-2 days"
    suggestions.push("IMMEDIATE refactoring required - file is too large")
    suggestions.push("Break into 5-8 smaller components")
    suggestions.push("Extract custom hooks for state management")
    suggestions.push("Create utility functions for complex logic")
  } else if (lineCount >= 500) {
    complexity = "high"
    estimatedRefactorTime = "4-8 hours"
    suggestions.push("High priority refactoring recommended")
    suggestions.push("Break into 3-5 smaller components")
    suggestions.push("Extract reusable hooks")
    suggestions.push("Consider state management optimization")
  } else if (lineCount >= 300) {
    complexity = "medium"
    estimatedRefactorTime = "2-4 hours"
    suggestions.push("Consider refactoring for better maintainability")
    suggestions.push("Extract 2-3 focused components")
    suggestions.push("Move utility functions to separate files")
  } else {
    complexity = "low"
    estimatedRefactorTime = "30 minutes - 1 hour"
    suggestions.push("File size is acceptable")
    suggestions.push("Monitor for future growth")
  }

  // Add file-specific suggestions based on path
  if (filePath.includes("page.tsx")) {
    suggestions.push("Consider extracting layout components")
    suggestions.push("Move business logic to custom hooks")
  }

  if (filePath.includes("components/")) {
    suggestions.push("Break into smaller, focused components")
    suggestions.push("Extract shared logic into hooks")
  }

  return {
    path: filePath,
    lines: lineCount,
    complexity,
    suggestions,
    estimatedRefactorTime,
  }
}

/**
 * Generate refactoring strategies based on file analysis
 */
export function generateRefactoringStrategies(analysis: FileAnalysis): RefactoringStrategy[] {
  const strategies: RefactoringStrategy[] = []

  if (analysis.complexity === "critical" || analysis.complexity === "high") {
    strategies.push({
      type: "component-extraction",
      description: "Extract large sections into focused, reusable components",
      priority: "critical",
      estimatedEffort: "4-8 hours",
    })

    strategies.push({
      type: "hook-extraction",
      description: "Move state management and effects into custom hooks",
      priority: "high",
      estimatedEffort: "2-4 hours",
    })

    strategies.push({
      type: "utility-extraction",
      description: "Extract utility functions and constants to separate files",
      priority: "medium",
      estimatedEffort: "1-2 hours",
    })
  }

  if (analysis.complexity === "medium") {
    strategies.push({
      type: "component-extraction",
      description: "Consider extracting 2-3 focused components",
      priority: "medium",
      estimatedEffort: "2-3 hours",
    })

    strategies.push({
      type: "utility-extraction",
      description: "Move utility functions to appropriate modules",
      priority: "low",
      estimatedEffort: "30 minutes - 1 hour",
    })
  }

  return strategies
}

/**
 * File size thresholds and recommendations
 */
export const FILE_SIZE_GUIDELINES = {
  SMALL: { max: 100, status: "excellent", color: "🟢" },
  MEDIUM: { max: 200, status: "good", color: "🟡" },
  LARGE: { max: 300, status: "acceptable", color: "🟠" },
  VERY_LARGE: { max: 500, status: "concerning", color: "🔴" },
  CRITICAL: { max: Number.POSITIVE_INFINITY, status: "critical", color: "🚨" },
} as const

/**
 * Get file size status
 */
export function getFileSizeStatus(lineCount: number) {
  for (const [key, guideline] of Object.entries(FILE_SIZE_GUIDELINES)) {
    if (lineCount <= guideline.max) {
      return {
        category: key.toLowerCase(),
        ...guideline,
      }
    }
  }
  return FILE_SIZE_GUIDELINES.CRITICAL
}
