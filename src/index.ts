import { PreCompiler } from "gherking";
import { Examples, ScenarioOutline, TableCell, TableRow } from "gherkin-ast"
import { ScenarioOutlineNumberingConfig } from './types'

const DEFAULT_CONFIG: ScenarioOutlineNumberingConfig = {
    addParameters: false,
    parameterDelimiter: ',',
    parameterFormat: '${name} - ${parameters}',
    addNumbering: true,
    numberingFormat: '${i} - ${name}',
    strictNaming: false
};

const NUMBERING_COLUMN = 'num';

class ScenarioOutlineNumbering implements PreCompiler {
    private config: ScenarioOutlineNumberingConfig;

    constructor(config?: ScenarioOutlineNumberingConfig) {
        this.config = {
            ...DEFAULT_CONFIG,
            ...(config || {}),
        };
    }

    onScenarioOutline(scenarioOutline: ScenarioOutline): ScenarioOutline {
        if (this.config.addNumbering) {
            scenarioOutline.name = this.config.numberingFormat
                .replace(/\$\{i\}/g, `<${NUMBERING_COLUMN}>`)
                .replace(/\$\{name\}/g, scenarioOutline.name);
        }
        if (this.config.addParameters) {
            let allColumns: Set<TableCell> = new Set();
            scenarioOutline.examples.forEach((examples: Examples) => {
                examples.header.cells.forEach((cell: TableCell) => {
                    allColumns.add(cell);
                });
            });
            let allColumnNames: string = Array.from(allColumns)
                .map((column: TableCell) => `<${column.value}>`)
                .join(this.config.parameterDelimiter);
            scenarioOutline.name = this.config.parameterFormat
                .replace(/\$\{parameters\}/g, allColumnNames)
                .replace(/\$\{name\}/g, scenarioOutline.name);
        }

        return scenarioOutline;
    }

    onExampleHeader(header: TableRow): void {
        header.cells.unshift(new TableCell(NUMBERING_COLUMN));
    }

    onExampleRow(row: TableRow, i: number): void {
        row.cells.unshift(new TableCell(String(i + 1)));
    }

    onExamples(examples: Examples, scenarioOutline: ScenarioOutline): Examples {
        if (this.config.addNumbering) {
            const fieldExists = examples.header.cells.some((cell: TableCell) => {
                return cell.value === NUMBERING_COLUMN;
            });
            if (fieldExists && this.config.strictNaming) {
                throw new Error(`The default numbering field already exists in Scenario Outline: ${scenarioOutline.name}`);
            } else if (fieldExists) {
                console.warn(`The default numbering field already exists in Scenario Outline: ${scenarioOutline.name}`);
            } else {
                this.onExampleHeader(examples.header)
                examples.body.forEach((row: TableRow, i: number) => {
                    this.onExampleRow(row, i);
                })
            }
        }
        return examples;
    }
}

export = ScenarioOutlineNumbering;