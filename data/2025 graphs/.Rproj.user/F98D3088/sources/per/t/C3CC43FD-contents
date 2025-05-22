# Load required libraries
library(sf)
library(dplyr)
library(tidyr)

# Load the shapefile of London boroughs
boroughs <- st_read("London_Borough/London_Borough_Excluding_MHW.shp")

# Load the GeoJSON files
pins_2017 <- st_read("2017.geojson")
pins_2025 <- st_read("2025.geojson")

# Define target CRS (British National Grid - EPSG:27700)
target_crs <- 27700

# Transform all spatial layers to target CRS
boroughs <- st_transform(boroughs, target_crs)
pins_2017 <- st_transform(pins_2017, target_crs)
pins_2025 <- st_transform(pins_2025, target_crs)

# Spatial join to assign boroughs to each point
pins_2017_joined <- st_join(pins_2017, boroughs, left = FALSE)
pins_2025_joined <- st_join(pins_2025, boroughs, left = FALSE)

# Count the number of amenities per borough
table_2017 <- pins_2017_joined %>%
  st_drop_geometry() %>%
  count(BOROUGH_NAME = NAME, amenity) %>%
  pivot_wider(names_from = amenity, values_from = n, values_fill = 0)

table_2025 <- pins_2025_joined %>%
  st_drop_geometry() %>%
  count(BOROUGH_NAME = NAME, amenity) %>%
  pivot_wider(names_from = amenity, values_from = n, values_fill = 0)

# Print the resulting tables
cat("Table for 2017 amenities:\n")
print(table_2017)

cat("\nTable for 2025 amenities:\n")
print(table_2025)

# Save the tables as CSV files
write.csv(table_2017, "table_2017.csv", row.names = FALSE)
write.csv(table_2025, "table_2025.csv", row.names = FALSE)
