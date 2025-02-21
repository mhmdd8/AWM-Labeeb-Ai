import { tool as createTool } from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    try {
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(location)}?format=j1`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      const data = await response.json();
      return {
        weather: data.current_condition[0].weatherDesc[0].value,
        temperature: parseInt(data.current_condition[0].temp_C),
        humidity: data.current_condition[0].humidity,
        location: location,
        windSpeed: `${data.current_condition[0].windspeedKmph} km/h`
      };
    } catch (error) {
      return {
        error: 'Unable to fetch weather data',
        location
      };
    }
  },
});

export const npcNavigatorTool = createTool({
  description: 'Navigate and explore NPC Qatar statistical sections and subjects',
  parameters: z.object({
    category: z.enum(['Population', 'Social', 'Economic']).optional()
      .describe('The main NPC statistical category (Population, Social, or Economic)'),
    subject: z.string().optional()
      .describe('Specific statistical subject to search for within NPC categories'),
  }),
  execute: async function ({ category, subject }) {
    const npcStatistics = {
      Population: {
        description: 'Demographic statistics and vital events',
        subjects: [
          'Marriages and Divorces',
          'Births and Deaths'
        ]
      },
      Social: {
        description: 'Social indicators and development metrics',
        subjects: [
          'Labor Force',
          'Employment, Wages and Working Hours',
          'Training',
          'Education',
          'Health',
          'Special Needs',
          'Household Income and Expenditure',
          'Security and Jurisprudence',
          'Media, Culture and Tourism',
          'Sport',
          'Research and Development'
        ]
      },
      Economic: {
        description: 'Economic indicators and financial statistics',
        subjects: [
          'National Accounts',
          'Foreign Trade',
          'Price Indices',
          'Banking and Insurance',
          'Foreign Investment',
          'Building and Construction',
          'Maritime Navigation',
          'Business Services'
        ]
      }
    };

    if (!category && !subject) {
      return {
        categories: Object.entries(npcStatistics).map(([name, data]) => ({
          name,
          description: data.description
        })),
        message: 'Available NPC statistical categories. You can specify a category or search for a specific subject.'
      };
    }

    if (category && npcStatistics[category]) {
      return {
        category,
        description: npcStatistics[category].description,
        subjects: npcStatistics[category].subjects,
        message: `NPC subjects available under ${category}`
      };
    }

    if (subject) {
      const results = Object.entries(npcStatistics)
        .map(([categoryName, data]) => ({
          category: categoryName,
          description: data.description,
          matches: data.subjects.filter(s => 
            s.toLowerCase().includes(subject.toLowerCase())
          )
        }))
        .filter(result => result.matches.length > 0);

      return {
        results,
        message: results.length > 0 
          ? `Found matches in NPC statistics for "${subject}"`
          : `No NPC statistical subjects found matching "${subject}"`
      };
    }

    return {
      error: 'Invalid category specified',
      availableCategories: Object.keys(npcStatistics)
    };
  },
});

export const randomStatsTool = createTool({
  description: 'Generate random statistical data for visualization',
  parameters: z.object({
    type: z.enum(['line', 'bar', 'pie']).describe('Type of chart to generate'),
    dataPoints: z.number().min(3).max(12).default(6).describe('Number of data points'),
  }),
  execute: async function ({ type, dataPoints }) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomData = Array.from({ length: dataPoints }, () => 
      Math.floor(Math.random() * 100)
    );
    
    return {
      type,
      labels: labels.slice(0, dataPoints),
      data: randomData,
      title: `Random ${type.charAt(0).toUpperCase() + type.slice(1)} Chart`
    };
  },
});

export const waterConsumptionTool = createTool({
  description: 'Generate water consumption data for Qatar regions',
  parameters: z.object({
    year: z.number().describe('Year for the water consumption data'),
  }),
  execute: async function ({ year }) {
    // Doha gets about 35% of total consumption
    const dohaValue = Math.floor(175 + Math.random() * 20); // ~175M liters
    
    // Other regions split remaining 325M liters with some variation
    const regions = {
      "QA-DA": { name: "Ad Dawhah", value: dohaValue },
      "QA-RA": { name: "Ar Rayyan", value: Math.floor(95 + Math.random() * 10) },      // ~95M
      "QA-WA": { name: "Al Wakrah", value: Math.floor(75 + Math.random() * 10) },      // ~75M
      "QA-ZA": { name: "Al Daayen", value: Math.floor(45 + Math.random() * 10) },      // ~45M
      "QA-KH": { name: "Al Khor", value: Math.floor(35 + Math.random() * 10) },        // ~35M
      "QA-US": { name: "Umm Salal", value: Math.floor(35 + Math.random() * 10) },      // ~35M
      "QA-SH": { name: "Al Shahaniya", value: Math.floor(20 + Math.random() * 5) },    // ~20M
      "QA-MS": { name: "Madinat ash Shamal", value: Math.floor(15 + Math.random() * 5) } // ~15M
    };

    return {
      year,
      data: regions
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  npcStats: npcNavigatorTool,
  randomStats: randomStatsTool,
  waterConsumption: waterConsumptionTool
};