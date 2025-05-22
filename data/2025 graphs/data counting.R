# Load libraries
library(sf)
library(dplyr)

# Load files
geojson_2025 <- st_read("2025.geojson")
london_borough <- st_read("London_Borough/London_Borough_Excluding_MHW.shp")

# Check British National Grid EPSG code
# EPSG:27700 is for OSGB 1936 / British National Grid
bn_grid_crs <- 27700

# Reproject both layers
geojson_2025_proj <- st_transform(geojson_2025, crs = bn_grid_crs)
london_borough_proj <- st_transform(london_borough, crs = bn_grid_crs)

# Filter points for libraries and cinemas
filtered_points <- geojson_2025_proj %>%
  filter(amenity %in% c("library", "cinema"))

# Spatial join: assign each point to a borough
points_with_borough <- st_join(filtered_points, london_borough_proj, join = st_within)

# Count number of each amenity type per borough
amenity_counts <- points_with_borough %>%
  st_drop_geometry() %>%  # Drop geometry for table operations
  group_by(NAME, amenity) %>%
  summarise(count = n(), .groups = "drop") %>%
  tidyr::pivot_wider(names_from = amenity, values_from = count, values_fill = 0)

# View result
print(amenity_counts)

# Load necessary package
library(readr)

# Load the datasets
cinema_data <- read_csv("Cinema 2023.csv")
libraries_data <- read_csv("Libraries 2023.csv")

# Create frequency tables for 'borough_name'
cinema_borough_counts <- table(cinema_data$borough_name)
libraries_borough_counts <- table(libraries_data$borough_name)

# Convert tables to data frames
cinema_borough_df <- as.data.frame(cinema_borough_counts)
libraries_borough_df <- as.data.frame(libraries_borough_counts)

# Rename columns for clarity
colnames(cinema_borough_df) <- c("borough_name", "count")
colnames(libraries_borough_df) <- c("borough_name", "count")

# Save as CSV files
write.csv(cinema_borough_df, "Cinema_Borough_Counts.csv", row.names = FALSE)
write.csv(libraries_borough_df, "Library_Borough_Counts.csv", row.names = FALSE)

