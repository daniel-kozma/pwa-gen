import { CompiledData } from "./types.mjs"

const { log } = console

const generateHTML = async (inputData: CompiledData, template: string): Promise<string> => {
  const replaceRegex = /(?:\{\{)\w+(?:\}\})/g
  const replaceFn = (substr: string): string => {
    const key = substr.slice(2, -2)
    return inputData[key]
  }

  const withValuesReplaced = template.replace(replaceRegex, replaceFn)

  const ifStatementRegexG = /\{#if (?<value>\w+)\}(?<content>.*)(\{\/if\})/g
  const ifStatementRegex = /\{#if (?<value>\w+)\}(?<content>.*)(\{\/if\})/

  const ifEvaluator = (substr: string): string => {
    const { groups } = ifStatementRegex.exec(substr)!
    const { content, value } = groups as { content: string, value: string }
    const evaluation = value in inputData && inputData[value] !== null && inputData[value] !== undefined
    const result = evaluation ? content : ""
    return result
  }

  const withIfStatementsEvaled = withValuesReplaced.replace(ifStatementRegexG, ifEvaluator)

  return withIfStatementsEvaled
}

export default generateHTML