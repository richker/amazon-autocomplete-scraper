# Amazon Search Suggestions Scraper

This tool automates the fetching, organizing, and saving of Amazon search suggestions into an Excel file. It's designed for SEO analysts, market researchers, content creators, or anyone interested in analyzing popular search terms on Amazon.

## Features

- **Automated Suggestions Fetching**: Retrieves Amazon search suggestions for each letter of the alphabet ('a' to 'z') using Amazon's suggestions API.
- **Suggestions Organization**: Organizes suggestions by frequency and average position to identify the most relevant search terms.
- **Scoring System**: Implements a scoring system for suggestions based on their frequency and average position, allowing for prioritization of the most valuable suggestions.
- **Excel Export**: Saves the sorted suggestions along with their scores into an Excel file, facilitating further analysis or reporting.

## How It Works

1. **Fetch Suggestions**: The script generates search suggestions from Amazon for each letter of the alphabet, capturing both the suggestion text and its position.

2. **Organize Suggestions**: Suggestions are stored with details on how frequently each appeared and their positions across searches. A score is calculated for each suggestion based on these metrics.

3. **Save to Excel**: Suggestions are sorted by their calculated scores and saved into an Excel file with two columns: "Suggestion" and "Score".

## Usage

This script is written in JavaScript and intended to be run in a Node.js environment. Ensure you have Node.js and the required packages (`axios` for HTTP requests and `excel4node` for Excel file operations) installed.

1. **Setup**: Clone the repository and install dependencies:
   ```bash
   npm install axios excel4node
   ```

2. **Run Script**: Execute the script with Node.js:
   ```bash
   node script.js
   ```

3. **Check Results**: Once the script finishes running, check the generated `AmazonSuggestions.xlsx` file in the script's directory for the output.

## Important Notes

- The script is a demonstration of API use and data manipulation. The actual availability and structure of Amazon's suggestion API may change, which can affect the script's functionality.
- Ensure you comply with Amazon's API usage policies and terms of service when using this script.
- The scoring formula (frequency minus average position divided by 10) is adjustable based on your analysis needs.

## License

This project is open-source and available under [MIT License](LICENSE). Feel free to fork, modify, and use it in your projects with proper attribution.