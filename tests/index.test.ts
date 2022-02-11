import { load, process } from "gherking";
import { Document, Examples, pruneID, ScenarioOutline, TableCell, TableRow } from "gherkin-ast";
import ScenarioOutlineNumbering = require("../src");

const loadTestFeatureFile = async (file: string): Promise<Document> => {
    const ast = await load(`./tests/data/${file}`);
    delete ast[0].uri;
    return ast[0];
}

describe("Scenario outline numbering", () => {
    let base: Document;

    beforeAll(async () => {
        base = await loadTestFeatureFile("input.feature");
    });

    test("should add order of example row", async () => {
        const expected = await loadTestFeatureFile("expected1.feature");
        const actual = process(base, new ScenarioOutlineNumbering({
            addNumbering: true,
            addParameters: false,
            parameterDelimiter: ',',
            parameterFormat: '${name} - ${parameters}',
            numberingFormat: '${i} - ${name}',
            strictNaming: false
        }));

        pruneID(actual);
        pruneID(expected);

        expect(actual[0]).toEqual(expected);
    });

    test("should add variables of example table", async () => {
        const expected = await loadTestFeatureFile("expected2.feature");
        const actual = process(base, new ScenarioOutlineNumbering({
            addNumbering: false,
            addParameters: true,
            parameterDelimiter: ',',
            parameterFormat: '${name} - ${parameters}',
            numberingFormat: '${i} - ${name}',
            strictNaming: false
        }));

        pruneID(actual);
        pruneID(expected);

        expect(actual[0]).toEqual(expected);
    });

    test("should support custom configuration", async () => {
        const expected = await loadTestFeatureFile("expected3.feature");
        const actual = process(base, new ScenarioOutlineNumbering({
            addNumbering: true,
            numberingFormat: '${name} / ${i}',
            addParameters: true,
            parameterDelimiter: '|',
            parameterFormat: '${name} (${parameters})',
            strictNaming: false
        }));

        pruneID(actual);
        pruneID(expected);

        expect(actual[0]).toEqual(expected);
    });

    test("should throw error when numbering column exists with strict config", async () => {
        const precompiler = new ScenarioOutlineNumbering({
            addNumbering: true,
            addParameters: false,
            strictNaming: true,
            parameterDelimiter: ',',
            parameterFormat: '${name} - ${parameters}',
            numberingFormat: '${i} - ${name}',
        })
        const scenarioOutline = new ScenarioOutline("k", "n", "d");
        const example = new Examples("k", "n");
        example.header = new TableRow([new TableCell("num")]);

        expect(() => precompiler.onExamples(example, scenarioOutline)).toThrow("The default numbering field already exists in Scenario Outline: n");
    });

    test("should work with default config", async () => {
        const expected = await loadTestFeatureFile("expected1.feature");
        const actual = process(base, new ScenarioOutlineNumbering());

        pruneID(actual);
        pruneID(expected);

        expect(actual[0]).toEqual(expected);
    });


    test("should throw error when required parameter is empty", async () => {

        expect(() => new ScenarioOutlineNumbering({
            addNumbering: true,
            addParameters: false,
            strictNaming: true,
            parameterDelimiter: ',',
            parameterFormat: '',
            numberingFormat: '${i} - ${name}',
        })).toThrow("The numberingFormat and parameterFormat parameters must have a value.");
    });
});
