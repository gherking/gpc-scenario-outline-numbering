import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
const ScenarioOutlineNumbering = require("../src");

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
            addParameters: false
        }));

        pruneID(actual);
        pruneID(expected);

        expect(actual[0]).toEqual(expected);
    });

    test("should add variables of example table", async () => {
        const expected = await loadTestFeatureFile("expected2.feature");
        const actual = process(base, new ScenarioOutlineNumbering({
            addNumbering: false,
            addParameters: true
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
            parameterFormat: '${name} (${parameters})'
        }));

        pruneID(actual);
        pruneID(expected);

        expect(actual[0]).toEqual(expected);
    });

    test("should throw error when numbering column exists with strict config", async () => {
        expect(process(base, new ScenarioOutlineNumbering({
            addNumbering: true,
            addParameters: false,
            strictNaming: true
        }))).toThrowError()
    });
});
