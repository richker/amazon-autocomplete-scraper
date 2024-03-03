const axios = require("axios");
const excel = require("excel4node");

// Function to fetch suggestions from Amazon
async function fetchSuggestions(prefix) {
    const url = `https://completion.amazon.com/api/2017/suggestions?limit=10&prefix=${prefix}&suggestion-type=WIDGET&suggestion-type=KEYWORD&page-type=Gateway&alias=aps&site-variant=desktop&version=3&event=onfocuswithsearchterm&wc=&lop=en_US&client-info=search-ui&mid=ATVPDKIKX0DER`;
    try {
        const response = await axios.get(url);
        if (response.data && response.data.suggestions) {
            // Return both value and position for each suggestion
            return response.data.suggestions.map((sugg, index) => ({
                value: sugg.value,
                position: index + 1 // Position starts at 1
            }));
        } else {
            console.error(`Unexpected response structure for ${prefix}:`, response.data);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching suggestions for ${prefix}:`, error);
        return [];
    }
}

// Function to save suggestions to an Excel file
async function saveToExcel(sortedSuggestions) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Amazon Suggestions");
    worksheet.cell(1, 1).string("Suggestion");
    worksheet.cell(1, 2).string("Score");

    sortedSuggestions.forEach((term, index) => {
        worksheet.cell(index + 2, 1).string(term.value);
        worksheet.cell(index + 2, 2).number(term.score);
    });

    workbook.write("AmazonSuggestions.xlsx");
}

// Main function to orchestrate the scraping and saving process
async function main() {
    const prefixes = "abcdefghijklmnopqrstuvwxyz".split("");
    let suggestionsMap = {};

    for (const prefix of prefixes) {
        const suggestions = await fetchSuggestions(prefix);
        suggestions.forEach(sugg => {
            if (!suggestionsMap[sugg.value]) {
                suggestionsMap[sugg.value] = { frequency: 1, positions: [sugg.position], score: 0 };
            } else {
                suggestionsMap[sugg.value].frequency++;
                suggestionsMap[sugg.value].positions.push(sugg.position);
            }
        });
    }

    // Calculate score for each suggestion and prepare for sorting
    let suggestionsArray = Object.keys(suggestionsMap).map(term => {
        const data = suggestionsMap[term];
        const averagePosition = data.positions.reduce((a, b) => a + b, 0) / data.positions.length;
        // Improved scoring: frequency - (average position / 10); adjust scoring formula as needed
        data.score = data.frequency - (averagePosition / 10);
        return { value: term, score: data.score };
    });

    // Sort suggestions by score
    let sortedSuggestions = suggestionsArray.sort((a, b) => b.score - a.score);

    await saveToExcel(sortedSuggestions); // Pass sorted suggestions with their scores
    console.log("Saved suggestions to Excel.");
}

main();
