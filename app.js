// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWFoZWVyLW1hcHMiLCJhIjoiY201eTQ1Y3o4MGEzazJqcjJzY2N5Y3N3eSJ9.46hoKifS-rGSZ_8px3JlsQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // Dark base map
    center: [-0.1276, 51.5072],  // Longitude, Latitude for central London
    zoom: 9  // Good zoom level to see most of Greater London
});

// Define the new color scheme for amenities
const amenityColors = {
    'Theatre': '#C79BF2', 
    'Nightclub': '#AFC4E3',
    'Music Venue': '#90B8B1', 
    'Library': '#BBF2E8',   
    'Community Centre': '#00FFFF',
    'Cinema': '#59D571',     
    'Arts Centre': '#22F230' 
};

// Format amenity names by replacing underscores and capitalizing
function formatAmenityName(amenity) {
    return amenity
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Create legend
function createLegend() {
    const legendContainer = document.getElementById('legend-items');
    for (const [amenity, color] of Object.entries(amenityColors)) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <div class='legend-color' style='background-color: ${color};'></div>
            <span>${amenity}</span>
        `;
        legendContainer.appendChild(item);
    }
}

// Load all GeoJSON files
const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
let allData = {};

// Animation/slider variables
let currentYearIndex = 0;
const yearDisplay = document.getElementById('year-display');
const slider = document.createElement('input');

// Function to load all GeoJSON files
async function loadAllData() {
    for (const year of years) {
        try {
            const response = await fetch(`data/${year}.geojson`);
            allData[year] = await response.json();
            console.log(`Loaded data for ${year}`);
        } catch (error) {
            console.error(`Error loading data for ${year}:`, error);
        }
    }
    initializeMap();
}

// Function to initialize the map with the first year's data
function initializeMap() {
    // Wait for the map to load
    map.on('load', () => {
        // Add the first year's data
        updateMapForYear(years[0]);
        
        // Set up controls
        setupControls();
        
        // Create legend
        createLegend();
    });
}

// Function to update the map for a specific year
function updateMapForYear(year) {
    // Remove existing layers and sources if they exist
    for (const amenity of Object.keys(amenityColors)) {
        const layerId = `points-${amenity.replace(/\s+/g, '-').toLowerCase()}`;
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }
        if (map.getSource(layerId)) {
            map.removeSource(layerId);
        }
    }
    
    // Filter and add data for the current year
    const yearData = allData[year];
    if (!yearData) return;
    
    // Group features by amenity type
    const featuresByAmenity = {};
    for (const amenityKey of Object.keys(amenityColors)) {
        const originalAmenity = amenityKey.toLowerCase().replace(/\s+/g, '_');
        featuresByAmenity[amenityKey] = {
            type: 'FeatureCollection',
            features: yearData.features.filter(f => 
                f.properties.amenity.toLowerCase() === originalAmenity
            )
        };
    }
    
    // Add each amenity type as a separate layer
    for (const [amenity, features] of Object.entries(featuresByAmenity)) {
        if (features.features.length === 0) continue;
        
        const layerId = `points-${amenity.replace(/\s+/g, '-').toLowerCase()}`;
        
        // Add source
        map.addSource(layerId, {
            type: 'geojson',
            data: features
        });
        
        // Add layer with updated styling
        map.addLayer({
            id: layerId,
            type: 'circle',
            source: layerId,
            paint: {
                'circle-radius': 3,
                'circle-color': amenityColors[amenity],
                'circle-stroke-width': 0 
            }
        });
    }
    
    // Update year display
    yearDisplay.textContent = year;
}

// Set up controls with slider
function setupControls() {
    // Remove old buttons
    const controlsDiv = document.getElementById('controls');
    controlsDiv.innerHTML = '';
    
    // Create slider
    slider.type = 'range';
    slider.min = '0';
    slider.max = (years.length - 1).toString();
    slider.value = '0';
    slider.style.width = '200px';
    slider.style.margin = '0 10px';
    
    // Create year navigation
    const prevButton = document.createElement('button');
    prevButton.textContent = '◄';
    prevButton.addEventListener('click', () => {
        if (currentYearIndex > 0) {
            currentYearIndex--;
            slider.value = currentYearIndex;
            updateMapForYear(years[currentYearIndex]);
        }
    });
    
    const nextButton = document.createElement('button');
    nextButton.textContent = '►';
    nextButton.addEventListener('click', () => {
        if (currentYearIndex < years.length - 1) {
            currentYearIndex++;
            slider.value = currentYearIndex;
            updateMapForYear(years[currentYearIndex]);
        }
    });
    
    // Add slider event
    slider.addEventListener('input', (e) => {
        currentYearIndex = parseInt(e.target.value);
        updateMapForYear(years[currentYearIndex]);
    });
    
    // Add elements to controls
    controlsDiv.appendChild(prevButton);
    controlsDiv.appendChild(slider);
    controlsDiv.appendChild(nextButton);
    controlsDiv.appendChild(yearDisplay);
}

// Start loading data
loadAllData();
